(()=>{const video=document.querySelector('#barat-video'),page=document.querySelector('.barat'),button=document.querySelector('#barat-video-control');let manualPause=false;
function label(){button.textContent=video.paused?'Play scene ▷':'Pause scene Ⅱ';button.setAttribute('aria-label',video.paused?'Play Baraat scene':'Pause Baraat scene')}
function sync(){if(page.hidden||document.hidden||document.body.classList.contains('calm')||manualPause){video.pause();label();return}video.play().then(label).catch(label)}
button.onclick=()=>{if(video.paused){manualPause=false;if(document.body.classList.contains('calm'))document.querySelector('#motion').click();sync()}else{manualPause=true;video.pause();label()}};
video.addEventListener('play',label);video.addEventListener('pause',label);
new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
new MutationObserver(sync).observe(page,{attributes:true,attributeFilter:['hidden']});
document.addEventListener('visibilitychange',sync);document.addEventListener('cardchange',sync);label();
})();