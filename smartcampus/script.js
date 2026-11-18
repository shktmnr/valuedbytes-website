const menuButton=document.getElementById('menuToggle');
const menu=document.getElementById('mainNav');
function setMenu(open){
  menu.classList.toggle('open',open);
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');
}
menuButton.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&menu.classList.contains('open')){
    setMenu(false);menuButton.focus();
  }
});
document.addEventListener('click',event=>{
  if(menu.classList.contains('open')&&!event.target.closest('.nav-wrap'))setMenu(false);
});
window.matchMedia('(min-width:821px)').addEventListener('change',()=>setMenu(false));
const institutionContent={school:{icon:'⌂',title:'Give every school day a smoother start.',description:'Bring classes, student records, fee tracking and parent communication into a clear daily routine.'},college:{icon:'▣',title:'Connect every part of your college.',description:'Organize departments, student journeys, financial workflows and academic operations with confidence.'}};
const detail=document.getElementById('institutionDetail');function chooseInstitution(button){document.querySelectorAll('.segment button').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-selected','false')});button.classList.add('selected');button.setAttribute('aria-selected','true');const selected=institutionContent[button.dataset.type];const translate=window.campusTranslate||((s)=>s);detail.innerHTML=`<div class="detail-icon">${selected.icon}</div><div><h3>${translate(selected.title)}</h3><p>${translate(selected.description)}</p></div>`;}document.querySelectorAll('.segment button').forEach(button=>button.addEventListener('click',()=>chooseInstitution(button)));
document.getElementById('year').textContent=new Date().getFullYear();
