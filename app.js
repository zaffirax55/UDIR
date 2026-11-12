const q=(s,c=document)=>c.querySelector(s),qa=(s,c=document)=>[...c.querySelectorAll(s)];

const menu=q('.menu-toggle'),links=q('#nav-links');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));links.classList.toggle('open',!open)});
qa('#nav-links a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');links.classList.remove('open')}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -30px'});
qa('.reveal').forEach(el=>observer.observe(el));

const tabs=qa('[role="tab"]');
function activateTab(tab){tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));q('#'+t.getAttribute('aria-controls')).hidden=!active});}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activateTab(tab));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();let n=e.key==='Home'?0:e.key==='End'?tabs.length-1:e.key==='ArrowRight'?(i+1)%tabs.length:(i-1+tabs.length)%tabs.length;tabs[n].focus();activateTab(tabs[n])})});

const form=q('#contact-form'),state=q('#form-state');
form.addEventListener('submit',e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();state.textContent='Please complete the required fields so the enquiry can be prepared.';state.className='form-state error';return}const data=new FormData(form);const subject=encodeURIComponent(`UDIR enquiry — ${data.get('company')} — ${data.get('application')}`);const body=encodeURIComponent(`Name: ${data.get('name')}\nCompany: ${data.get('company')}\nApplication: ${data.get('application')}\n\nProject requirements:\n${data.get('message')}\n\nReply to: ${data.get('email')}`);state.textContent='Your enquiry is ready. Your mail app will open now; review it and choose the recipient before sending.';state.className='form-state ready';window.location.href=`mailto:?subject=${subject}&body=${body}`});

const progress=q('#scroll-progress');
let progressTick=false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?(scrollY/max)*100:0}%`;progressTick=false}
addEventListener('scroll',()=>{if(!progressTick){requestAnimationFrame(updateProgress);progressTick=true}},{passive:true});
updateProgress();

