const menuButton=document.getElementById('menuButton');
const navigation=document.getElementById('navigation');
menuButton.addEventListener('click',()=>{const isOpen=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(isOpen));menuButton.setAttribute('aria-label',isOpen?'Close navigation':'Open navigation')});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();
