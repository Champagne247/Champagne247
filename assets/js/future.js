(() => {
'use strict';
const $ = id => document.getElementById(id);
const cards = [...document.querySelectorAll('#path-grid .path-card')];
let selected=0, touchX=null;
function select(index){
 selected=(index+cards.length)%cards.length;
 cards.forEach((card,i)=>{let offset=i-selected;if(offset>3)offset-=cards.length;if(offset< -3)offset+=cards.length;card.style.setProperty('--offset',offset);card.style.setProperty('--distance',Math.abs(offset));card.style.setProperty('--layer',10-Math.abs(offset));card.style.setProperty('--opacity',Math.abs(offset)>2?'.3':'1');card.classList.toggle('active',i===selected);card.tabIndex=i===selected?0:-1;});
 const card=cards[selected];$('orbit-title').textContent=card.querySelector('h3').textContent;$('orbit-copy').textContent=card.querySelector('.path-copy p').textContent;$('orbit-open').href=card.href;$('orbit-status').textContent=`0${selected+1} / 0${cards.length} · ${card.querySelector('h3').textContent}`;
 [...$('orbit-dots').children].forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===selected)));
}
cards.forEach((card,i)=>{const dot=document.createElement('button');dot.type='button';dot.className='orbit-dot';dot.setAttribute('aria-label',`Select ${card.querySelector('h3').textContent}`);dot.onclick=()=>select(i);$('orbit-dots').append(dot);card.addEventListener('click',e=>{if(i!==selected){e.preventDefault();select(i);}});});
$('orbit-prev').onclick=()=>select(selected-1);$('orbit-next').onclick=()=>select(selected+1);
$('path-grid').addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();select(selected+(e.key==='ArrowRight'?1:-1));cards[selected].focus();}});
$('path-grid').addEventListener('touchstart',e=>{touchX=e.touches[0].clientX;},{passive:true});$('path-grid').addEventListener('touchend',e=>{if(touchX!==null){const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>45)select(selected+(dx<0?1:-1));touchX=null;}},{passive:true});select(0);
const key='my-life-destinations-v1';let plans=[];
try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))plans=saved.filter(x=>x&&typeof x.vision==='string'&&typeof x.destination==='string'&&typeof x.step==='string').slice(0,100);}catch{}
const escape=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function persist(){try{localStorage.setItem(key,JSON.stringify(plans));return true;}catch{return false;}}
function render(){const list=$('vision-list');list.innerHTML=plans.length?plans.map((p,i)=>`<article class="vision-card ${p.done?'complete':''}"><span class="eyebrow">${escape(p.path)}</span><h3>${escape(p.vision)}</h3><p><strong>Destination</strong><br>${escape(p.destination)}</p><label><input type="checkbox" data-done="${i}" ${p.done?'checked':''}><span>${escape(p.step)}</span></label><button type="button" data-remove="${i}">Remove destination</button></article>`).join(''):'<div class="vision-empty"><div><h3>See it. Believe it. Begin it.</h3><p>Your first destination is one choice away.</p></div><button class="button primary" type="button" data-plan-open>Create my first destination ↗</button></div>';}
let opener;
function open(button){opener=button;$('planner-error').textContent='';$('vision-dialog').showModal();}
document.addEventListener('click',e=>{const start=e.target.closest('[data-plan-open]');if(start)open(start);const remove=e.target.closest('[data-remove]');if(remove){const previous=[...plans];plans.splice(Number(remove.dataset.remove),1);if(!persist()){plans=previous;alert('Your browser could not save this change.');return;}render();}});
$('vision-list').addEventListener('change',e=>{if(e.target.matches('[data-done]')){const p=plans[Number(e.target.dataset.done)];p.done=e.target.checked;if(!persist()){p.done=!p.done;alert('Your browser could not save this change.');}render();}});
$('planner-close').onclick=()=>$('vision-dialog').close();$('vision-dialog').addEventListener('close',()=>opener?.focus());
$('vision-form').addEventListener('submit',e=>{e.preventDefault();const fields=new FormData(e.currentTarget);const plan={vision:fields.get('vision').trim(),destination:fields.get('destination').trim(),step:fields.get('step').trim(),path:fields.get('path'),done:false};if(!plan.vision||!plan.destination||!plan.step){$('planner-error').textContent='Add your vision, destination and next step.';return;}if(plans.length>=100){$('planner-error').textContent='You have 100 destinations. Remove one before adding another.';return;}plans.push(plan);if(!persist()){plans.pop();$('planner-error').textContent='Your browser cannot save right now. Check storage settings and try again.';return;}render();e.currentTarget.reset();$('vision-dialog').close();$('vision').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});render();
})();
