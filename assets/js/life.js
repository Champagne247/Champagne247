/* One data source; filters, search, photos and sharing progressively enhance it. */
(() => {
  'use strict';
  const base = '/Champagne247/';
  const canonical = 'https://champagne247.github.io/Champagne247/';
  const fallbackImage = `${base}assets/map/Hero/hero-all.webp`;
  const data = window.MAP_DATA || {};
  const categories = data.categories || {};
  const routes = {
    family: {title:'Family & legacy', copy:'The people at the heart of everything.', href:'family/'},
    fitness: {title:'Strength & fitness', copy:'Build the strength to live your vision.', href:'fitness/'},
    freeflight: {title:'Looking4Lift', copy:'A little higher. A little further. A little freer.', href:'looking4lift/'},
    professional: {title:'Work & purpose', copy:'Real work. Real solutions. Get it done.', href:'professional/'},
    creator: {title:'Create & connect', copy:'Ideas into experiences. Vision into action.', href:'creator/'},
    travel: {title:'Food & adventure', copy:'Good food. New places. A life well lived.', href:'food-travel/'}
  };
  const entries = (Array.isArray(data.entries) ? data.entries : []).filter(entry =>
    entry.visibility === 'public' && !['archived','draft'].includes(entry.lifecycle) &&
    // Keep publishing tests in the source data, outside the public editorial feed.
    entry.distribution?.state !== 'testing'
  );
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function safeURL(value) {
    try {
      const url = new URL(String(value || ''), location.origin);
      return ['https:','http:'].includes(url.protocol) ? url.href : '';
    } catch { return ''; }
  }
  const time = entry => {
    const value = Date.parse(entry.eventAt || entry.datetime || entry.createdAt || '');
    return Number.isFinite(value) ? value : 0;
  };
  const isCurrent = entry => entry.status === 'now' && time(entry) <= Date.now() && Date.now() - time(entry) < 48 * 60 * 60 * 1000;
  entries.sort((a,b) => Number(isCurrent(b)) - Number(isCurrent(a)) || time(b) - time(a));
  const photos = entry => (entry.media || []).filter(item => item.type === 'image' && safeURL(item.url));
  const labels = key => categories[key]?.label || key;
  const params = new URLSearchParams(location.search);
  let activeFilter = routes[params.get('path')] ? params.get('path') : 'all';
  let query = (params.get('q') || '').slice(0,200);
  let limit = location.hash && entries.some(entry => `#${entry.id}` === location.hash) ? entries.length : 6;
  let toastTimer;
  let openedEntry;
  let photoIndex = 0;
  let galleryOpener;

  $('path-grid').innerHTML = Object.entries(routes).map(([key,route], index) => `
    <a class="path-card" href="${base}${route.href}">
      <img src="${esc(safeURL(categories[key]?.image) || fallbackImage)}" alt="" loading="lazy" width="600" height="440">
      <span class="path-number">0${index + 1} / LIFE PATH</span><span class="path-arrow" aria-hidden="true">↗</span>
      <div class="path-copy"><h3>${esc(route.title)}</h3><p>${esc(route.copy)}</p></div>
    </a>`).join('');

  $('filters').innerHTML = [['all','All moments'], ...Object.keys(routes).map(key => [key,labels(key)])].map(([key,label]) =>
    `<button class="filter" data-filter="${key}" type="button" aria-pressed="${key === activeFilter}" aria-controls="feed">${esc(label)}</button>`
  ).join('');
  $('search').value = query;

  function displayDate(entry) {
    return String(entry.displayDate || (time(entry) ? new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'America/Chicago'}).format(time(entry)) : 'Ongoing journey'))
      .replace(/\s*[•·]\s*Happening now/gi,'');
  }
  function statusLabel(entry) {
    if (entry.status === 'now' && !isCurrent(entry)) return 'Recorded';
    return data.statuses?.[entry.status]?.label || 'Journey';
  }
  function card(entry) {
    const images = photos(entry);
    const paragraphs = String(entry.story || '').trim().split(/\n\s*\n/);
    const locations = (entry.locations || []).filter(item => typeof item === 'string' || item.visibility !== 'private').map(item => typeof item === 'string' ? item : item.label).filter(Boolean);
    const links = (entry.links || []).filter(link => safeURL(link.url));
    const entryURL = `${canonical}#${encodeURIComponent(entry.id)}`;
    return `<article class="entry" id="${esc(entry.id)}">
      ${images.length ? `<button type="button" class="entry-media" data-gallery="${esc(entry.id)}" aria-label="View ${images.length} photo${images.length === 1 ? '' : 's'} from ${esc(entry.title)}"><img src="${esc(safeURL(images[0].url))}" alt="${esc(images[0].alt || images[0].caption || entry.title)}" loading="lazy" width="900" height="600"><span class="photo-label"><span aria-hidden="true">↗</span> ${images.length > 1 ? `${images.length} photos` : 'View photo'}</span></button>` : ''}
      <div class="entry-content">
        <div class="entry-meta"><span>${esc((entry.categories || []).map(labels).join(' / '))}</span><span aria-hidden="true">·</span><time ${time(entry) ? `datetime="${new Date(time(entry)).toISOString()}"` : ''}>${esc(displayDate(entry))}</time><span class="entry-status">${isCurrent(entry) ? '● ' : ''}${esc(statusLabel(entry))}</span></div>
        <h3>${esc(entry.title)}</h3><p class="entry-story">${esc(paragraphs[0])}</p>
        ${paragraphs.length > 1 ? `<details class="entry-details"><summary>Read the full moment <span aria-hidden="true"> &nbsp;＋</span></summary><p class="entry-story">${esc(paragraphs.slice(1).join('\n\n'))}</p></details>` : ''}
        ${locations.length ? `<p class="entry-location">${esc(locations.join(' · '))}</p>` : ''}
        <div class="entry-tags">${(entry.categories || []).filter(key => routes[key]).map(key => `<button class="entry-tag" data-tag="${esc(key)}" type="button">${esc(labels(key))}</button>`).join('')}</div>
        ${links.length ? `<div class="entry-links">${links.map(link => {const external = new URL(safeURL(link.url)).origin !== location.origin; return `<a href="${esc(safeURL(link.url))}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${esc(link.label)} <span aria-hidden="true">&nbsp;↗</span>${external ? '<span class="sr-only"> (opens in a new tab)</span>' : ''}</a>`;}).join('')}</div>` : ''}
        <div class="entry-footer"><div class="entry-author"><span class="author-avatar" aria-hidden="true">CC</span><span>Christopher Champagne</span></div><div class="entry-actions"><button type="button" data-copy="${esc(entry.id)}" aria-label="Copy ${esc(entry.title)}">Copy</button><button type="button" data-share="${esc(entry.id)}" aria-label="Share ${esc(entry.title)}">Share ↗</button><a href="${esc(entryURL)}" aria-label="Link to ${esc(entry.title)}">Link</a></div></div>
      </div>
    </article>`;
  }
  function render() {
    const term = query.trim().toLocaleLowerCase();
    const visible = entries.filter(entry => (activeFilter === 'all' || entry.categories?.includes(activeFilter)) &&
      [entry.title,entry.story,...(entry.categories || []).map(labels),...(entry.locations || []).map(item => typeof item === 'string' ? item : item.visibility === 'private' ? '' : item.label)].join(' ').toLocaleLowerCase().includes(term));
    $('feed').innerHTML = visible.length ? visible.slice(0,limit).map(card).join('') : `<div class="empty"><strong>${data.entries ? 'No moments found.' : 'The journey could not load.'}</strong><br>${data.entries ? 'Try another word or clear the filters to explore the whole journey.' : 'Refresh the page to try again.'}</div>`;
    $('result-count').textContent = `${visible.length} moment${visible.length === 1 ? '' : 's'}${activeFilter !== 'all' ? ` · ${labels(activeFilter)}` : ' · All paths'}${query.trim() ? ' · Search results' : ''}`;
    $('reset').hidden = activeFilter === 'all' && !query;
    $('load-more').hidden = visible.length <= limit;
    document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.filter === activeFilter)));
  }
  function syncURL() {
    const url = new URL(location.href);
    activeFilter === 'all' ? url.searchParams.delete('path') : url.searchParams.set('path',activeFilter);
    query ? url.searchParams.set('q',query) : url.searchParams.delete('q');
    url.hash = '';
    history.replaceState(null,'',url);
  }
  function filterTo(value) {
    activeFilter = routes[value] ? value : 'all';
    limit = 6;
    render(); syncURL();
  }
  function toast(message) {
    clearTimeout(toastTimer);
    $('toast').textContent = message;
    $('toast').classList.add('visible');
    toastTimer = setTimeout(() => $('toast').classList.remove('visible'),4000);
  }
  const scrollBehavior = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  function updatePathControls() {
    const grid = $('path-grid');
    $('paths-prev').disabled = grid.scrollLeft < 2;
    $('paths-next').disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 2;
  }
  $('paths-prev').addEventListener('click',() => $('path-grid').scrollBy({left:-$('path-grid').clientWidth,behavior:scrollBehavior()}));
  $('paths-next').addEventListener('click',() => $('path-grid').scrollBy({left:$('path-grid').clientWidth,behavior:scrollBehavior()}));
  $('path-grid').addEventListener('scroll',updatePathControls,{passive:true});
  new ResizeObserver(updatePathControls).observe($('path-grid'));

  $('search').addEventListener('input',event => {query = event.target.value.slice(0,200);limit = 6;render();syncURL();});
  $('reset').addEventListener('click',() => {query = '';activeFilter = 'all';limit = 6;$('search').value = '';render();syncURL();$('search').focus();});
  $('load-more').addEventListener('click',() => {
    const previous = $('feed').children.length;
    limit += 6;render();
    $('feed').children[previous]?.querySelector('button,a,summary')?.focus();
  });
  function showPhoto(index) {
    const images = photos(openedEntry);
    photoIndex = (index + images.length) % images.length;
    const image = images[photoIndex];
    $('lightbox-image').src = safeURL(image.url);
    $('lightbox-image').alt = image.alt || image.caption || openedEntry.title;
    $('lightbox-title').textContent = openedEntry.title;
    $('lightbox-caption').textContent = `${image.caption || openedEntry.title} · ${photoIndex + 1} / ${images.length}`;
    $('lightbox-prev').hidden = $('lightbox-next').hidden = images.length < 2;
  }
  $('lightbox-close').addEventListener('click',() => $('lightbox').close());
  $('lightbox').addEventListener('close',() => galleryOpener?.focus());
  $('lightbox-prev').addEventListener('click',() => showPhoto(photoIndex - 1));
  $('lightbox-next').addEventListener('click',() => showPhoto(photoIndex + 1));
  $('lightbox').addEventListener('keydown',event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {event.preventDefault();showPhoto(photoIndex + (event.key === 'ArrowLeft' ? -1 : 1));}
  });
  $('lightbox').addEventListener('click',event => {if(event.target === $('lightbox')) {const rect = $('lightbox').getBoundingClientRect();if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) $('lightbox').close();}});
  let touchStart;
  $('lightbox-image').addEventListener('touchstart',event => {touchStart = event.touches[0].clientX;},{passive:true});
  $('lightbox-image').addEventListener('touchend',event => {if(touchStart !== undefined){const distance = event.changedTouches[0].clientX - touchStart;if(Math.abs(distance) > 60)showPhoto(photoIndex + (distance < 0 ? 1 : -1));touchStart = undefined;}},{passive:true});
  document.addEventListener('error',event => {
    const image = event.target;
    if(image instanceof HTMLImageElement && image.src !== new URL(fallbackImage,location.origin).href) {image.src = fallbackImage;image.alt = 'My Life journey illustration';}
  },true);
  async function copy(text) {
    try {await navigator.clipboard.writeText(text);toast('Copied. Ready to share.');}
    catch {window.prompt('Copy this moment:',text);}
  }
  document.addEventListener('click',async event => {
    const button = event.target.closest('button');
    if(button?.dataset.filter) {filterTo(button.dataset.filter);return;}
    if(button?.dataset.tag) {filterTo(button.dataset.tag);$('journey').scrollIntoView({behavior:scrollBehavior()});$('filters').querySelector(`[data-filter="${activeFilter}"]`)?.focus({preventScroll:true});return;}
    if(button?.dataset.gallery) {openedEntry = entries.find(entry => entry.id === button.dataset.gallery);galleryOpener = button;showPhoto(0);$('lightbox').showModal();return;}
    const id = button?.dataset.copy || button?.dataset.share;
    if(id) {
      const entry = entries.find(item => item.id === id);
      const url = `${canonical}#${encodeURIComponent(entry.id)}`;
      const text = `${entry.title}\n\n${entry.story}\n\n${url}`;
      if(button.dataset.copy) {await copy(text);return;}
      if(navigator.share) {
        try {await navigator.share({title:entry.title,text:entry.story,url});}
        catch(error) {if(error.name !== 'AbortError')await copy(text);}
      } else {await copy(text);}
    }
    if(event.target.closest('.mobile-menu nav a'))document.querySelector('.mobile-menu').open = false;
  });
  function openHash() {
    let id;
    try {id = decodeURIComponent(location.hash.slice(1));} catch {return;}
    if(!entries.some(entry => entry.id === id)) return;
    activeFilter = 'all';query = '';$('search').value = '';limit = entries.length;render();
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({behavior:'auto'}));
  }
  addEventListener('hashchange',openHash);
  render();updatePathControls();openHash();
})();
