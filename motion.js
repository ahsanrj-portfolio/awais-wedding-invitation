
(() => {
const cover=document.querySelector('.cover-art');
for(let i=0;i<2;i++){const wing=document.createElement('span');wing.className='cover-wing';wing.innerHTML='<span class="wing-art"></span>';wing.setAttribute('aria-hidden','true');cover.append(wing)}
for(const poster of document.querySelectorAll('.floral-poster,.event-poster')){
 const night=poster.classList.contains('barat-poster'),field=document.createElement('div');field.className='ambient-field';field.setAttribute('aria-hidden','true');
 for(let i=0;i<(night?18:12);i++){
 const part=document.createElement('span');part.className=night?'ambient-star':'ambient-petal';
 part.style.cssText='--x:'+((i*37+7)%100)+'%;--y:'+((i*23+8)%98)+'%;--size:'+(4+i%4)+'px;--duration:'+(night?3+i%5:10+i%7)+'s;--delay:-'+(i*.91)+'s;--drift:'+(i%2?34:-28)+'px;--petal:'+(i%3?'#db658a':'#e8b85b')+';';
 field.append(part);
 }
 if(night){for(let i=0;i<2;i++){const beam=document.createElement('span');beam.className='light-beam'+(i?' second':'');field.append(beam)}}
 poster.append(field);new ResizeObserver(()=>field.style.setProperty('--travel',(poster.clientHeight+40)+'px')).observe(poster);
}
function reveal(){
 const page=document.querySelector('.page:not([hidden])');if(!page||page.inert)return;
 const items=page.querySelectorAll('.welcome-note>*,.poster-copy>*,.walima-copy>*,.intro-copy>*,.rsvp-content>h2');
 items.forEach((el,i)=>{el.classList.remove('motion-reveal');el.style.setProperty('--reveal-delay',(i*95+100)+'ms')});
 void page.offsetWidth;items.forEach(el=>el.classList.add('motion-reveal'));
}
document.addEventListener('cardchange',reveal);
const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('motion-reveal');observer.unobserve(target)}}),{threshold:.15});
document.querySelectorAll('.event-content>.programme,.schedule,.event-content>h3,.actions,.contacts').forEach(el=>observer.observe(el));
document.addEventListener('visibilitychange',()=>document.body.classList.toggle('motion-paused',document.hidden));
let start=null;const book=document.querySelector('#book');
book.addEventListener('touchstart',e=>{if(e.touches.length!==1||e.target.closest('button,a')){start=null;return}start={x:e.touches[0].clientX,y:e.touches[0].clientY}}, {passive:true});
book.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;start=null;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.8)document.querySelector(dx<0?'#next':'#back').click()}, {passive:true});
book.addEventListener('touchcancel',()=>start=null,{passive:true});
})();
