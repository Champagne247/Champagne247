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
      : p.kind === 'ai' ? 'AI illustration — not an event photo'
      : p.kind === 'illustration' ? 'Category illustration — origin unverified'
      : 'Existing media — provenance awaiting verification';
  }
  function primary(entry, fallback) {
    return media(entry).find(item=>['image','video'].includes(item.type)) || { type:'image',url:fallback,caption:'Category illustration',provenance:{kind:'illustration',actualSubject:false} };
  }
  function hero(item, title='') {
    const source=url(item.url);
    return item.type==='video'
      ? `<video src="${esc(source)}" controls preload="metadata" aria-label="${esc(item.caption || title)}" style="width:100%;max-height:420px"></video>`
      : `<img src="${esc(source)}" alt="${esc(item.alt || item.caption || title)}" loading="lazy" style="max-width:100%" onerror="this.hidden=true;this.insertAdjacentText('afterend','Image unavailable — source retained')">`;
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
    const extraMedia = media(entry).filter(item=>item!==primary(entry)).map(item => item.type === 'video'
      ? `<figure><video src="${esc(url(item.url))}" controls preload="metadata" style="max-width:100%"></video><figcaption>${esc(label(item))} · ${esc(item.caption)}</figcaption></figure>`
      : item.type === 'image' ? `<figure>${hero(item,entry.title)}<figcaption>${esc(label(item))} · ${esc(item.caption)}</figcaption></figure>`
      : `<a href="${esc(url(item.url))}" target="_blank" rel="noopener noreferrer">${esc(item.caption || 'Media source')}</a>`).join('');
    const credits = media(entry).map(item => { const p=provenance(item); return `<li>${esc(label(item))}${p.credit ? ' · '+esc(p.credit) : ''}${p.reason ? ' · '+esc(p.reason) : ''}${url(p.sourceUrl) ? ` · <a href="${esc(url(p.sourceUrl))}" target="_blank" rel="noopener noreferrer">Image source</a>` : ''}</li>`; }).join('');
    return `<div class="map-record-details" data-record-id="${esc(entry.id)}">${dateNote}${projects}${locations ? `<ul class="record-places">${locations}</ul>` : ''}${business || refs || credits ? `<ul>${business}${refs}${credits}</ul>` : ''}${extraMedia}</div>`;
  }
  window.MAP_CONTENT = { esc, url, provenance, media, label, primary, hero, coordinates, places, mapsURL, placeVerified, details };
})();
