(()=>{
 "use strict";
 const pages=[
  {name:'Início',url:'index.html',words:'home começo principal'},
  {name:'Sobre',url:'sobre.html',words:'projeto história ideia'},
  {name:'Equipe',url:'equipe.html',words:'sorria2297 aninha_soft guilherme154696 joasmellos pessoas programação liderança modelagem sons'},
  {name:'O jogo',url:'jogo.html',words:'roblox gameplay lobby exploração gum'},
  {name:'Mascotes',url:'mascotes.html',words:'melias rusty bubbie millow binoculles kittystar moony personagens'},
  {name:'Galeria',url:'galeria.html',words:'imagens artes fotos'},
  {name:'Novidades',url:'novidades.html',words:'notícias atualizações changelog site-refeito'}
 ];
 const body=document.body,themeButton=document.querySelector('.theme-toggle');
 const applyTheme=dark=>{
  body.classList.toggle('dark',dark);
  if(themeButton){themeButton.textContent=dark?'☀️ Tema claro':'🌙 Tema escuro';themeButton.setAttribute('aria-pressed',String(dark));}
 };
 let saved=null;try{saved=localStorage.getItem('bgf-theme')}catch(e){}
 applyTheme(saved?saved==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches);
 themeButton?.addEventListener('click',()=>{
  const dark=!body.classList.contains('dark');applyTheme(dark);
  try{localStorage.setItem('bgf-theme',dark?'dark':'light')}catch(e){}
 });
 document.querySelectorAll('.site-search').forEach(form=>{
  const input=form.querySelector('input'),results=form.querySelector('.search-results');
  const search=()=>{
   const q=input.value.trim().toLocaleLowerCase('pt-BR');results.replaceChildren();
   if(!q){results.classList.remove('open');return;}
   const found=pages.filter(p=>(p.name+' '+p.words).toLocaleLowerCase('pt-BR').includes(q));
   if(found.length){found.forEach(p=>{
    const a=document.createElement('a');a.href=p.url;a.textContent=p.name;
    const small=document.createElement('small');small.textContent='Abrir página';a.appendChild(small);results.appendChild(a);
   });}
   else{const p=document.createElement('p');p.className='small muted';p.textContent='Nenhuma página encontrada.';results.appendChild(p);}
   results.classList.add('open');
  };
  input.addEventListener('input',search);
  form.addEventListener('submit',e=>{e.preventDefault();search();const first=results.querySelector('a');if(first)window.location.href=first.href;});
  document.addEventListener('click',e=>{if(!form.contains(e.target))results.classList.remove('open');});
  input.addEventListener('keydown',e=>{if(e.key==='Escape')results.classList.remove('open');});
 });
 const items=document.querySelectorAll('.reveal');
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:.08});
  items.forEach(el=>observer.observe(el));
 }else items.forEach(el=>el.classList.add('visible'));
})();