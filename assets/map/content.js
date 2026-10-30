/* Shared presentation rules. Rendering never changes the canonical records. */
(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function url(value) {
    if (!value || typeof value !== 'string') return '';
    try {
      const parsed = new URL(value, location.origin + '/Champagne247/');
      if(parsed.username || parsed.password) return '';
      return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : '';
    } catch { return ''; }
  }
  function provenance(item) {
    if (item.provenance) return item.provenance;
    return { kind: /\/Hero\//i.test(item.url || '') ? 'illustration' : 'unverified', actualSubject: false };
  }
  function rank(item) {
    const p = provenance(item);
    if (p.kind === 'own' && p.actualSubject === true) return 0;
    if (p.kind === 'official' && p.actualSubject === true && /^https?:\/\//i.test(p.sourceUrl || '') && url(p.sourceUrl)) return 1;
    if (p.kind === 'ai' && p.reason) return 2;
    return 3;
  }
  function media(entry, type) {
    const candidates=(entry.media || []).filter(item => url(item.url));
    const hasActual=candidates.some(item=>rank(item)<2);
    return candidates.filter(item => (!type || item.type === type) &&
      (provenance(item).kind !== 'ai' || (!hasActual && provenance(item).reason)))
      .map((item, index) => ({ item, index })).sort((a,b) => rank(a.item)-rank(b.item) || a.index-b.index)
      .map(row => row.item);
  }
  function label(item) {
    const p = provenance(item);
    return p.kind === 'own' && p.actualSubject ? 'Chris’s actual photo/video'
      : p.kind === 'official' && rank(item) === 1 ? 'Official subject image/video'
      : p.kind === 'licensed' ? 'Licensed subject photo — not a trip photo'
      : p.kind === 'ai' ? 'AI illustration — concept, not an event photo'
      : p.kind === 'illustration' ? 'Category illustration — origin unverified'
      : 'Existing media — provenance awaiting verification';
  }
  function primary(entry, fallback) {
    return media(entry).find(item=>['image','video'].includes(item.type)) || { type:'image',url:fallback,caption:'Category illustration',provenance:{kind:'illustration',actualSubject:false} };
  }
  function hero(item, title='', single=false) {
    if(!single){const entry=(window.MAP_DATA?.entries||[]).find(e=>(e.media||[]).includes(item));if(entry&&media(entry).filter(m=>['image','video'].includes(m.type)).length>1)return gallery(entry);}
    const source=url(item.url);
    return item.type==='video'
      ? `<video src="${esc(source)}" controls preload="metadata" aria-label="${esc(item.caption || title)}" style="width:100%;max-height:420px"></video>`
      : `<img src="${esc(source)}" alt="${esc(item.alt || item.caption || title)}" loading="lazy" style="max-width:100%" onerror="this.hidden=true;this.insertAdjacentText('afterend','Image unavailable — source retained')">`;
  }

  function gallery(entry, fallback='') {
    const items=media(entry).filter(item=>['image','video'].includes(item.type));
    if(!items.length)return '<figure class="entry-media entry-illustration">'+hero(primary(entry,fallback),entry.title,true)+'<figcaption class="photo-label">Category illustration</figcaption></figure>';
    const images=media(entry,'image');
    return '<div class="moment-gallery" role="region" aria-roledescription="carousel" aria-label="'+esc(entry.title)+' media">'+
      '<div class="moment-track" tabindex="0" aria-label="Swipe or use arrow keys to browse media">'+items.map((item,i)=>
        '<div class="moment-slide" role="group" aria-roledescription="slide" aria-label="'+(i+1)+' of '+items.length+'">'+
        (item.type==='video'?hero(item,entry.title,true):
          '<button type="button" class="entry-media" data-gallery="'+esc(entry.id)+'" data-photo-index="'+images.indexOf(item)+'" aria-label="View '+images.length+' photo'+(images.length===1?'':'s')+' from '+esc(entry.title)+'">'+hero(item,entry.title,true)+'</button>')+
        '<div class="moment-caption">'+esc(item.caption||item.alt||entry.title)+'</div></div>').join('')+'</div>'+
      (items.length>1?'<div class="moment-controls"><button type="button" data-moment-step="-1" aria-label="Previous media">←</button><span class="moment-count" aria-live="polite">1 / '+items.length+'</span><button type="button" data-moment-step="1" aria-label="Next media">→</button></div>':'')+'</div>';
  }
  const galleryStyle=document.createElement('style');
  galleryStyle.textContent=`
.moment-gallery{position:relative;isolation:isolate;width:100%;height:100%;background:#050c16;overflow:hidden}
.moment-track{display:flex;width:100%;height:100%;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;overscroll-behavior-x:contain}
.moment-track::-webkit-scrollbar{display:none}
.moment-slide{position:relative;flex:0 0 100%;min-width:0;scroll-snap-align:start;scroll-snap-stop:always;display:flex;align-items:center;justify-content:center;background:#050c16}
.moment-gallery .entry-media{display:block;width:100%;height:100%;padding:0;border:0;background:transparent;cursor:zoom-in}
.moment-gallery .moment-slide img,.moment-gallery .moment-slide video{display:block;width:100%!important;height:100%!important;max-height:none!important;object-fit:contain!important;margin:0;transform:none!important}
.entry>.moment-gallery{height:clamp(280px,42vw,460px)}
.moment-caption{position:absolute;left:0;right:0;bottom:0;padding:34px 18px 15px;background:linear-gradient(transparent,#020811e8);color:#e8f8ff;font:12px/1.5 Arial,sans-serif;pointer-events:none}
.moment-gallery:has(.moment-controls) .moment-caption{padding-right:150px}
.moment-controls{position:absolute;z-index:2;right:12px;bottom:10px;display:flex;gap:7px;align-items:center;background:#041523ed;border:1px solid #81dfff66;border-radius:30px;padding:4px;color:#d9f7ff;font:12px Arial,sans-serif}
.moment-controls button{display:grid;place-items:center;width:40px;height:40px;border:0;border-radius:50%;background:#11394e;color:#e9fbff;font-size:20px;cursor:pointer}
.moment-controls button:hover{background:#1b607c}.moment-count{min-width:35px;text-align:center}
.moment-gallery:has(video) .moment-controls{top:10px;bottom:auto}.moment-slide:has(video) .moment-caption{top:0;bottom:auto;padding-top:14px;background:linear-gradient(#020811e8,transparent)}
.moment-track:focus-visible,.moment-controls button:focus-visible{outline:3px solid #a0efff;outline-offset:-3px}
.media:has(.moment-gallery)>.caption{display:none}
.moment-credits{font-size:11px;line-height:1.6;color:#a6bdcf;margin-top:16px}.moment-credits summary{cursor:pointer;min-height:36px;display:flex;align-items:center}.moment-credits ul{padding-left:18px}
@media(max-width:600px){.entry>.moment-gallery{height:340px}.moment-caption{font-size:11px;padding-left:12px}.moment-controls{right:8px}.moment-gallery:has(.moment-controls) .moment-caption{padding-right:145px}}
`;
  document.head.append(galleryStyle);
  function moveGallery(gallery,delta){
    const track=gallery.querySelector('.moment-track');
    const slides=track.children.length;
    const current=Math.round(track.scrollLeft/track.clientWidth);
    const next=(current+delta+slides)%slides;
    track.querySelectorAll('video').forEach(video=>video.pause());
    track.scrollTo({left:next*track.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-moment-step]');
    if(button){event.preventDefault();moveGallery(button.closest('.moment-gallery'),Number(button.dataset.momentStep));}
  });
  document.addEventListener('keydown',event=>{
    if(!event.target.matches('.moment-track')||!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();moveGallery(event.target.closest('.moment-gallery'),event.key==='ArrowRight'?1:-1);
  });
  document.addEventListener('scroll',event=>{
    const track=event.target;
    if(!track.classList?.contains('moment-track'))return;
    const index=Math.round(track.scrollLeft/track.clientWidth);
    const count=track.closest('.moment-gallery').querySelector('.moment-count');
    if(count)count.textContent=(index+1)+' / '+track.children.length;
    track.querySelectorAll('video').forEach(video=>{if(!track.children[index]?.contains(video))video.pause();});
  },true);

  function coordinates(place) {
    if (place.visibility === 'private') return false;
    return ['lat','lng'].every(key => place[key] !== null && place[key] !== undefined && String(place[key]).trim() !== '' && Number.isFinite(Number(place[key]))) &&
      Math.abs(Number(place.lat)) <= 90 && Math.abs(Number(place.lng)) <= 180;
  }
  function places(entry) {
    return (entry.locations || []).filter(place => place && place.visibility !== 'private');
  }
  function mapsURL(place) {
    if (place.visibility === 'private') return '';
    const supplied = url(place.mapsUrl);
    if (supplied) {
      const parsed = new URL(supplied);
      if (['www.google.com','google.com','maps.google.com','maps.app.goo.gl'].includes(parsed.hostname) &&
          (!['www.google.com','google.com'].includes(parsed.hostname) || parsed.pathname.startsWith('/maps'))) return supplied;
    }
    if (!place.label) return '';
    const link = new URL('https://www.google.com/maps/search/');
    link.searchParams.set('api','1'); link.searchParams.set('query',place.label);
    // A generated search URL is a lookup, never proof that a place was verified.
    return link.href;
  }
  function placeVerified(place) {
    return place.visibility !== 'private' && place.verification === 'verified' &&
      /^https?:\/\//i.test(place.sourceUrl || '') && Boolean(url(place.sourceUrl)) &&
      Boolean(place.mapsUrl) && mapsURL(place) === url(place.mapsUrl);
  }
  function details(entry) {
    const dateNote=entry.datePrecision==='unknown' ? '<p>Event date not confirmed.</p>' : entry.datePrecision==='day' ? '<p>Day known; time approximate.</p>' : '';
    const projects = (entry.projects || []).map(id => `<span class="tag">Project: ${esc(id)}</span>`).join(' ');
    const locations = places(entry).map(place => `<li>${esc(place.label)} · ${esc(place.role || 'place')} · ${esc(place.precision || 'precision unverified')}<br><a href="${esc(mapsURL(place))}" target="_blank" rel="noopener noreferrer">${placeVerified(place) ? 'Source-marked verified place · Google Maps' : 'Find on Google Maps — place unverified'}</a></li>`).join('');
    const refs = (entry.sources || []).filter(ref => url(ref.url)).map(ref => `<li><a href="${esc(url(ref.url))}" target="_blank" rel="noopener noreferrer">Source: ${esc(ref.label || ref.url)}</a></li>`).join('');
    const business = (entry.links || []).filter(link => link.kind === 'business' && url(link.url)).map(link => `<li><a href="${esc(url(link.url))}" target="_blank" rel="noopener noreferrer">Business: ${esc(link.label)}</a> · ${esc(link.verification || 'unverified')}</li>`).join('');
    const extraMedia = media(entry).filter(item=>!['image','video'].includes(item.type)).map(item=>`<a href="${esc(url(item.url))}" target="_blank" rel="noopener noreferrer">${esc(item.caption || 'Media source')}</a>`).join('');
    const credits = media(entry).map(item => { const p=provenance(item); return `<li>${esc(label(item))}${p.credit ? ' · '+esc(p.credit) : ''}${p.reason ? ' · '+esc(p.reason) : ''}${url(p.licenseUrl) ? ` · <a href="${esc(url(p.licenseUrl))}" target="_blank" rel="noopener noreferrer">Image license</a>` : ''}${url(p.sourceUrl) ? ` · <a href="${esc(url(p.sourceUrl))}" target="_blank" rel="noopener noreferrer">Image source</a>` : ''}</li>`; }).join('');
    return `<div class="map-record-details" data-record-id="${esc(entry.id)}">${dateNote}${projects}${locations ? `<ul class="record-places">${locations}</ul>` : ''}${business || refs ? `<ul>${business}${refs}</ul>` : ''}${credits ? `<details class="moment-credits"><summary>Media credits &amp; sources</summary><ul>${credits}</ul></details>` : ''}${extraMedia}</div>`;
  }
  function publicEntries(entries) {
    return entries.filter(entry => entry.visibility === 'public' &&
      !['draft', 'archived'].includes(entry.lifecycle)).map(entry => ({
        ...entry,
        locations: places(entry)
      }));
  }
  window.MAP_CONTENT = { publicEntries, esc, url, provenance, media, label, primary, hero, gallery, coordinates, places, mapsURL, placeVerified, details };
})();

