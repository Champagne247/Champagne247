const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const vm = require('node:vm');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const categories = ['family', 'fitness', 'freeflight', 'professional', 'creator', 'travel'];
const categoryRoutes = ['family', 'fitness', 'professional', 'creator', 'food-travel'];
let server, browser, origin, leaflet;

before(async () => {
  leaflet = await fs.readFile(require.resolve('leaflet/dist/leaflet.js'), 'utf8');
  server = http.createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://local').pathname);
    const relative = pathname.replace(/^\/Champagne247\//, '');
    const file = path.resolve(root, relative + (pathname.endsWith('/') ? 'index.html' : ''));
    if (!pathname.startsWith('/Champagne247/') || !file.startsWith(root + path.sep)) {
      res.writeHead(404).end(); return;
    }
    try {
      const body = await fs.readFile(file);
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp' };
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(body);
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox']
  });
});

after(async () => {
  await browser?.close();
  if (server) await new Promise(resolve => server.close(resolve));
});

async function session({ unavailableCloud = false } = {}) {
  const context = await browser.newContext();
  const errors = [];
  context.on('page', page => {
    page.on('pageerror', error => {
      if (unavailableCloud && error.message === 'Supabase client failed to load.') return;
      errors.push(error.message);
    });
    page.on('dialog', dialog => dialog.dismiss());
  });
  // Exercise the actual cloud.js without contacting an account or writing records.
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin === origin) return route.continue();
    if (url.hostname === 'cdn.jsdelivr.net' && url.pathname.includes('supabase')) {
      return route.fulfill({ contentType: 'text/javascript', body: unavailableCloud ? '' : `
        window.supabase={createClient:()=>({
          auth:{getUser:async()=>({data:{user:null},error:null})},
          from:()=>{throw new Error('Unexpected account write')}
        })};` });
    }
    if (url.hostname === 'unpkg.com' && url.pathname.endsWith('/leaflet.js')) {
      return route.fulfill({ contentType: 'text/javascript', body: leaflet });
    }
    return route.abort();
  });
  return { context, page: await context.newPage(), errors };
}

async function compose(page, mode = 'draft') {
  await page.goto(`${origin}/Champagne247/manage/`);
  await page.fill('#title', 'Composer regression moment');
  await page.fill('#story', 'Synthetic local story for the reviewed export regression.');
  await page.fill('#date', '2026-10-29T12:00');
  for (const category of categories) {
    if (!(await page.locator(`input[name=paths][value=${category}]`).isChecked())) await page.locator(`label[for=${category}]`).click();
  }
  await page.locator('.media-origin').first().selectOption('own');
  await page.locator('.media-url').first().fill('assets/map/Hero/hero-all.webp?review=1#photo');
  await page.locator('.media-caption-input').first().fill('Synthetic media caption');
  await page.locator('.link-label').first().fill('Connected M.A.P.');
  await page.locator('.link-url').first().fill('/Champagne247/map/');
  await page.selectOption('#mode', mode);
}

function parseExport(source) {
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox);
  return JSON.parse(JSON.stringify(sandbox.window.MAP_DATA));
}

async function useExport(context, source) {
  await context.route('**/Champagne247/assets/map/data/entries.js', route =>
    route.fulfill({ contentType: 'text/javascript', body: source }));
}

test('local draft survives explicit save and preview/reload with cloud helpers loaded or unavailable', async () => {
  for (const unavailableCloud of [false, true]) {
    const { context, page, errors } = await session({ unavailableCloud });
    try {
      await compose(page);
      await page.click('#saveDraft');
      const draft = await page.evaluate(() => JSON.parse(localStorage.getItem('mapMasterLifeDraft')));
      assert.equal(draft.title, 'Composer regression moment');
      assert.deepEqual(draft.paths, categories);
      assert.equal(draft.media[0].url, '/Champagne247/assets/map/Hero/hero-all.webp?review=1#photo');
      await page.reload();
      assert.equal(await page.inputValue('#title'), draft.title);
      assert.equal(await page.inputValue('#story'), draft.story);
      assert.equal(await page.inputValue('.media-url'), draft.media[0].url);
      assert.deepEqual(await page.locator('input[name=paths]:checked').evaluateAll(nodes => nodes.map(n => n.value)), categories);
      await page.fill('#story', 'A changed draft saved by preview.');
      await page.click('#prepare');
      await page.reload();
      assert.equal(await page.inputValue('#story'), 'A changed draft saved by preview.');
      if (!unavailableCloud) {
        await page.click('#mapCloudSave');
        await page.waitForFunction(() => document.querySelector('#mapCloudStatus').textContent.includes('Sign in'));
      }
      assert.deepEqual(errors, []);
    } finally { await context.close(); }
  }
});

test('downloaded reviewed export preserves complete data and renders media and connections in feeds', async () => {
  const { context, page, errors } = await session();
  try {
    await compose(page, 'now');
    // Unknown metadata/entry fields must survive future schema additions and same-ID updates.
    await page.evaluate(() => {
      MAP_DATA.extension = { retained: true };
      MAP_DATA.meta.extension = 'keep';
      MAP_DATA.entries[0].extension = { retained: true };
      MAP_DATA.entries.find(entry => entry.id==='nova-rocky-community-2026').links = [
        { label: 'Reviewed custom link', url: '/Champagne247/map/' }
      ];
      MAP_DATA.entries.find(entry => entry.id==='nova-phone-reuse-2026').links = [];
    });
    const baseline = await page.evaluate(() => MAP_DATA);
    await page.click('#prepare');
    assert.equal(await page.textContent('#previewTitle'), 'Composer regression moment');
    const downloadPromise = page.waitForEvent('download');
    await page.click('#downloadMaster');
    const download = await downloadPromise;
    assert.equal(download.suggestedFilename(), 'entries.js');
    const source = await fs.readFile(await download.path(), 'utf8');
    const exported = parseExport(source);
    const entry = exported.entries[0];
    assert.equal(exported.entries.length, baseline.entries.length + 1);
    assert.deepEqual(exported.entries.slice(1), baseline.entries);
    for (const key of Object.keys(baseline).filter(key => !['entries', 'meta'].includes(key))) {
      assert.deepEqual(exported[key], baseline[key]);
    }
    assert.deepEqual(exported.meta, { ...baseline.meta, updatedAt: entry.updatedAt });
    assert.equal(entry.visibility, 'public');
    assert.equal(entry.lifecycle, 'published');
    assert.equal(entry.schemaVersion, baseline.schemaVersion);
    assert.equal(entry.authorId, baseline.owner.id);
    assert.ok(entry.createdAt && entry.updatedAt && entry.eventAt);
    assert.equal(entry.distribution.state, 'ready');
    assert.deepEqual(entry.distribution.published, {}); // Export is not proof of publishing.
    assert.deepEqual(entry.categories, categories);
    assert.equal(entry.primaryCategory, 'family');

    // Updating an existing ID retains extension fields and its original creation time.
    const revised = await page.evaluate(entry => {
      DATA.entries.unshift({ ...entry, extension: 'keep-on-update', createdAt: '2020-01-01T00:00:00Z' });
      return buildEntry();
    }, entry);
    assert.equal(revised.extension, 'keep-on-update');
    assert.equal(revised.createdAt, '2020-01-01T00:00:00Z');

    await useExport(context, source);
    await page.goto(`${origin}/Champagne247/#${entry.id}`);
    // The welcome screen is intentionally shown even with reduced motion.
    const intro = page.locator('#nova-cinematic');
    if (await intro.count()) {
      await page.keyboard.press('Escape');
      await intro.waitFor({ state: 'detached' });
    }
    const card = page.locator(`#${entry.id}`);
    assert.equal(await card.locator('h3').textContent(), entry.title);
    assert.equal(await card.locator('.entry-story').textContent(), entry.story);
    await card.locator('img').scrollIntoViewIfNeeded();
    await card.locator('img').evaluate(img => img.decode());
    assert.ok((await card.locator('img').getAttribute('src')).endsWith(entry.media[0].url));
    assert.equal(await card.locator('img').getAttribute('alt'), 'Synthetic media caption');
    assert.equal(await card.locator('.entry-links a').getAttribute('href'), new URL(entry.links[0].url, origin).href);
    assert.equal(await card.locator('.entry-tag').count(), categories.length);
    await card.locator('.entry-media').click();
    assert.equal(await page.textContent('#lightbox-caption'), 'Synthetic media caption · 1 / 1 · Chris’s actual photo/video');
    await page.click('#lightbox-close');
    for (const category of categories) {
      await page.click(`[data-filter=${category}]`);
      assert.equal(await page.locator(`#${entry.id}`).count(), 1);
    }
    const loaded = await page.evaluate(() => MAP_DATA);
    assert.equal(loaded.entries.length, exported.entries.length); // Supplement replay is idempotent.
    assert.equal(loaded.meta.updatedAt, exported.meta.updatedAt);
    const byID = entries => [...entries].sort((a,b) => a.id.localeCompare(b.id));
    assert.deepEqual(byID(loaded.entries), byID(exported.entries));
    for (const route of categoryRoutes) {
      await page.goto(`${origin}/Champagne247/${route}/`);
      const connected = page.locator('#cards article').filter({ has: page.locator('h3', { hasText: entry.title }) });
      assert.equal(await connected.count(), 1);
      assert.equal(await connected.locator('img').getAttribute('src'), new URL(entry.media[0].url,origin).href);
      assert.equal(await connected.locator('.card-link').getAttribute('href'), entry.links[0].url);
    }
    await page.goto(`${origin}/Champagne247/explore/`);
    assert.equal(await page.locator(`[data-entry-id="${entry.id}"]`).count(), 1);
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
});

test('editing review status or story rebuilds exports and invalid edits cannot reuse a public preview', async () => {
  const { context, page, errors } = await session();
  try {
    await compose(page, 'now');
    await page.click('#prepare');
    await page.selectOption('#mode', 'draft');
    await page.fill('#story', 'Changed after preview, awaiting review.');
    const downloadPromise = page.waitForEvent('download');
    await page.click('#downloadMaster');
    const entry = parseExport(await fs.readFile(await (await downloadPromise).path(), 'utf8')).entries[0];
    assert.equal(entry.story, 'Changed after preview, awaiting review.');
    assert.equal(entry.visibility, 'private');
    assert.equal(entry.lifecycle, 'draft');
    await page.fill('#story', '');
    assert.equal(await page.evaluate(() => { downloadMaster(); return currentEntry; }), null);
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
});

test('draft and planned exports remain excluded from My Life, Explore and connected category feeds', async () => {
  for (const mode of ['draft', 'schedule']) {
    const { context, page, errors } = await session();
    try {
      await compose(page, mode);
      await page.click('#prepare');
      const source = await page.inputValue('#masterOutput');
      const entry = parseExport(source).entries[0];
      assert.equal(entry.lifecycle, 'draft');
      assert.equal(entry.visibility, 'private');
      assert.equal(entry.distribution.state, 'draft');
      await useExport(context, source);
      for (const route of ['', 'explore/', ...categoryRoutes.map(route => route + '/')]) {
        await page.goto(`${origin}/Champagne247/${route}`);
        assert.equal(await page.locator('#feed, #cards').getByText(entry.title, { exact: true }).count(), 0, route);
      }
      assert.deepEqual(errors, []);
    } finally { await context.close(); }
  }
});

test('provenance, business/source links, projects and multiple places survive reload/export and share map records', async () => {
  const { context, page, errors } = await session();
  try {
    await compose(page, 'now');
    await page.fill('#projects','NOVA, content-audit');
    await page.fill('#sourceURLs','https://example.test/public-evidence');
    await page.locator('.link-kind').selectOption('business');
    await page.locator('.link-source').fill('https://example.test/operator');
    await page.locator('.media-origin').first().selectOption('ai');
    await page.locator('.media-reason').first().fill('Synthetic fallback for regression only');
    for (const [kind,asset] of [['official','hero-family.webp'],['own','hero-fitness.webp']]) {
      await page.click('#addMedia');
      const row=page.locator('.media-item').last();
      await row.locator('.media-origin').selectOption(kind);
      await row.locator('.media-url').fill('/Champagne247/assets/map/Hero/'+asset);
      await row.locator('.media-source').fill('https://example.test/subject');
    }
    for (const [index,role] of ['launch','restaurant','hotel'].entries()) {
      if(index) await page.click('#addLocation');
      const row=page.locator('.location-item').nth(index);
      await row.locator('.location-label').fill('Synthetic '+role);
      await row.locator('.location-role').selectOption(role);
      if(index<2) {
        await row.locator('.location-lat').fill(String(index));
        await row.locator('.location-lng').fill(String(index));
      }
    }
    await page.click('#saveDraft');
    await page.reload();
    assert.equal(await page.inputValue('#projects'),'NOVA, content-audit');
    assert.equal(await page.locator('.media-origin').nth(2).inputValue(),'own');
    assert.equal(await page.locator('.location-role').nth(1).inputValue(),'restaurant');
    await page.click('#prepare');
    const source=await page.inputValue('#masterOutput');
    const entry=parseExport(source).entries[0];
    assert.equal(entry.locations.length,3);
    assert.equal(entry.media.length,3); // Original AI metadata remains stored, but is not presented over actual media.
    assert.equal(entry.links[0].kind,'business');
    assert.deepEqual(entry.projects,['NOVA','content-audit']);
    assert.equal(entry.sources[0].url,'https://example.test/public-evidence');
    await useExport(context,source);
    await page.goto(`${origin}/Champagne247/#${entry.id}`);
    const card=page.locator('#'+entry.id);
    assert.ok((await card.locator('.entry-media img').getAttribute('src')).endsWith('hero-fitness.webp'));
    assert.match(await card.textContent(),/Business: Connected M.A.P./);
    assert.match(await card.textContent(),/Project: NOVA/);
    assert.match(await card.textContent(),/Source: https:\/\/example.test\/public-evidence/);
    assert.equal(await card.locator('.record-places li').count(),3);
    assert.doesNotMatch(await card.textContent(),/AI illustration/);
    await page.goto(`${origin}/Champagne247/explore/`);
    const pinData=await page.evaluate(id=>markers.filter(marker=>marker.getPopup().getContent().includes(`data-record-id="${id}"`)).map(marker=>({point:marker.getLatLng(),popup:marker.getPopup().getContent()})),entry.id);
    assert.equal(pinData.length,2); // Third place has no coordinates; it must not become a (0,0) pin.
    assert.match(pinData[0].popup,/Business: Connected M.A.P./);
    assert.match(pinData[0].popup,/hero-fitness.webp/);
    assert.match(pinData[0].popup,/place unverified/);
    await page.evaluate(()=>render('fitness'));
    assert.equal(await page.locator(`[data-entry-id="${entry.id}"]`).count(),1);
    await page.evaluate(id=>markers.find(marker=>marker.getPopup().getContent().includes(`data-record-id="${id}"`)).openPopup(),entry.id);
    assert.match(await page.locator('.leaflet-popup-content').textContent(),/Synthetic restaurant/);
    for(const route of categoryRoutes) {
      await page.goto(`${origin}/Champagne247/${route}/`);
      const details=page.locator(`.map-record-details[data-record-id="${entry.id}"]`);
      assert.match(await details.textContent(),/Business: Connected M.A.P./);
      assert.equal(await details.locator('.record-places li').count(),3);
    }
    assert.deepEqual(errors,[]);
  } finally { await context.close(); }
});

test('unknown event dates stay unknown; reviewed exports reject unsupported media provenance and private places', async () => {
  const {context,page,errors}=await session();
  try {
    await compose(page,'now');
    await page.selectOption('#datePrecision','unknown');
    await page.locator('.media-origin').first().selectOption('ai');
    assert.equal(await page.evaluate(()=>buildEntry()),null); // No reason provided for an illustration.
    await page.locator('.media-reason').first().fill('No actual/official subject media supplied for this synthetic fixture');
    const entry=await page.evaluate(()=>buildEntry());
    assert.equal(entry.eventAt,null);
    assert.equal(entry.datetime,null);
    assert.equal(entry.displayDate,'Date not yet confirmed');
    await page.locator('.location-label').first().fill('Private synthetic place');
    await page.locator('.location-visibility').first().selectOption('private');
    assert.equal(await page.evaluate(()=>buildEntry()),null);
    assert.deepEqual(errors,[]);
  } finally {await context.close();}
});


test('reviewed export excludes preexisting private records and private locations', async () => {
 const {context,page,errors}=await session();
 try {
  await compose(page,'now');
  await page.evaluate(()=>{
   DATA.entries.push({id:'secret-draft',title:'SECRET DRAFT',visibility:'private',lifecycle:'draft'});
   DATA.entries[0].locations.push({label:'SECRET HOME',lat:1,lng:2,visibility:'private'});
  });
  await page.click('#prepare');
  const source=await page.inputValue('#masterOutput');
  assert.doesNotMatch(source,/SECRET DRAFT|SECRET HOME/);
  assert.ok((await page.evaluate(()=>DATA.entries)).some(e=>e.id==='secret-draft'));
  assert.deepEqual(errors,[]);
 } finally {await context.close();}
});

test('selected files remain previews and never create an unuploaded media link', async () => {
 const {context,page,errors}=await session();
 try {
  await page.goto(`${origin}/Champagne247/manage/`);
  await page.setInputFiles('#freshUpload',{name:'synthetic.png',mimeType:'image/png',buffer:Buffer.from('preview only')});
  assert.match(await page.textContent('#uploadName'),/preview only/);
  assert.equal(await page.locator('.media-url').first().inputValue(),'');
  await page.click('#saveDraft');
  await page.reload();
  assert.equal(await page.locator('.media-url').first().inputValue(),'');
  assert.deepEqual(errors,[]);
 } finally {await context.close();}
});

