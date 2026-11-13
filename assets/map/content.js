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
    return item.type === 'embed' ? 'Original social post • hosted by the source platform'
      : p.kind === 'social' ? 'Original social post preview • not a full media archive'
      : p.kind === 'own' && p.actualSubject ? 'Chris’s actual photo/video'
      : p.kind === 'official' && rank(item) === 1 ? 'Official subject image/video'
      : p.kind === 'licensed' ? 'Licensed subject photo — not a trip photo'
      : p.kind === 'ai' ? 'AI illustration — concept, not an event photo'
      : p.kind === 'illustration' ? 'Category illustration — origin unverified'
      : 'Existing media — provenance awaiting verification';
  }
  function primary(entry, fallback) {
    return media(entry).find(item=>['image','video'].includes(item.type)) || socialMedia(entry)[0] || { type:'image',url:fallback,caption:'Category illustration',provenance:{kind:'illustration',actualSubject:false} };
  }
  // Build players only from exact public post URLs. Profile links are never players.
  function socialMedia(entry) {
    const seen=new Set();
    return [...(entry.sources||[]),...(entry.links||[]).filter(link=>['social','video'].includes(link.kind))]
      .flatMap(ref=>{
        let parsed;try{parsed=new URL(url(ref.url));}catch{return [];}
        const host=parsed.hostname.replace(/^www\./,'');
        let network,src,id;
        if(['youtube.com','youtu.be'].includes(host)){
          id=host==='youtu.be'?parsed.pathname.slice(1):parsed.pathname==='/watch'?parsed.searchParams.get('v'):parsed.pathname.match(/^\/(?:shorts|embed)\/([^/]+)\/?$/)?.[1];
          if(!/^[A-Za-z0-9_-]{11}$/.test(id||''))return [];
          network='YouTube';src='https://www.youtube-nocookie.com/embed/'+id;
        }else if(host==='tiktok.com'&&(id=parsed.pathname.match(/^\/@[^/]+\/video\/(\d+)\/?$/)?.[1])){
          network='TikTok';src='https://www.tiktok.com/player/v1/'+id+'?autoplay=0';
        }else if(host==='instagram.com'&&(id=parsed.pathname.match(/^\/(?:p|reel)\/([A-Za-z0-9_-]+)\/?$/)?.[1])){
          network='Instagram';src='https://www.instagram.com/p/'+id+'/embed/';
        }else if(host==='facebook.com'&&/^\/(?:\d+\/posts\/\d+|reel\/\d+|[^/]+\/videos\/\d+)\/?$/.test(parsed.pathname)){
          network='Facebook';id=parsed.pathname;src='https://www.facebook.com/plugins/post.php?href='+encodeURIComponent(parsed.origin+parsed.pathname)+'&show_text=true&width=500';
        }else return [];
        const key=network+':'+id;if(seen.has(key))return [];seen.add(key);
        return [{type:'embed',url:parsed.origin+parsed.pathname+(host==='youtube.com'&&parsed.pathname==='/watch'?'?v='+id:''),embedUrl:src,network,caption:network+' • original post',entryId:entry.id}];
      });
  }
  function socialPlayer(item,title) {
    return '<div class="social-player"><div class="social-player-stage"><p>'+esc(item.network)+' · Original post</p><button type="button" data-social-load="'+esc(item.embedUrl)+'" data-social-title="'+esc(title)+'">Load '+esc(item.network)+' post</button><p class="social-player-note">Load the post to view its photos or play its video here. The platform may require sign-in or block embedded playback.</p></div><a href="'+esc(url(item.url))+'" target="_blank" rel="noopener noreferrer">Open original on '+esc(item.network)+' ↗</a></div>';
  }
  function hero(item, title='', single=false) {
    if(!single){const entry=(window.MAP_DATA?.entries||[]).find(e=>(e.media||[]).includes(item)||e.id===item.entryId);if(entry&&media(entry).filter(m=>['image','video'].includes(m.type)).length+socialMedia(entry).length>1)return gallery(entry);}
    if(item.type==='embed')return socialPlayer(item,title);
    const source=url(item.url);
    return item.type==='video'
      ? `<video src="${esc(source)}" controls preload="metadata" aria-label="${esc(item.caption || title)}" style="width:100%;max-height:420px"></video>`
      : `<img src="${esc(source)}" alt="${esc(item.alt || item.caption || title)}" loading="lazy" style="max-width:100%" onerror="this.hidden=true;this.insertAdjacentText('afterend','Image unavailable — source retained')">`;
  }

  function gallery(entry, fallback='') {
    const items=[...media(entry).filter(item=>['image','video'].includes(item.type)),...socialMedia(entry)];
    if(!items.length)return '<figure class="entry-media entry-illustration">'+hero(primary(entry,fallback),entry.title,true)+'<figcaption class="photo-label">Category illustration</figcaption></figure>';
    const images=media(entry,'image');
    return '<div class="moment-gallery" role="region" aria-roledescription="carousel" aria-label="'+esc(entry.title)+' media">'+
      '<div class="moment-track" tabindex="0" aria-label="Swipe or use arrow keys to browse media">'+items.map((item,i)=>
        '<div class="moment-slide" role="group" aria-roledescription="slide" aria-label="'+(i+1)+' of '+items.length+'">'+
        (['video','embed'].includes(item.type)?hero(item,entry.title,true):
          '<button type="button" class="entry-media" data-gallery="'+esc(entry.id)+'" data-photo-index="'+images.indexOf(item)+'" aria-label="View '+images.length+' photo'+(images.length===1?'':'s')+' from '+esc(entry.title)+'">'+hero(item,entry.title,true)+'</button>')+
        '<div class="moment-caption">'+esc(item.caption||item.alt||entry.title)+'</div></div>').join('')+'</div>'+
      (items.length>1?'<div class="moment-controls"><button type="button" data-moment-step="-1" aria-label="Previous media">←</button><span class="moment-count" aria-live="polite">1 / '+items.length+'</span><button type="button" data-moment-step="1" aria-label="Next media">→</button></div>':'')+'</div>';
  }
  if(typeof document !== 'undefined') {
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
.social-player{display:flex;flex-direction:column;width:100%;height:100%;min-height:0;text-align:center;color:#e8f8ff;background:#071522}
.social-player-stage{display:flex;flex:1;flex-direction:column;align-items:center;justify-content:center;padding:24px;min-height:0}
.social-player button{padding:14px 22px;border:1px solid #81dfff;border-radius:24px;background:#123e53;color:#e8f8ff;font:600 15px system-ui;cursor:pointer}
.social-player-note{max-width:390px;font:13px/1.6 system-ui;color:#a6bdcf}
.social-player>a{padding:12px 155px 18px 15px;color:#8bd8ff;font:14px system-ui}
.social-player iframe{width:100%;height:100%;min-height:0;border:0;background:#fff}
.social-player-stage:has(iframe){padding:0}
.media:has(.moment-gallery)>.caption{display:none}
.moment-credits{font-size:11px;line-height:1.6;color:#a6bdcf;margin-top:16px}.moment-credits summary{cursor:pointer;min-height:36px;display:flex;align-items:center}.moment-credits ul{padding-left:18px}
@media(max-width:600px){.entry>.moment-gallery{height:340px}.moment-caption{font-size:11px;padding-left:12px}.moment-controls{right:8px}.moment-gallery:has(.moment-controls) .moment-caption{padding-right:145px}}
`;
  document.head.append(galleryStyle);
  function stopPlayers(root){
    root.querySelectorAll('video').forEach(video=>video.pause());
    root.querySelectorAll('.social-player-stage:has(iframe)').forEach(stage=>{stage.innerHTML=stage.dataset.unloadedMarkup||'';});
  }
  function moveGallery(gallery,delta){
    const track=gallery.querySelector('.moment-track');
    const slides=track.children.length;
    const current=Math.round(track.scrollLeft/track.clientWidth);
    const next=(current+delta+slides)%slides;
    stopPlayers(track);
    track.scrollTo({left:next*track.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
  document.addEventListener('click',event=>{
    const load=event.target.closest('[data-social-load]');
    if(load){
      // Never accept an arbitrary iframe target from data attributes.
      const allowed=(window.MAP_DATA?.entries||[]).flatMap(socialMedia).some(item=>item.embedUrl===load.dataset.socialLoad);
      if(!allowed)return;
      const frame=document.createElement('iframe');frame.src=load.dataset.socialLoad;frame.title=load.dataset.socialTitle||'Original social post';
      frame.allow='encrypted-media; fullscreen; picture-in-picture';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
      const stage=load.closest('.social-player-stage');stage.dataset.unloadedMarkup=stage.innerHTML;stage.replaceChildren(frame);return;
    }
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
    Array.from(track.children).forEach((slide,i)=>{if(i!==index)stopPlayers(slide);});
  },true);

  }
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
  window.MAP_CONTENT = { publicEntries, esc, url, provenance, media, label, primary, hero, gallery, socialMedia, coordinates, places, mapsURL, placeVerified, details };
})();

