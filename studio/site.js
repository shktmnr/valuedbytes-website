(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const icons = "studio/icons.svg#";
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const schoolRelease = "https://github.com/shktmnr/vbt-smartschool-downloads/releases/";
  const releaseFiles = schoolRelease + "download/v1.1.0/";

  const industries = [
    {key:"school", en:"Schools", ur:"اسکول", group:["Education","تعلیم"], word:["schools.","اسکولوں کے لیے"],
      alt:["Miniature schoolhouse with a central clock, classroom wings and a landscaped courtyard.","اسکول کی عمارت، مرکزی گھڑی اور صحن کا ماڈل۔"],
      title:["A school day, organised.","اسکول کا ریکارڈ ایک جگہ"],
      copy:["Give the office a single place to follow admissions, fees and attendance, from the first enrolment to the last report.","داخلے سے لے کر آخری رپورٹ تک، اسکول کا عملہ فیس، حاضری اور طلبہ کا ریکارڈ ایک ہی جگہ دیکھ سکے۔"],
      tags:[["Admissions","Fee records","Attendance"],["داخلے","فیس کا ریکارڈ","حاضری"]]},
    {key:"college", en:"Colleges", ur:"کالج", group:["Higher education","اعلیٰ تعلیم"], word:["colleges.","کالجوں کے لیے"],
      alt:["Architectural model of a college campus with a domed library and columned entrance.","گنبد اور ستونوں والی لائبریری کے ساتھ کالج کیمپس کا ماڈل۔"],
      title:["A connected college office.","کالج کے شعبوں میں رابطہ"],
      copy:["Help admissions, academic departments and the examination office work from the same student records.","داخلہ، تدریسی اور امتحانی شعبے طلبہ کے ایک ہی ریکارڈ سے اپنے روزمرہ کام مکمل کر سکیں۔"],
      tags:[["Admissions portal","Class schedules","Exam results"],["داخلہ پورٹل","کلاس کے اوقات","امتحانی نتائج"]]},
    {key:"mall", en:"Malls", ur:"شاپنگ مال", group:["Retail","خریداری"], word:["malls.","شاپنگ مالز کے لیے"],
      alt:["Miniature shopping mall with a glazed atrium and illuminated storefronts.","شیشے کی دیواروں اور روشن دکانوں والے شاپنگ مال کا ماڈل۔"],
      title:["A better visit starts online.","خریداری سے پہلے رہنمائی"],
      copy:["Let visitors find a store before they arrive and give your management team a place to publish offers and events.","آنے والے افراد کو دکانیں تلاش کرنے میں مدد دیں اور اپنی انتظامیہ کو آفرز اور تقریبات شائع کرنے کی سہولت دیں۔"],
      tags:[["Store directory","Visitor website","Events calendar"],["دکانوں کی فہرست","وزیٹر ویب سائٹ","تقریبات کا کیلنڈر"]]},
    {key:"pharmacy", en:"Medical stores", ur:"میڈیکل اسٹور", group:["Pharmacy retail","فارمیسی"], word:["medical stores.","میڈیکل اسٹورز کے لیے"],
      alt:["Corner pharmacy model with a green cross, shop window and lavender awning.","سبز نشان، شیشے کی کھڑکی اور سائبان والے میڈیکل اسٹور کا ماڈل۔"],
      title:["Stock you can keep track of.","اسٹاک کا حساب آسان"],
      copy:["Build a counter and stockroom workflow around purchases, shelf quantities and batches approaching expiry.","خریداری، شیلف پر موجود مقدار اور میعاد ختم ہونے کے قریب بیچوں کا ریکارڈ اپنے کاؤنٹر اور اسٹور کے مطابق بنوائیں۔"],
      tags:[["Stock register","Batch expiry","Sales records"],["اسٹاک رجسٹر","بیچ کی میعاد","فروخت کا ریکارڈ"]]},
    {key:"hospital", en:"Hospitals", ur:"اسپتال", group:["Healthcare","صحت"], word:["hospitals.","اسپتالوں کے لیے"],
      alt:["Hospital scale model with a covered drop-off, a medical cross and an ambulance.","مرکزی داخلی راستے اور ایمبولینس کے ساتھ اسپتال کی عمارت کا ماڈل۔"],
      title:["A smoother front desk.","استقبالیہ کا کام آسان"],
      copy:["Give patients an easy way to request an appointment and help reception manage bookings, schedules and billing.","مریضوں کے لیے وقت لینے کا عمل آسان کریں اور استقبالیہ کو بکنگ، شیڈول اور بلنگ سنبھالنے کی سہولت دیں۔"],
      tags:[["Appointments","Reception desk","Billing"],["اپائنٹمنٹس","استقبالیہ","بلنگ"]]},
    {key:"business", en:"Other businesses", ur:"دیگر کاروبار", group:["Business operations","کاروبار"], word:["businesses.","ہر کاروبار کے لیے"],
      alt:["Model of a small business with a showroom, offices and a delivery van.","شوروم، دفتر اور ڈلیوری وین کے ساتھ ایک کاروباری عمارت کا ماڈل۔"],
      title:["Built for your kind of business.","آپ کے کاروبار کے مطابق"],
      copy:["Start with the job your team repeats every day. A website or custom app can connect enquiries, orders and customer follow-up.","اپنی ٹیم کا کوئی روزمرہ کام منتخب کریں۔ ایک ویب سائٹ یا ایپ معلومات کی درخواستوں، آرڈرز اور گاہکوں سے رابطے کو ایک جگہ لا سکتی ہے۔"],
      tags:[["Customer enquiries","Order tracking","Team reports"],["گاہکوں کی درخواستیں","آرڈر کی نگرانی","ٹیم رپورٹس"]]}
  ];

  const services = {
    websites:{name:["Websites","ویب سائٹس"],copy:["A public home for your business where customers can understand your services, explore your work and get in touch.","آپ کے کاروبار کی ایسی ویب سائٹ جہاں گاہک آپ کی خدمات اور کام کو دیکھ کر آپ سے رابطہ کر سکیں۔"],tags:[["Business websites","Product catalogues","Admissions pages"],["کاروباری ویب سائٹ","پروڈکٹ کیٹلاگ","داخلہ صفحات"]]},
    desktop:{name:["Desktop applications","ڈیسک ٹاپ ایپس"],copy:["An application for the computer where your team works. Choose the records, printing and offline tasks your staff need.","اپنے کمپیوٹر کے لیے ایسی ایپ بنوائیں جس میں عملہ ضروری ریکارڈ، پرنٹنگ اور آف لائن کام مکمل کر سکے۔"],tags:[["Offline records","Print workflows","Office tools"],["آف لائن ریکارڈ","پرنٹنگ","دفتری کام"]]},
    webapps:{name:["Web applications","ویب ایپس"],copy:["A shared workspace that your staff or customers open in a browser. Build the forms, permissions and reports around their roles.","براؤزر میں چلنے والا مشترکہ نظام جس میں فارم، رسائی اور رپورٹس ٹیم یا گاہکوں کے کردار کے مطابق ہوں۔"],tags:[["Staff portals","Booking systems","Dashboards"],["اسٹاف پورٹل","بکنگ سسٹم","ڈیش بورڈ"]]},
    saas:{name:["SaaS platforms","ساس پلیٹ فارمز"],copy:["Turn a service into a hosted software product. Plan how organisations join, what each team can access and how subscriptions work.","اپنی سروس کو آن لائن سافٹ ویئر میں بدلیں۔ اداروں کی رجسٹریشن، ٹیم کی رسائی اور سبسکرپشن کا طریقہ مل کر طے کریں۔"],tags:[["Organisation accounts","User roles","Subscription workflows"],["اداروں کے اکاؤنٹس","صارفین کے کردار","سبسکرپشن"]]},
    mobile:{name:["Mobile applications","موبائل ایپس"],copy:["Put the most important tasks on a phone, whether customers need to place an order or staff need to record work in the field.","فون کے لیے ایسی ایپ بنوائیں جس سے گاہک آرڈر دے سکیں یا فیلڈ اسٹاف موقع پر اپنا کام درج کر سکے۔"],tags:[["Customer apps","Field reporting","Booking on mobile"],["کسٹمر ایپس","فیلڈ رپورٹنگ","موبائل بکنگ"]]}
  };

  const products = {
    "smart-school":{name:"VBT Smart School",kind:["Windows desktop","ونڈوز ڈیسک ٹاپ"],copy:["An offline-first Windows application for school administration. Keep student records, fees, attendance and exams on the school computer.","اسکول کے انتظام کے لیے ونڈوز سافٹ ویئر جو آف لائن بھی کام کرتا ہے۔ طلبہ، فیس، حاضری اور امتحانات کا ریکارڈ اسکول کے کمپیوٹر پر رکھیں۔"],tags:[["Students & staff","Fees & salaries","Reports & backups"],["طلبہ اور اسٹاف","فیس اور تنخواہیں","رپورٹس اور بیک اپ"]]},
    "smart-campus":{name:"VBT Smart Campus",kind:["Online campus platform","آن لائن کیمپس پلیٹ فارم"],copy:["A cloud platform in development for schools and colleges. Explore the campus management concept and discuss the workflows your institution needs.","اسکولوں اور کالجوں کے انتظام کے لیے زیرِ تیاری کلاؤڈ پلیٹ فارم۔ کیمپس کا تعارفی صفحہ دیکھیں اور اپنے ادارے کی ضروریات پر بات کریں۔"],tags:[["Student admissions","Academics","Fees & reporting"],["طلبہ کے داخلے","تعلیمی امور","فیس اور رپورٹس"]]},
    "paper-generator":{name:"VBT Paper Generator",kind:["Exam preparation","امتحان کی تیاری"],copy:["A paper-setting project for teachers and exam offices. Organise questions by subject, chapter and difficulty, then arrange a printable paper. Ask us about availability for your institution.","اساتذہ اور امتحانی شعبے کے لیے پرچہ سازی کا منصوبہ۔ مضمون، باب اور مشکل کی سطح کے مطابق سوالات ترتیب دے کر پرنٹ کے لیے پرچہ بنائیں۔ دستیابی کے لیے رابطہ کریں۔"],tags:[["Question bank","MCQs & written questions","Printable papers"],["سوالاتی بینک","معروضی اور تحریری سوالات","قابلِ پرنٹ پرچے"]]},
    "quiz-maker":{name:"VBT Quiz Maker",kind:["Classroom assessment","کلاس اسیسمنٹ"],copy:["A quiz-making project for teachers who want short, topic-focused assessments. Tell us how you run classroom practice and ask about availability.","مختصر اور موضوع کے مطابق جائزے کے لیے اساتذہ کا کوئز سازی کا منصوبہ۔ اپنی کلاس کی ضروریات بتائیں اور دستیابی کے بارے میں دریافت کریں۔"],tags:[["Topic quizzes","Class practice","Revision"],["موضوعاتی کوئز","کلاس میں مشق","دہرائی"]]}
  };

  let lang = "en";
  let current = 0;
  let detail = 0;
  let activeImage = $("#scene-front");
  let paused = media.matches;
  let timer = 0;
  let imageRequest = 0;
  let modal = null;
  let returnFocus = null;
  const dialog = $("#details-dialog");
  const nav = $("#main-nav");
  const languageButton = $("#language");
  const heroPhotos = new Map();
  const latin = () => lang === "en";
  const pick = pair => pair[latin() ? 0 : 1];
  const say = (english, urdu) => latin() ? english : urdu;
  const nameOf = sector => sector[lang];
  const numberFor = value => String(value).padStart(2,"0");
  const sceneURL = sector => "studio/scenes/" + sector.key + ".webp";
  const whatsApp = message => "https://wa.me/923227826078?text=" + encodeURIComponent(message);

  function waMessage(subject) {
    return say("Assalam-o-alaikum, I’d like to discuss " + subject + " with Valued Bytes Technologies.",
      "السلام علیکم، میں ویلیوڈ بائٹس ٹیکنالوجیز سے " + subject + " کے بارے میں بات کرنا چاہتا ہوں۔");
  }
  function setLabel(selector, label) {
    const button = $(selector);
    button.setAttribute("aria-label",label);
    button.title = label;
  }
  function svgIcon(name) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    const use = document.createElementNS(svg.namespaceURI,"use");
    svg.classList.add("icon");
    svg.setAttribute("aria-hidden","true");
    use.setAttribute("href",icons + name);
    svg.append(use);
    return svg;
  }
  function tags(list, values) {
    list.replaceChildren(...values.map(value => {
      const item = document.createElement("li");
      item.textContent = value;
      return item;
    }));
  }
  function preload(industry) {
    const key = industry.key;
    if (!heroPhotos.has(key)) {
      const promise = new Promise(resolve => {
        const photo = new Image();
        photo.onload = () => resolve(true);
        photo.onerror = () => { heroPhotos.delete(key); resolve(false); };
        photo.src = sceneURL(industry);
      });
      heroPhotos.set(key,promise);
    }
    return heroPhotos.get(key);
  }
  function renderScene() {
    const sector = industries[current];
    const word = pick(sector.word);
    $("#type-prefix").textContent = latin() ? "for " : "";
    $("#industry-word").textContent = word;
    $(".type-line").dataset.long = String(latin() && word.length > 12);
    $("#hero-heading").setAttribute("aria-label",say("Digital solutions for " + sector.en.toLowerCase() + ".","ڈیجیٹل سلوشنز " + sector.word[1]));
    $("#scene-name").textContent = nameOf(sector);
    $("#scene-group").textContent = pick(sector.group).toLocaleUpperCase(lang);
    $("#scene-symbol").setAttribute("href",icons + sector.key);
    $("#scene-index").textContent = numberFor(current + 1);
    $$(".slide-positions i").forEach((el,i) => el.classList.toggle("active",i === current));
    const src = sceneURL(sector);
    if (activeImage.getAttribute("src") !== src) {
      const incoming = activeImage.id === "scene-front" ? $("#scene-back") : $("#scene-front");
      incoming.src = src;
      incoming.alt = pick(sector.alt);
      incoming.removeAttribute("aria-hidden");
      activeImage.setAttribute("aria-hidden","true");
      activeImage.alt = "";
      incoming.classList.add("active");
      activeImage.classList.remove("active");
      activeImage = incoming;
    } else {
      activeImage.alt = pick(sector.alt);
    }
    $('[data-wa="hero"]').href = whatsApp(waMessage(say("a custom project for " + sector.en.toLowerCase(),sector.ur + " کے لیے ایک پروجیکٹ")));
    $("#industry-stage").dataset.industry = sector.key;
  }
  function renderIndustryDetail() {
    const sector = industries[detail];
    $("#detail-image").src = sceneURL(sector);
    $("#detail-group").textContent = pick(sector.group).toLocaleUpperCase(lang);
    $("#detail-title").textContent = pick(sector.title);
    $("#detail-copy").textContent = pick(sector.copy);
    tags($("#detail-tags"),pick(sector.tags));
    $("#industry-inquiry").href = whatsApp(waMessage(say("a custom project for " + sector.en.toLowerCase(),sector.ur + " کے لیے ایک پروجیکٹ")));
    $$("[data-industry]").forEach((el,i) => el.setAttribute("aria-pressed",String(detail === i)));
  }
  function stopTimers() {
    window.clearTimeout(timer);
    imageRequest++;
  }
  function canPlay() { return !paused && !document.hidden && !dialog.open; }
  function setMotionUI() {
    setLabel("#motion-toggle",paused ? say("Play rotation","شعبوں کی خودکار تبدیلی چلائیں") : say("Pause rotation","شعبوں کی خودکار تبدیلی روکیں"));
    $("#motion-toggle use").setAttribute("href",icons + (paused ? "play" : "pause"));
    $(".typing-caret").classList.toggle("still",paused);
  }
  function schedule() {
    window.clearTimeout(timer);
    if (canPlay()) timer = window.setTimeout(() => { changeScene(current + 1,false); },6000);
  }
  function typeText(full,token) {
    if (media.matches || paused || !canPlay()) { schedule(); return; }
    const segmenter = typeof Intl.Segmenter === "function" ? new Intl.Segmenter(lang,{granularity:"grapheme"}) : null;
    const letters = segmenter ? [...segmenter.segment(full)].map(part => part.segment) : Array.from(full);
    const target = $("#industry-word");
    let index = 0;
    target.textContent = "";
    function step() {
      if (token !== imageRequest || !canPlay()) return;
      target.textContent += letters[index++];
      if (index < letters.length) timer = window.setTimeout(step,latin() ? 65 : 85);
      else schedule();
    }
    step();
  }
  async function changeScene(index, manual) {
    stopTimers();
    const token = imageRequest;
    const next = (index + industries.length) % industries.length;
    if (manual) { paused = true; setMotionUI(); }
    const ready = await preload(industries[next]);
    if (token !== imageRequest) return;
    if (!ready) { schedule(); return; }
    current = next;
    renderScene();
    if (manual) $("#carousel-notice").textContent = nameOf(industries[current]) + " · " + (current + 1) + "/6";
    else typeText(pick(industries[current].word),token);
    preload(industries[(current + 1) % industries.length]);
  }
  function settleMotion() {
    stopTimers();
    $("#industry-word").textContent = pick(industries[current].word);
    setMotionUI();
    schedule();
  }
  function toggleMenu(open) {
    nav.classList.toggle("is-open",open);
    $("#menu-toggle").setAttribute("aria-expanded",String(open));
    $("#menu-toggle use").setAttribute("href",icons + (open ? "close" : "menu"));
    setLabel("#menu-toggle",open ? say("Close menu","مینو بند کریں") : say("Open menu","مینو کھولیں"));
  }

  const originalText = new Map($$("[data-ur]").map(el => [el,el.innerHTML]));
  function setLanguage(value, persist = true) {
    lang = value === "ur" ? "ur" : "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = latin() ? "ltr" : "rtl";
    for (const [el,original] of originalText) {
      if (latin()) el.innerHTML = original;
      else el.textContent = el.dataset.ur;
    }
    const label = $("span",languageButton);
    label.lang = latin() ? "ur" : "en";
    label.textContent = say("اردو","English");
    setLabel("#language",say("اردو میں دیکھیں","Switch to English"));
    const subtitle = $(".hero-bilingual");
    subtitle.lang = latin() ? "ur" : "en";
    subtitle.dir = latin() ? "rtl" : "ltr";
    subtitle.textContent = say("اپنے ادارے یا کاروبار کے لیے ویب سائٹ اور سافٹ ویئر بنوائیں۔","Custom websites and software for your organisation or business.");
    setLabel("#scene-prev",say("Previous industry","پچھلا شعبہ"));
    setLabel("#scene-next",say("Next industry","اگلا شعبہ"));
    setLabel("#dialog-close",say("Close details","تفصیل بند کریں"));
    $("#industry-stage").setAttribute("aria-label",say("Industry showcase","شعبوں کی جھلک"));
    nav.setAttribute("aria-label",say("Main navigation","مرکزی مینو"));
    $(".industry-tabs").setAttribute("aria-label",say("Choose your industry","اپنا شعبہ منتخب کریں"));
    $("#services").setAttribute("aria-label",say("Explore our services","ہماری خدمات دیکھیں"));
    document.title = say("Valued Bytes Technologies · Websites & Custom Software","ویلیوڈ بائٹس ٹیکنالوجیز · ویب سائٹس اور سافٹ ویئر");
    const general = whatsApp(waMessage(say("a website or software project","ویب سائٹ یا سافٹ ویئر کے ایک پروجیکٹ")));
    $('[data-wa="header"]').href = general;
    $('[data-wa="contact"]').href = general;
    toggleMenu(false);
    renderScene();
    renderIndustryDetail();
    settleMotion();
    if (modal && dialog.open) renderDialog();
    if (persist) { try { localStorage.setItem("vbt-studio-language",lang); localStorage.setItem("vbt-site-language",lang); } catch {} }
  }

  function linkButton(label,url,primary,icon) {
    const link = document.createElement("a");
    link.className = "btn " + (primary ? "btn-primary" : "btn-quiet");
    link.href = url;
    if (/^https?:\/\//.test(url)) { link.target = "_blank"; link.rel = "noopener"; }
    link.append(svgIcon(icon),document.createTextNode(label));
    return link;
  }
  function resources(items) {
    const wrapper = document.createElement("div");
    wrapper.className = "dialog-resources";
    for (const [label,url] of items) {
      const link = document.createElement("a");
      link.href = url; link.target = "_blank"; link.rel = "noopener"; link.textContent = label;
      wrapper.append(link);
    }
    return wrapper;
  }
  function renderDialog() {
    const isProduct = modal.type === "product";
    const item = isProduct ? products[modal.id] : services[modal.id];
    const title = isProduct ? item.name : pick(item.name);
    const art = $("#dialog-art");
    art.hidden = !isProduct;
    if (isProduct) $("img",art).src = "studio/products/" + modal.id + ".webp";
    const heading = $("#dialog-heading");
    heading.lang = isProduct ? "en" : lang;
    heading.dir = isProduct ? "ltr" : document.documentElement.dir;
    heading.textContent = title;
    $("#dialog-kicker").textContent = (isProduct ? pick(item.kind) : say("Our services","ہماری خدمات")).toLocaleUpperCase(lang);
    $("#dialog-description").textContent = pick(item.copy);
    const extra = $("#dialog-extra");
    const chips = document.createElement("ul");
    chips.className = "tags"; tags(chips,pick(item.tags)); extra.replaceChildren(chips);
    const actions = $("#dialog-actions");
    actions.replaceChildren();
    if (modal.id === "smart-school") {
      const note = document.createElement("p");
      note.textContent = say("Windows 10 or 11, 64-bit. Version 1.1.0 requires licence activation. The installer is unsigned. See the guide and release notes before installing.","ونڈوز ۱۰ یا ۱۱، ۶۴ بِٹ۔ ورژن 1.1.0 کے لیے لائسنس فعال کرنا ضروری ہے۔ انسٹالر پر ڈیجیٹل دستخط موجود نہیں ہیں۔ انسٹال کرنے سے پہلے رہنمائی اور ریلیز نوٹس دیکھیں۔");
      extra.append(note,resources([[say("Installation guide","انسٹالیشن گائیڈ"),releaseFiles+"VBT-SmartSchool-Easy-Guide.pdf"],[say("Release notes","ریلیز نوٹس"),schoolRelease+"tag/v1.1.0"],[say("SHA256 checksum","فائل چیک سم"),releaseFiles+"SHA256.txt"]]));
      actions.append(linkButton(say("Download for Windows","ونڈوز کے لیے ڈاؤن لوڈ"),releaseFiles+"VBT.SmartSchool.Setup.1.1.0.exe",true,"down"));
    }
    if (modal.id === "smart-campus") actions.append(linkButton(say("Visit product page","پروڈکٹ کا صفحہ دیکھیں"),"smartcampus/",true,"north"));
    const inquiry = waMessage(isProduct ? title : say("a " + title.toLowerCase() + " project",title + " کے پروجیکٹ"));
    actions.append(linkButton(isProduct ? say("Ask on WhatsApp","واٹس ایپ پر دریافت کریں") : say("Discuss this project","اس پروجیکٹ پر بات کریں"),whatsApp(inquiry),!actions.children.length,"whatsapp"));
  }
  function openDialog(type,id,trigger) {
    modal = {type,id}; returnFocus = trigger;
    renderDialog(); toggleMenu(false); stopTimers();
    $("#industry-word").textContent = pick(industries[current].word);
    dialog.showModal(); document.body.classList.add("has-dialog"); $("#dialog-close").focus();
  }
  $("#dialog-close").addEventListener("click",() => dialog.close());
  dialog.addEventListener("click",event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close",() => {
    document.body.classList.remove("has-dialog"); modal = null;
    returnFocus?.focus({preventScroll:true}); returnFocus = null; schedule();
  });
  $$("[data-service]").forEach(button => button.addEventListener("click",() => openDialog("service",button.dataset.service,button)));
  $$("[data-product]").forEach(button => button.addEventListener("click",() => openDialog("product",button.dataset.product,button)));
  $$("[data-industry]").forEach(button => button.addEventListener("click",() => {
    detail = Number(button.dataset.industry); renderIndustryDetail(); changeScene(detail,true);
  }));
  $("#scene-prev").addEventListener("click",() => changeScene(current - 1,true));
  $("#scene-next").addEventListener("click",() => changeScene(current + 1,true));
  $("#motion-toggle").addEventListener("click",() => {paused = !paused; settleMotion();});
  languageButton.addEventListener("click",() => setLanguage(latin() ? "ur" : "en"));
  $("#menu-toggle").addEventListener("click",() => toggleMenu(!nav.classList.contains("is-open")));
  $$("a",nav).forEach(a => a.addEventListener("click",() => toggleMenu(false)));
  document.addEventListener("click",event => { if (nav.classList.contains("is-open") && !event.target.closest(".mast-inner")) toggleMenu(false); });
  document.addEventListener("keydown",event => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {toggleMenu(false); $("#menu-toggle").focus();}
  });
  document.addEventListener("visibilitychange",settleMotion);
  media.addEventListener("change",event => {paused = event.matches; settleMotion();});
  window.matchMedia("(max-width:700px)").addEventListener("change",() => toggleMenu(false));
  $("#year").textContent = new Date().getFullYear();
  let preferred = "en";
  try { preferred = localStorage.getItem("vbt-studio-language") || (localStorage.getItem("vbt-site-language") === "ur" ? "ur" : "en"); } catch {}
  setLanguage(preferred,false);
  preload(industries[0]); preload(industries[1]);
})();
