const menuButton=document.getElementById('menuButton');
const navigation=document.getElementById('navigation');
menuButton.addEventListener('click',()=>{const isOpen=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(isOpen));menuButton.setAttribute('aria-label',isOpen?'Close navigation':'Open navigation')});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();

// Interactive industry showcase. All artwork is locally drawn SVG; no image requests.
const industryOptions=[
  {name:'Schools & Colleges',audience:'schools & colleges',lead:'Less paperwork.',highlight:'More learning.',description:'Bring admissions, fees, attendance and reporting into one simple, organized experience. Spend less time on routine work and more time on what matters.',icon:'✦',title:'Smart education, made simple.',tags:'Admissions · Attendance · Fees',art:'school'},
  {name:'Retail Stores',audience:'retail stores',lead:'Sell smarter.',highlight:'Stay in control.',description:'Keep stock, sales, purchases and customer records beautifully organized. See what is selling and make everyday decisions with confidence.',icon:'▤',title:'Your store, all in one place.',tags:'Sales · Inventory · Customers',art:'store'},
  {name:'Businesses',audience:'growing businesses',lead:'Less busywork.',highlight:'More progress.',description:'Connect daily operations, tasks, invoices and useful insights in software designed around the way your team actually works.',icon:'◈',title:'A clearer way to work.',tags:'Operations · Invoices · Insights',art:'business'},
  {name:'Petrol Pumps',audience:'petrol pumps',lead:'Every litre.',highlight:'Clearly accounted for.',description:'Make it easier to manage fuel sales, shifts, stock movement and reports with a clear, accurate digital workflow.',icon:'◉',title:'Clarity from pump to report.',tags:'Fuel · Shifts · Reporting',art:'pump'},
  {name:'Shopping Malls',audience:'shopping malls',lead:'Many spaces.',highlight:'One clear view.',description:'Simplify tenant records, leases, billing and facility workflows through a custom digital management experience.',icon:'▦',title:'Manage the bigger picture.',tags:'Tenants · Billing · Facilities',art:'mall'},
  {name:'Hospitals & Clinics',audience:'clinics & healthcare teams',lead:'Better workflows.',highlight:'More time for care.',description:'Make appointments, patient administration and day-to-day clinic coordination easier for the people doing the important work.',icon:'✚',title:'Care supported by clarity.',tags:'Appointments · Records · Teams',art:'clinic'},
  {name:'Restaurants & Cafes',audience:'restaurants & cafés',lead:'Smooth service.',highlight:'Happy customers.',description:'Bring orders, billing, menus and stock together so your team can focus on serving a great experience.',icon:'◌',title:'From order to service.',tags:'Orders · Billing · Kitchen',art:'restaurant'},
  {name:'Warehouses',audience:'warehouses & distributors',lead:'Know your stock.',highlight:'Move with confidence.',description:'Track products, stock movement, purchase records and dispatches with fewer manual steps and clearer information.',icon:'▧',title:'Inventory without the guesswork.',tags:'Stock · Dispatch · Purchasing',art:'warehouse'},
  {name:'Real Estate',audience:'real estate teams',lead:'More organized.',highlight:'More opportunities.',description:'Keep property listings, leads, client follow-ups and documents within a focused workspace built for your agency.',icon:'⌂',title:'Every property in perspective.',tags:'Listings · Leads · Follow-ups',art:'estate'},
  {name:'Hotels',audience:'hotels & guest houses',lead:'Every stay.',highlight:'Handled with care.',description:'Simplify bookings, guest records, room availability and billing in an experience your front desk can use with ease.',icon:'◇',title:'Welcoming stays, smooth operations.',tags:'Bookings · Rooms · Guests',art:'hotel'},
  {name:'Factories',audience:'factories & manufacturers',lead:'Simpler processes.',highlight:'Stronger output.',description:'Make production records, materials, inventory and team workflows easier to follow and manage day after day.',icon:'⚙',title:'Practical tools for production.',tags:'Production · Materials · Teams',art:'factory'},
  {name:'Salons & Spas',audience:'salons & service studios',lead:'More bookings.',highlight:'Less juggling.',description:'Organize appointments, services, customer records and payments in a calm, easy-to-use digital workspace.',icon:'✳',title:'Your appointments, beautifully organized.',tags:'Booking · Clients · Billing',art:'salon'}
];
const industryToolkits=[
  ['Admissions','Fee management','Attendance'],
  ['Point of sale','Inventory','Customer records'],
  ['Invoicing','Team tasks','Business insights'],
  ['Fuel sales','Shift management','Stock reports'],
  ['Tenant management','Rent billing','Maintenance'],
  ['Appointments','Patient records','Staff schedules'],
  ['Order management','Billing','Kitchen workflow'],
  ['Stock tracking','Purchasing','Dispatch'],
  ['Property listings','Client leads','Follow-ups'],
  ['Room bookings','Guest records','Payments'],
  ['Production tracking','Raw materials','Stock control'],
  ['Appointment booking','Client profiles','Payments']
];
const industryShapes={
  school:'<path d="M55 125V72L160 30l105 42v53M86 125V87h148v38M130 125V96h60v29"/><path d="M49 126h222M152 44v23m-12-12h24"/><rect x="96" y="94" width="21" height="20" rx="3"/><rect x="204" y="94" width="21" height="20" rx="3"/>',
  store:'<path d="M65 68h190l-13 33H78L65 68ZM80 103v69h160v-69M121 172v-49h70v49"/><path d="M76 101q12 24 27 0 14 24 28 0 13 24 28 0 13 24 28 0 14 24 27 0 14 24 28 0"/><path d="M99 55h121"/>',
  business:'<rect x="72" y="48" width="176" height="124" rx="13"/><path d="M106 146V91h24v55m18 0v-36h24v36m18 0V76h24v70M102 63h30m19 0h30"/><path d="M60 176h200"/>',
  pump:'<rect x="88" y="48" width="100" height="126" rx="12"/><rect x="102" y="64" width="72" height="50" rx="6"/><path d="M88 130h100M109 174v-29h57v29M189 74l22 20v50c0 18 23 18 23 0v-27l-17-17"/><path d="M70 175h173"/>',
  mall:'<path d="M55 172V75h210v97M46 174h228"/><path d="M75 75V53h170v22M95 173V98h130v75M141 173v-55h38v55"/><rect x="98" y="60" width="33" height="9" rx="2"/><rect x="189" y="60" width="33" height="9" rx="2"/>',
  clinic:'<rect x="72" y="60" width="176" height="116" rx="12"/><path d="M138 60V39h44v21M154 81h12v22h22v12h-22v22h-12v-22h-22v-12h22zM95 176v-32h33v32M191 176v-32h33v32"/><path d="M60 178h200"/>',
  restaurant:'<path d="M75 133c0-57 33-82 85-82s85 25 85 82H75ZM66 138h188M99 157h122M160 51V36"/><path d="M100 164v13m120-13v13"/><circle cx="160" cy="35" r="5"/>',
  warehouse:'<path d="M57 173V73l103-44 103 44v100M88 173V94h144v79M106 113h108v60H106zM144 113v60m-38-28h108"/><path d="M52 177h216"/>',
  estate:'<path d="m53 100 107-67 107 67M75 93v82h170V93M137 175v-58h46v58"/><rect x="93" y="108" width="28" height="27" rx="3"/><rect x="199" y="108" width="28" height="27" rx="3"/><path d="M49 178h222"/>',
  hotel:'<rect x="100" y="34" width="120" height="142" rx="8"/><path d="M144 176v-38h32v38M92 178h136"/><rect x="117" y="55" width="23" height="23" rx="3"/><rect x="180" y="55" width="23" height="23" rx="3"/><rect x="117" y="96" width="23" height="23" rx="3"/><rect x="180" y="96" width="23" height="23" rx="3"/>',
  factory:'<path d="M59 174V96l64 32V96l64 32V77h75v97H59zM202 77V42h40v35M74 174h178"/><rect x="89" y="144" width="24" height="19" rx="3"/><rect x="148" y="144" width="24" height="19" rx="3"/><rect x="209" y="144" width="24" height="19" rx="3"/>',
  salon:'<rect x="82" y="39" width="156" height="139" rx="16"/><rect x="105" y="58" width="110" height="74" rx="12"/><path d="M135 175v-26h50v26M112 177h96M121 90c15-32 63-32 78 0M130 109c21 18 39 18 60 0"/><circle cx="160" cy="91" r="17"/>'
};
const badgeRoot=document.getElementById('industryDotDock');
const headline=document.getElementById('industryHeadline');
const audience=document.getElementById('industryAudience');
const description=document.getElementById('industryDescription');
const artPanel=document.getElementById('industryArtPanel');
const artRoot=document.getElementById('industryArt');
const prefersLessMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let currentIndustry=0;
let isPaused=prefersLessMotion;
const orbitStep=2*Math.PI/industryOptions.length;
const orbitSpeed=1/4.8; // One new industry reaches the bottom roughly every 4.8 seconds.
let orbitPhase=0;
let orbitTarget=null;
let orbitLastFrame=0;
let pointerOverStage=false;
let stageHasFocus=false;
let recentlySelectedUntil=0;
function drawIndustryArt(kind){
  const variant=currentIndustry%3;
  const shape=industryShapes[kind]||industryShapes.business;
  const windowShell='<rect x="15" y="18" width="290" height="178" rx="16" fill="#fff" stroke="#cfdeee" stroke-width="2"/><path d="M15 51h290" stroke="#e7eff7"/><circle cx="34" cy="36" r="4" fill="#ffaca5"/><circle cx="47" cy="36" r="4" fill="#ffd59a"/><circle cx="60" cy="36" r="4" fill="#a0e6bd"/>';
  const symbol='<g transform="translate(0 0)"><circle cx="0" cy="0" r="20" fill="var(--industry-soft,#e4f5ff)"/><g transform="translate(-22 -20) scale(.14)" fill="none" stroke="var(--industry-accent,#137dea)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">'+shape+'</g></g>';
  let content='';
  if(variant===0){
    content=windowShell+
    '<rect x="15" y="51" width="61" height="145" rx="0" fill="#f2f7fd"/><rect x="28" y="66" width="35" height="7" rx="3" fill="#8cb8d7"/><rect x="28" y="84" width="30" height="5" rx="2" fill="#c0d9ec"/><rect x="28" y="97" width="37" height="5" rx="2" fill="#c0d9ec"/><rect x="28" y="110" width="27" height="5" rx="2" fill="#c0d9ec"/>'+
    '<text x="93" y="75" font-family="Arial,sans-serif" font-size="10" font-weight="700" fill="#244768">Overview</text>'+
    '<rect x="93" y="87" width="57" height="43" rx="8" fill="#e8f4ff"/><rect x="158" y="87" width="57" height="43" rx="8" fill="#e4f8ee"/><rect x="223" y="87" width="57" height="43" rx="8" fill="#f2eaff"/>'+
    '<rect x="103" y="97" width="24" height="5" rx="2" fill="#9fc9e8"/><rect x="103" y="109" width="34" height="8" rx="3" fill="var(--industry-accent,#1478e6)"/>'+
    '<rect x="169" y="97" width="22" height="5" rx="2" fill="#a0d9c0"/><rect x="169" y="109" width="31" height="8" rx="3" fill="#4bbc98"/>'+
    '<rect x="233" y="97" width="22" height="5" rx="2" fill="#c0b1ed"/><rect x="233" y="109" width="31" height="8" rx="3" fill="#a188e0"/>'+
    '<rect x="93" y="139" width="187" height="43" rx="7" fill="#f8fbff"/><path d="M107 170l28-13 22 6 25-14 25 8 26-18 30 6" fill="none" stroke="var(--industry-accent,#1478e6)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
  }else if(variant===1){
    content='<rect x="100" y="6" width="120" height="204" rx="25" fill="#143354"/><rect x="106" y="13" width="108" height="190" rx="20" fill="#f8fcff"/><rect x="136" y="19" width="49" height="9" rx="5" fill="#143354"/>'+
    '<text x="121" y="51" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="#254463">Dashboard</text>'+
    '<rect x="120" y="61" width="80" height="57" rx="13" fill="var(--industry-accent,#1478e6)" opacity=".87"/><rect x="131" y="75" width="34" height="5" rx="2" fill="#ffffffb5"/><rect x="131" y="91" width="55" height="9" rx="4" fill="#fff"/>'+
    '<rect x="120" y="129" width="36" height="36" rx="9" fill="#e5f4ff"/><rect x="164" y="129" width="36" height="36" rx="9" fill="#e2f8ef"/><rect x="120" y="173" width="80" height="10" rx="5" fill="#dceafa"/>'+
    '<rect x="20" y="56" width="75" height="47" rx="12" fill="#fff" stroke="#dbeaf6"/><path d="M33 84l13-9 13 4 18-15" stroke="#24a9b5" stroke-width="4" fill="none" stroke-linecap="round"/>'+
    '<rect x="224" y="108" width="78" height="50" rx="12" fill="#fff" stroke="#dbeaf6"/><circle cx="240" cy="124" r="7" fill="#9de6cf"/><rect x="253" y="120" width="35" height="5" rx="2" fill="#a9c6da"/><rect x="236" y="140" width="52" height="6" rx="3" fill="var(--industry-accent,#1478e6)" opacity=".6"/>';
  }else{
    content=windowShell+
    '<rect x="28" y="62" width="264" height="28" rx="8" fill="#f1f7fd"/><circle cx="43" cy="76" r="6" fill="var(--industry-accent,#1478e6)"/><rect x="57" y="71" width="78" height="9" rx="4" fill="#9bc5df"/><rect x="237" y="69" width="41" height="13" rx="6" fill="var(--industry-accent,#1478e6)"/>'+
    '<rect x="28" y="102" width="105" height="81" rx="9" fill="#eaf5ff"/><rect x="41" y="118" width="54" height="7" rx="3" fill="#b0d2eb"/><rect x="41" y="134" width="68" height="12" rx="5" fill="var(--industry-accent,#1478e6)"/><rect x="41" y="158" width="75" height="5" rx="2" fill="#bdd6eb"/>'+
    '<rect x="144" y="102" width="148" height="81" rx="9" fill="#f8fbff"/><rect x="157" y="116" width="42" height="5" rx="2" fill="#b6cee0"/><rect x="157" y="129" width="118" height="8" rx="3" fill="#e2edf6"/><rect x="157" y="144" width="90" height="8" rx="3" fill="#d0e8f9"/><rect x="157" y="159" width="108" height="8" rx="3" fill="#e2edf6"/>';
  }
  const label=['WEB APP','MOBILE APP','DESKTOP APP'][variant];
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 215" role="img" aria-label="'+label+' interface illustration"><defs><linearGradient id="appBackdrop" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#edf8ff"/><stop offset="1" stop-color="#f7fbff"/></linearGradient></defs><rect width="320" height="215" rx="20" fill="url(#appBackdrop)"/>'+content+'<text x="299" y="205" font-family="Arial,sans-serif" font-size="8" fill="#8ca8bd" text-anchor="end">'+label+'</text></svg>';
}
const copyRoot=document.getElementById('industryCopy');
let measuredCopyKey='';

// Reserve the largest responsive text slots so changing industries never resizes the hero.
function stabilizeIndustryCopy(){
  // The full-width heading reserves its space in CSS; content updates stay in place.
  measuredCopyKey=document.documentElement.lang;
}

// Keep old and new illustrations in the same grid cell for a soft crossfade.
function transitionIndustryArt(kind){
  const holder=document.createElement('div');
  holder.innerHTML=drawIndustryArt(kind);
  const incoming=holder.firstElementChild;
  const outgoing=artRoot.querySelector('svg.is-visible');
  if(!outgoing||prefersLessMotion){
    incoming.classList.add('is-visible');
    artRoot.replaceChildren(incoming);
    return;
  }
  artRoot.querySelectorAll('svg:not(.is-visible)').forEach(svg=>svg.remove());
  artRoot.appendChild(incoming);
  outgoing.addEventListener('transitionend',event=>{
    if(event.propertyName==='opacity')outgoing.remove();
  });
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    incoming.classList.add('is-visible');
    outgoing.classList.remove('is-visible');
  }));
}
const industryAiExamples=[
  ['Which students need attendance follow-up today?','I can flag missing attendance entries and prepare a clear follow-up list for staff.'],
  ['What sold best this week?','I can summarize your top-selling products, stock levels and items needing a reorder.'],
  ['Show outstanding invoices and priorities.','I can group overdue invoices and highlight the next actions for your team.'],
  ['Summarize today’s fuel shifts.','I can compare shift totals, fuel sales and stock movement for review.'],
  ['Which tenant payments are due next?','I can organize upcoming rent dates and create a follow-up checklist.'],
  ['Help organize tomorrow’s appointments.','I can prepare the appointment schedule and highlight booking conflicts.'],
  ['Which menu items should we restock?','I can compare orders with available ingredients and suggest a purchasing list.'],
  ['Which warehouse items are running low?','I can identify low-stock items and prepare a replenishment summary.'],
  ['Summarize my new property inquiries.','I can sort leads by property interest and prepare follow-up priorities.'],
  ['What rooms are available this weekend?','I can summarize reservations, availability and upcoming check-ins.'],
  ['Show pending production tasks.','I can organize outstanding jobs and identify material shortages.'],
  ['Which clients are due for a follow-up?','I can review appointment history and prepare a client reminder list.']
];
let aiTypeTimer=null;
function animateAiConversation(index){
  const promptNode=document.getElementById('industryAiPrompt');
  const replyNode=document.getElementById('industryAiResponse');
  if(!promptNode||!replyNode)return;
  clearInterval(aiTypeTimer);
  const [prompt,reply]=industryAiExamples[index];
  if(prefersLessMotion){promptNode.textContent=prompt;replyNode.textContent=reply;return}
  promptNode.textContent='';replyNode.textContent='';
  let position=0;
  aiTypeTimer=setInterval(()=>{
    position+=3;
    if(position<=prompt.length){promptNode.textContent=prompt.slice(0,position);return}
    promptNode.textContent=prompt;
    const responseLength=Math.max(0,position-prompt.length);
    replyNode.textContent=reply.slice(0,responseLength*2);
    if(responseLength*2>=reply.length){replyNode.textContent=reply;clearInterval(aiTypeTimer)}
  },28);
}
function selectIndustry(index,force=false){
  const normalized=(index+industryOptions.length)%industryOptions.length;
  if(normalized===currentIndustry&&artRoot.firstChild&&!force)return;
  const wasRendered=Boolean(artRoot.firstElementChild);
  currentIndustry=normalized;
  const item=industryOptions[currentIndustry];
  const translate=window.vbtTranslate||((value)=>value);
  audience.textContent=translate(item.audience);
  headline.replaceChildren(document.createTextNode(translate(item.lead)),document.createElement('br'),Object.assign(document.createElement('span'),{textContent:translate(item.highlight)}));
  description.textContent=translate(item.description);
  const toolkit=document.getElementById('industryToolkit');
  if(toolkit)toolkit.replaceChildren(...industryToolkits[currentIndustry].map(feature=>{
    const chip=document.createElement('span');
    chip.textContent='✦ '+translate(feature);
    return chip;
  }));
  transitionIndustryArt(item.art);
  animateAiConversation(currentIndustry);
  document.getElementById('industryIcon').textContent=item.icon;
  document.getElementById('industryArtTitle').textContent=translate(item.title);
  document.getElementById('industryArtSubtitle').textContent=translate(item.tags);
  badgeRoot.querySelectorAll('button').forEach((button,i)=>{button.classList.toggle('active',i===currentIndustry);button.setAttribute('aria-pressed',String(i===currentIndustry));button.setAttribute('aria-label',translate(industryOptions[i].name))});
  document.getElementById('industryActiveName').textContent=translate(item.name);
  const palette=industryPalettes[currentIndustry];
  stage.style.setProperty('--industry-accent',palette[0]);
  stage.style.setProperty('--industry-soft',palette[1]);
  document.getElementById('industryBorderTraveller').setAttribute('aria-label',translate(item.name)+' — '+translate(item.title));
  stabilizeIndustryCopy();
  if(wasRendered&&!prefersLessMotion){
    const caption=artPanel.querySelector('.art-caption');
    copyRoot.classList.remove('industry-content-enter');
    caption.classList.remove('industry-content-enter');
    void copyRoot.offsetWidth;
    copyRoot.classList.add('industry-content-enter');
    caption.classList.add('industry-content-enter');
  }
}
// One illuminated dot makes a full trip around the rounded rectangle.
// At the bottom docking point the following industry's dot takes over.
const industryPalettes=[
  ['#1478e6','#d9eeff'],['#08a48d','#d8f8ef'],['#a775e9','#eee2ff'],
  ['#f18b44','#fff0df'],['#db5f92','#ffe3ef'],['#1b95b9','#dbf4ff'],
  ['#5877df','#e6eaff'],['#b5794e','#fff0e1'],['#248d90','#d9f6f2'],
  ['#c65fa7','#fbe2f2'],['#da8a2e','#fff3d8'],['#4886d8','#e1eeff']
];
const stage=document.getElementById('industryStage');
const frame=document.getElementById('industryShowcaseFrame');
const traveller=document.getElementById('industryBorderTraveller');
const orbitSvg=document.getElementById('industryPerimeterSvg');
const orbitPath=document.getElementById('industryPerimeterPath');
let lapProgress=0;
let lastFrameTime=0;
const lapSeconds=6.2;
let measuredFrameWidth=0,measuredFrameHeight=0,perimeterLength=0;
function measureFramePath(){
  const width=frame.clientWidth, height=frame.clientHeight;
  if(width===measuredFrameWidth&&height===measuredFrameHeight)return;
  measuredFrameWidth=width;measuredFrameHeight=height;
  if(!width||!height)return;
  const inset=3.5,w=width-inset*2,h=height-inset*2;
  const radius=Math.min(32,w/5,h/5);
  orbitSvg.setAttribute('viewBox','0 0 '+width+' '+height);
  orbitPath.setAttribute('d',
    'M '+(width/2)+' '+(inset+h)+
    ' H '+(inset+radius)+
    ' A '+radius+' '+radius+' 0 0 1 '+inset+' '+(inset+h-radius)+
    ' V '+(inset+radius)+
    ' A '+radius+' '+radius+' 0 0 1 '+(inset+radius)+' '+inset+
    ' H '+(inset+w-radius)+
    ' A '+radius+' '+radius+' 0 0 1 '+(inset+w)+' '+(inset+radius)+
    ' V '+(inset+h-radius)+
    ' A '+radius+' '+radius+' 0 0 1 '+(inset+w-radius)+' '+(inset+h)+
    ' H '+(width/2));
  perimeterLength=orbitPath.getTotalLength();
}
function navigateToIndustry(index){
  lapProgress=0;
  selectIndustry(index);
  renderBorderTraveller();
}
function renderBorderTraveller(){
  measureFramePath();
  if(!perimeterLength)return;
  const point=orbitPath.getPointAtLength(lapProgress*perimeterLength);
  traveller.style.left=point.x+'px';
  traveller.style.top=point.y+'px';
}
function animateIndustryBorder(timestamp){
  const delta=lastFrameTime?Math.min((timestamp-lastFrameTime)/1000,.06):0;
  lastFrameTime=timestamp;
  if(!isPaused&&!document.hidden){
    lapProgress+=delta/lapSeconds;
    if(lapProgress>=1){
      lapProgress%=1;
      selectIndustry((currentIndustry+1)%industryOptions.length);
    }
  }
  renderBorderTraveller();
  requestAnimationFrame(animateIndustryBorder);
}
industryOptions.forEach((industry,i)=>{
  const dot=document.createElement('button');
  dot.type='button';
  dot.className='industry-dock-dot';
  dot.title=industry.name;
  dot.setAttribute('aria-label',industry.name);
  dot.addEventListener('click',()=>navigateToIndustry(i));
  badgeRoot.appendChild(dot);
});
traveller.addEventListener('click',()=>navigateToIndustry((currentIndustry+1)%industryOptions.length));
stage.addEventListener('mouseenter',()=>{pointerOverStage=true});
stage.addEventListener('mouseleave',()=>{pointerOverStage=false});
stage.addEventListener('focusin',()=>{stageHasFocus=true});
stage.addEventListener('focusout',event=>{if(!stage.contains(event.relatedTarget))stageHasFocus=false});
selectIndustry(0);
window.addEventListener('resize',()=>{measuredCopyKey='';measuredFrameWidth=0;stabilizeIndustryCopy();renderBorderTraveller()},{passive:true});
if(document.fonts)document.fonts.ready.then(()=>{measuredCopyKey='';stabilizeIndustryCopy()});
requestAnimationFrame(animateIndustryBorder);
