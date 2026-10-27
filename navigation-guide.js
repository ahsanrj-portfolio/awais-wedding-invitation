(()=>{
const footer=document.querySelector('.navigation'),next=document.getElementById('next'),back=document.getElementById('back'),opening=document.getElementById('opening');
const cards=[...document.querySelectorAll('.page')],tabs=[...footer.querySelectorAll('nav [data-go]')];
const cue=document.createElement('button');cue.type='button';cue.className='scroll-guide';footer.prepend(cue);
let pending=false;function update(){pending=false;const i=cards.findIndex(p=>!p.hidden),page=cards[i];if(!page)return;
back.textContent='← Previous';back.setAttribute('aria-label','Previous invitation card');
const label=tabs[i+1]?.textContent.trim();next.replaceChildren();const main=document.createElement('span');main.textContent=label?'Next: '+label+' →':'Last card ✓';next.append(main);if(label){const small=document.createElement('small');small.textContent='Agla card kholein';next.append(small)}next.setAttribute('aria-label',label?'Open next card: '+label:'Last invitation card');
const more=page.scrollHeight-page.clientHeight-page.scrollTop>10;cue.dataset.end=String(!more);cue.disabled=!more;cue.innerHTML=more?'<span>Neeche scroll karein</span><span class="guide-arrow" aria-hidden="true">↓</span>':(label?'Agla card kholne ke liye Next dabayein':'Aap tamam cards dekh chukay hain');cue.setAttribute('aria-label',more?'Scroll down to see more details':cue.textContent);
footer.style.visibility=opening.hidden?'visible':'hidden';}
function schedule(){if(!pending){pending=true;requestAnimationFrame(update)}}
cue.addEventListener('click',()=>{const p=cards.find(p=>!p.hidden);p?.scrollBy({top:Math.max(160,p.clientHeight*.7),behavior:document.body.classList.contains('calm')?'instant':'smooth'})});
cards.forEach(p=>p.addEventListener('scroll',schedule,{passive:true}));document.addEventListener('cardchange',schedule);window.addEventListener('resize',schedule);document.querySelectorAll('img,video').forEach(m=>{m.addEventListener('load',schedule);m.addEventListener('loadedmetadata',schedule)});new MutationObserver(schedule).observe(opening,{attributes:true,attributeFilter:['hidden']});const ro=new ResizeObserver(schedule);cards.forEach(p=>ro.observe(p));update();})();
