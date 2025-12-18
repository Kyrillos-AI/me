/* =========================================
   0. FORCE SCROLL TO TOP (FIX REFRESH ISSUE)
   ========================================= */
// 1. Tell browser to not restore scroll position
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
/* =========================================
   1. LENIS SMOOTH SCROLL (HIGH-END FEEL)
   ========================================= */
const lenis = new Lenis({
  duration: 1.5, // مدة النعومة (كل ما الرقم زاد، النعومة زادت)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // معادلة فيزيائية للحركة
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false, // نوقفها ع الموبايل عشان الأداء
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ربط Lenis بـ Anchor Links (عشان لما تدوس على زرار ينزل بنعومة)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    lenis.scrollTo(this.getAttribute("href"));
  });
});
// 2. Force jump to top immediately
window.scrollTo(0, 0);

let currentLang = "ar"; // اللغة الافتراضية

/* =========================================
   🌍 MASTER TRANSLATION OBJECT (UPDATED)
   ========================================= */
/* =========================================
   🌍 COMPLETE TRANSLATION OBJECT (DONE FOR YOU)
   ========================================= */
const translations = {
  ar: {
    // --- Navigation ---
    nav_home: "الرئيسية",
    nav_services: "خدماتي",
    nav_project: "أعمالي",
    nav_contact: "ابدأ مشروعك",
    nav_theme: "تغيير الألوان",

    // --- Hero ---
    sys_status: "النظام يعمل بكفاءة",
    greeting: "جاري الاتصال...",
    hero_job: "مصمم واجهات مبدع. مطور ويب محترف.",
    btn_work: "شاهد أعمالي",
    btn_contact: "صمم مشروعك",

    // --- Stats ---
    stat_1: "مشروع مكتمل",
    stat_2: "عميل سعيد",
    stat_3: "جودة وتسليم",

    // --- About ---
    about_mini: "من أنا",
    about_title: "المبرمج",
    about_title_span: "المبدع",
    about_desc:
      " انا مش بس بكتب كود انا بصمم موقع متكامل سهل التعامل معاه من المستخدمين وباحدث شكل ممكن باحدث الحركات واقل سعر احجز مشروعك وشوف بنفسك",
    spec_dev: "مطور شامل",
    spec_dev_sub: "FrontEnd & BackEnd",
    spec_ui: "مصمم واجهات",
    spec_ui_sub: "Pro Experience",
    spec_loc: "العنوان",
    spec_loc_sub: "Cairo, Egypt",
    spec_stat: "الحالة",
    spec_stat_sub: "متاح للعمل",
    btn_cv: "تحميل السيرة الذاتية",

    // --- Projects ---
    work_title: "أحدث أعمالي",
    view_proj: "معاينة المشروع",
    p1_title: "مصر الحضارة",
    p1_desc: "موقع متكامل يعرض الأماكن الأثرية",
    p2_title: "موقع مطعم فاخر",
    p2_desc: "قائمة طعام تفاعلية ونظام حجز",
    p3_title: "شركة عقارات",
    p3_desc: "عرض الوحدات السكنية بشكل احترافي",
    btn_load_more: "عرض المزيد",
    btn_load_less: "عرض أقل",

    // --- Skills ---
    skills_title: "مهاراتي التقنية",

    // --- Reviews ---
    reviews_title: "آراء العملاء",
    btn_add_review: "أضف تقييمك",
    // Review 1
    rev1_text:
      "كيرلس مبدع! سلم المشروع في وقت قياسي والتصميم فوق الممتاز. أنصح بالتعامل معه.",
    rev1_name: "أحمد كمال",
    rev1_role: "CEO, TechStart",
    // Review 2
    rev2_text:
      "تجربة ممتازة والتصميم رائع. كان هناك تأخير بسيط في الرد أحياناً، لكن النتيجة النهائية تستحق.",
    rev2_name: "سارة علي",
    rev2_role: "Marketing Manager",
    // Review 3
    rev3_text:
      "العمل جيد تقنياً، ولكن طلبت تعديلات كثيرة للوصول للنتيجة المطلوبة.",
    rev3_name: "محمد حسن",
    rev3_role: "Business Owner",

    // --- Timeline ---
    time_title: "رحلة نجاح مشروعك",
    s1_title: "التخطيط والتحليل",
    s1_desc: "فهم متطلباتك بدقة وتحويلها لخطة عمل واضحة لضمان تحقيق أهدافك.",
    s2_title: "التصميم الإبداعي",
    s2_desc: "رسم واجهات عصرية تخطف العين، سهلة الاستخدام، وتناسب هوية مشروعك.",
    s3_title: "التكويد والتطوير",
    s3_desc:
      "تحويل التصميم لموقع حقيقي بكود نظيف، سريع، ومتجاوب مع جميع الشاشات.",
    s4_title: "التسليم والدعم",
    s4_desc:
      "رفع الموقع أونلاين، التأكد من خلوه من الأخطاء، وتقديم دعم فني مستمر.",

    // --- Wizard (Calculator) ---
    wiz_title: "صمم باقتك بنفسك",
    wiz_status_ok: "النظام متاح لاستقبال مشاريع جديدة",
    wiz_step_txt: "خطوة",
    wiz_s1: "اختر نوع المشروع",
    wiz_s2: "الخصائص التقنية",
    wiz_s3: "المظهر والتجربة",
    wiz_visual_hint: "كيف تريد أن يشعر الزائر؟",
    wiz_s4: "الشعار (اللوجو)",
    wiz_logo_have: "لدي شعار جاهز",
    wiz_logo_need: "أحتاج تصميم",
    wiz_colors: "ألوان البراند",
    wiz_colors_hint: "اختر من القائمة أو أضف لونك",
    wiz_s5: "تفاصيل التواصل",
    wiz_ph_name: "الاسم",
    wiz_ph_phone: "رقم الواتساب",
    wiz_ph_desc: "اشرح فكرتك باختصار...",
    btn_next: "التالي",
    btn_prev: "سابق",
    btn_bill: "عرض الفاتورة",

    // --- FAQ ---
    faq_title: "الأسئلة الشائعة",
    q1: "كم يستغرق تصميم موقع؟",
    a1: "يعتمد على حجم المشروع. صفحات الهبوط تستغرق 2-4 أيام، والمواقع الكاملة من أسبوع لأسبوعين.",
    q2: "هل الموقع متجاوب مع الموبايل؟",
    a2: "بالتأكيد! جميع المواقع تعمل بكفاءة 100% على جميع الأجهزة.",
    q3: "هل يمكنني طلب تعديلات لاحقاً؟",
    a3: "نعم، أقدم دعم فني مجاني لمدة أسبوع بعد التسليم لضمان رضاك التام.",
    q4: "هل توفر الاستضافة والدومين؟",
    a4: "أساعدك في اختيار وشراء أفضل استضافة، وأقوم بربط الدومين مجاناً.",
    q5: "كيف يتم الدفع؟",
    a5: "يتم عبر فودافون كاش أو إنستا باي، أو منصات العمل الحر لضمان الحقوق.",
    q6: "ماذا لو حدث خطأ مستقبلاً؟",
    a6: "أكوادنا مستقرة، ولكن في حال حدوث أي خطأ تقني، يمكنك التواصل معي للصيانة.",

    // --- Contact ---
    contact_title: "تواصل معي",
    ph_name: "الاسم",
    ph_email: "البريد الإلكتروني",
    ph_wa: "رقم الواتساب",
    ph_msg: "تفاصيل مشروعك",
    btn_send: "إرسال الرسالة",

    // --- Footer ---
    ticker: "/// النظام يعمل بكفاءة /// متاح لاستلام مشاريع جديدة ///",
    col_links: "مسار التصفح",
    col_social: "وسائل التواصل",
    footer_bio: "مهندس برمجيات متخصص في بناء تجارب رقمية حية.",
    server_time: "توقيت السيرفر:",
    credit: "جميع الحقوق محفوظة © 2025 كيرلس.",

    // --- Bill Modal ---
    bill_head: "فاتورة مبدئية",
    bill_item: "البيان",
    bill_price: "السعر",
    bill_total: "الإجمالي النهائي",
    bill_footer: "بالضغط على تأكيد، سيتم إرسال الطلب عبر واتساب.",
    btn_confirm: "تأكيد وإرسال الطلب",

    // --- Review Modal ---
    modal_rev_title: "أضف تقييمك",
    modal_ph_name: "الاسم",
    modal_ph_role: "الوظيفة",
    modal_ph_text: "رأيك...",
    lbl_half_star: "إضافة نصف نجمة (½)",
    btn_post_rev: "نشر",
    btn_cancel: "إلغاء",
  },

  en: {
    // --- Navigation ---
    nav_home: "Home",
    nav_services: "Services",
    nav_project: "Portfolio",
    nav_contact: "Start Project",
    nav_theme: "Change Theme",

    // --- Hero ---
    sys_status: "System Operational",
    greeting: "Connecting...",
    hero_job: "Creative UI Designer. Pro Web Developer.",
    btn_work: "View Work",
    btn_contact: "Start Project",

    // --- Stats ---
    stat_1: "Projects Done",
    stat_2: "Happy Clients",
    stat_3: "Quality Delivered",

    // --- About ---
    about_mini: "Who Am I",
    about_title: "The Creative",
    about_title_span: "Developer",
    about_desc:
      "I don't just write code, I craft living digital experiences. Blending software art with creative design to create unforgettable websites.",
    spec_dev: "Full Stack Dev",
    spec_dev_sub: "FrontEnd & BackEnd",
    spec_ui: "UI/UX Designer",
    spec_ui_sub: "Pro Experience",
    spec_loc: "Location",
    spec_loc_sub: "Cairo, Egypt",
    spec_stat: "Status",
    spec_stat_sub: "Available",
    btn_cv: "Download CV",

    // --- Projects ---
    work_title: "Latest Work",
    view_proj: "View Project",
    p1_title: "Egypt Civilization",
    p1_desc: "Integrated website displaying historical places",
    p2_title: "Luxury Restaurant",
    p2_desc: "Interactive menu and reservation system",
    p3_title: "Real Estate Co.",
    p3_desc: "Professional housing unit showcase",
    btn_load_more: "Load More",
    btn_load_less: "Show Less",

    // --- Skills ---
    skills_title: "Technical Skills",

    // --- Reviews ---
    reviews_title: "Client Reviews",
    btn_add_review: "Add Review",
    // Review 1
    rev1_text:
      "Kyrillos is creative! Delivered the project in record time and the design is top notch. Highly recommended.",
    rev1_name: "Ahmed Kamal",
    rev1_role: "CEO, TechStart",
    // Review 2
    rev2_text:
      "Great experience and amazing design. Slight delay in replies sometimes, but the result is worth it.",
    rev2_name: "Sarah Ali",
    rev2_role: "Marketing Manager",
    // Review 3
    rev3_text:
      "Technically good work, but I asked for many edits to reach the desired result.",
    rev3_name: "Mohamed Hassan",
    rev3_role: "Business Owner",

    // --- Timeline ---
    time_title: "Project Journey",
    s1_title: "Planning & Analysis",
    s1_desc:
      "Understanding requirements precisely and creating a clear action plan.",
    s2_title: "Creative Design",
    s2_desc: "Crafting modern, eye-catching, and user-friendly interfaces.",
    s3_title: "Development",
    s3_desc: "Turning designs into real websites with clean, fast code.",
    s4_title: "Delivery & Support",
    s4_desc:
      "Launching online, ensuring bug-free performance, and providing technical support.",

    // --- Wizard (Calculator) ---
    wiz_title: "Build Your Package",
    wiz_status_ok: "System ready for new projects",
    wiz_step_txt: "Step",
    wiz_s1: "Project Type",
    wiz_s2: "Tech Features",
    wiz_s3: "Look & Feel",
    wiz_visual_hint: "How do you want the visitor to feel?",
    wiz_s4: "Logo Design",
    wiz_logo_have: "I have a logo",
    wiz_logo_need: "Need design",
    wiz_colors: "Brand Colors",
    wiz_colors_hint: "Choose from list or add yours",
    wiz_s5: "Contact Details",
    wiz_ph_name: "Your Name",
    wiz_ph_phone: "WhatsApp Number",
    wiz_ph_desc: "Briefly explain your idea...",
    btn_next: "Next",
    btn_prev: "Back",
    btn_bill: "View Invoice",

    // --- FAQ ---
    faq_title: "FAQ",
    q1: "How long does design take?",
    a1: "Depends on complexity. Landing pages take 2-4 days, full sites 1-2 weeks.",
    q2: "Is it mobile responsive?",
    a2: "Absolutely! All sites work 100% on all devices.",
    q3: "Can I request edits later?",
    a3: "Yes, I offer free support for a week after delivery to ensure your satisfaction.",
    q4: "Do you provide hosting?",
    a4: "I help you choose the best hosting and link the domain for free.",
    q5: "How is payment done?",
    a5: "Via Vodafone Cash, InstaPay, or Freelance platforms to ensure rights.",
    q6: "What if an error occurs later?",
    a6: "My code is stable, but if any technical error occurs, you can contact me anytime.",

    // --- Contact ---
    contact_title: "Contact Me",
    ph_name: "Name",
    ph_email: "Email Address",
    ph_wa: "WhatsApp Number",
    ph_msg: "Project Details",
    btn_send: "Send Message",

    // --- Footer ---
    ticker: "/// SYSTEM OPERATIONAL /// READY FOR NEW PROJECTS ///",
    col_links: "Navigation",
    col_social: "Social Media",
    footer_bio:
      "Software Engineer specializing in building living digital experiences.",
    server_time: "Server Time:",
    credit: "All rights reserved © 2025 Kyrillos.",

    // --- Bill Modal ---
    bill_head: "Preliminary Invoice",
    bill_item: "Item",
    bill_price: "Price",
    bill_total: "Final Total",
    bill_footer: "Clicking confirm will send the order via WhatsApp.",
    btn_confirm: "Confirm & Send",

    // --- Review Modal ---
    modal_rev_title: "Add Your Review",
    modal_ph_name: "Name",
    modal_ph_role: "Job Title",
    modal_ph_text: "Your Opinion...",
    lbl_half_star: "Add Half Star (½)",
    btn_post_rev: "Post",
    btn_cancel: "Cancel",
  },
};
// 🌟 الجديد: ترجمة الـ Placeholders 🌟
const placeholders = document.querySelectorAll("[data-lang-placeholder]");
placeholders.forEach((el) => {
  const key = el.getAttribute("data-lang-placeholder");
  if (translations[currentLang][key]) {
    el.placeholder = translations[currentLang][key];
  }
});

/* =========================================
   🌍 وظيفة تبديل اللغة (تحديث الزر الجديد)
   ========================================= */
function toggleLanguage() {
  // 1. تبديل اللغة والاتجاه
  const langAr = document.getElementById("lang-ar");
  const langEn = document.getElementById("lang-en");

  if (currentLang === "ar") {
    currentLang = "en";
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", "en");
    langAr.classList.remove("active");
    langEn.classList.add("active");
  } else {
    currentLang = "ar";
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
    langEn.classList.remove("active");
    langAr.classList.add("active");
  }

  // 2. ترجمة النصوص العادية (التي لها data-lang)
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (translations[currentLang][key]) {
      el.innerText = translations[currentLang][key];
    }
  });

  // 3. 🌟 ترجمة الـ Placeholders (الإصلاح هنا) 🌟
  document.querySelectorAll("[data-lang-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-lang-placeholder");
    if (translations[currentLang][key]) {
      el.placeholder = translations[currentLang][key];
    }
  });

  // 4. تحديث Typed.js (اختياري)
  if (typeof typed !== "undefined") {
    typed.destroy();
    typed = new Typed(".auto-type", {
      strings:
        currentLang === "ar"
          ? [
              "الكود خد الموقع فحته تانيه",
              "مصمم واجهات رايق.",
              "مبرمج ويب فنان.",
              "هيصمملك عظمه مش موقع.",
              "دعم مجاني لو حصل عطل",
              "انت صدقت ولا اي",
              "مش هيحصل اعطال متصغرناش",
              "وافتكر ان....",
            ]
          : [
              "Creative UI Designer.",
              "Pro Web Developer.",
              "Your Success Partner.",
            ],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });
  }
}
/* =========================================
   2. Init Libraries
   ========================================= */
AOS.init({ offset: 120, duration: 1000 });

var typed = new Typed(".auto-type", {
  strings: [
    "الكود خد الموقع فحته تانيه",
    "مصمم واجهات رايق.",
    "مبرمج ويب فنان.",
    "هيصمملك عظمه مش موقع.",
    "دعم مجاني لو حصل عطل",
    "انت صدقت ولا اي",
    "مش هيحصل اعطال متصغرناش",
    "وافتكر ان....",
  ],
  typeSpeed: 100,
  backSpeed: 50,
  loop: true,
});

/* =========================================
   3. Particles Manager (Fixed Mouse Interaction)
   ========================================= */
function loadParticles(colorHex) {
  // تنظيف الذاكرة القديمة
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }

  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: colorHex },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: colorHex,
        opacity: 0.4,
        width: 1,
      },
      move: { enable: true, speed: 3 },
    },
    interactivity: {
      /* 🛑 التغيير المهم هنا: window بدلاً من canvas 🛑 */
      detect_on: "window",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
      },
      modes: { grab: { distance: 140, line_linked: { opacity: 1 } } },
    },
    retina_detect: true,
  });
}

/* =========================================
   4. Settings & Theme Logic
   ========================================= */
const settingsBox = document.querySelector(".settings-box");
const root = document.querySelector(":root");
const themeModal = document.getElementById("themeModal");

function openThemeModal() {
  if (themeModal) themeModal.classList.add("active");
}

function closeThemeModal() {
  if (themeModal) themeModal.classList.remove("active");
}

// Close if clicked outside the box
if (themeModal) {
  themeModal.addEventListener("click", (e) => {
    if (e.target === themeModal) closeThemeModal();
  });
}
/* =========================================
   🔥 FIREBASE MASTER SETUP (SAFE VERSION)
   ========================================= */
// 1. Define 'db' globally using 'let' (not const) so we can assign it later
let db;

const firebaseConfig = {
  apiKey: "AIzaSyANz8dBPKkSD6mqTuVk77WLRqsVQ1hVlog",
  authDomain: "kyrillos-protifolio.firebaseapp.com",
  projectId: "kyrillos-protifolio",
  storageBucket: "kyrillos-protifolio.firebasestorage.app",
  messagingSenderId: "154071914816",
  appId: "1:154071914816:web:b246ca0b0aada5db3502a5",
  measurementId: "G-64M0V7QRPO",
};

// 2. Safety Check: Only initialize if Firebase library is loaded
if (typeof firebase !== "undefined") {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  // Initialize Database
  db = firebase.firestore();
} else {
  console.error(
    "⚠️ Firebase SDK not loaded yet. Database features will be disabled."
  );
}
function toggleSettings() {
  if (settingsBox) settingsBox.classList.toggle("open");
}

function resetTheme() {
  setTheme("#D4AF37", "#AA8A2E");
  document
    .querySelectorAll(".color-btn")
    .forEach((btn) => btn.classList.remove("active"));
}

function setTheme(mainColor, darkColor) {
  root.style.setProperty("--gold-main", mainColor);
  root.style.setProperty("--gold-dark", darkColor);
  root.style.setProperty("--gold-rgb", hexToRgb(mainColor));

  loadParticles(mainColor);

  if (
    event &&
    event.target &&
    event.target.classList.contains("color-btn") &&
    !event.target.classList.contains("reset-btn")
  ) {
    document
      .querySelectorAll(".color-btn")
      .forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
  }
}
setTheme("#D4AF37", "#AA8A2E");

/* =========================================
   5. NEW SYSTEM PRELOADER (With Percentage)
   ========================================= */
{
  // 1. Lock Scroll & Force Top
  document.body.style.overflow = "hidden";
  window.scrollTo(0, 0);

  const loaderWrapper = document.querySelector(".loader-wrapper");
  const percentText = document.querySelector(".loader-percent");

  let load = 0;

  // Speed: 25ms
  let int = setInterval(blurring, 25);

  function blurring() {
    load++;

    // 2. Keep forcing top while loading (Fixes some mobile browsers)
    window.scrollTo(0, 0);

    if (load > 99) {
      clearInterval(int);

      // Fade out animation
      if (loaderWrapper) {
        loaderWrapper.classList.add("hidden");
        // 3. Unlock scroll ONLY after loader finishes
        document.body.style.overflow = "auto";
        if (typeof lenis !== "undefined") lenis.resize();
      }
    }

    // Update the text
    if (percentText) {
      percentText.innerText = `${load}%`;
    }
  }
}
/* =========================================
   6. UI Logic (Nav & Scroll)
   ========================================= */
const hamburger = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");
if (hamburger)
  hamburger.addEventListener("click", () =>
    navLinks.classList.toggle("active")
  );

window.onscroll = function () {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  const myBar = document.getElementById("myBar");
  if (myBar) myBar.style.width = scrolled + "%";
};

/* =========================================
   7. Counters
   ========================================= */
const counters = document.querySelectorAll(".counter");
let hasRun = false;
window.addEventListener("scroll", () => {
  const section = document.querySelector(".stats-section");
  if (section) {
    const sectionPos = section.getBoundingClientRect().top;
    if (sectionPos < window.innerHeight / 1.3 && !hasRun) {
      counters.forEach((counter) => {
        counter.innerText = "0";
        const updateCounter = () => {
          const target = +counter.getAttribute("data-target");
          const c = +counter.innerText;
          const increment = target / 100;
          if (c < target) {
            counter.innerText = Math.ceil(c + increment);
            setTimeout(updateCounter, 20);
          } else {
            counter.innerText = target;
          }
        };
        updateCounter();
      });
      hasRun = true;
    }
  }
});

/* =========================================
   8. Reviews Load More
   ========================================= */
const loadMoreBtn = document.getElementById("loadMoreBtn");
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    const grid = document.getElementById("reviewsGrid");
    const cards = grid.querySelectorAll(".review-card");
    const isExpanded = loadMoreBtn.getAttribute("data-expanded") === "true";

    if (!isExpanded) {
      cards.forEach((card) => {
        card.classList.remove("hidden-review");
        card.style.display = "flex";
        card.classList.add("aos-animate");
      });
      loadMoreBtn.innerHTML = 'عرض أقل <i class="fas fa-chevron-up"></i>';
      loadMoreBtn.setAttribute("data-expanded", "true");
    } else {
      cards.forEach((card, index) => {
        if (index >= 3) {
          card.classList.add("hidden-review");
          card.style.display = "none";
        }
      });
      loadMoreBtn.innerHTML = 'عرض المزيد <i class="fas fa-chevron-down"></i>';
      loadMoreBtn.setAttribute("data-expanded", "false");
      document
        .querySelector(".testimonials-grid")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

/* =========================================
   9. FAQ Logic
   ========================================= */
document.querySelectorAll(".faq-item").forEach((faq) => {
  faq.addEventListener("click", () => {
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faq) {
        item.classList.remove("active");
        item.querySelector(".faq-answer").style.maxHeight = null;
      }
    });
    faq.classList.toggle("active");
    const answer = faq.querySelector(".faq-answer");
    if (faq.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});

/* =========================================
   UPDATED ALERT SYSTEM (With Button Support)
   ========================================= */
function showCustomAlert(
  message,
  title = "تنبيه",
  btnText = null,
  btnLink = null
) {
  const alertBox = document.getElementById("customAlert");
  const msgEl = document.getElementById("alertMessage"); // Note: ID in HTML is 'alertMessage'
  const titleEl = document.getElementById("alertTitle");
  const actionBtn = document.getElementById("alertActionBtn");

  if (msgEl) msgEl.innerText = message;
  if (titleEl) titleEl.innerText = title;

  // Logic to Show/Hide the WhatsApp Button
  if (actionBtn) {
    if (btnText && btnLink) {
      actionBtn.style.display = "inline-flex"; // Show button
      actionBtn.innerHTML = `<i class="fab fa-whatsapp"></i> ${btnText}`;
      actionBtn.href = btnLink;
    } else {
      actionBtn.style.display = "none"; // Hide button
      actionBtn.href = "#";
    }
  }

  if (alertBox) alertBox.classList.add("active");
}
window.closeCustomAlert = function () {
  const alertBox = document.getElementById("customAlert");
  if (alertBox) {
    alertBox.classList.remove("active");
  }
};
/* =========================================
   11. Smart Greeting & Dual Clock
   ========================================= */
function updateSystemStatus() {
  const greetingEl = document.getElementById("greeting-text");
  const heroClock = document.getElementById("live-clock");
  const navClock = document.getElementById("nav-clock");

  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let greeting = "";
  if (hours >= 5 && hours < 12) greeting = "نهارك لـذيذ ☀️";
  else if (hours >= 12 && hours < 18) greeting = "صـباح الفـل 🚀";
  else if (hours >= 18 && hours < 22) greeting = "مساء الخير ✨";
  else greeting = "مش هتنام بقي 🌙";

  const ampm = hours >= 12 ? "PM" : "AM";
  let h = hours % 12;
  h = h ? h : 12;
  const strH = h < 10 ? "0" + h : h;
  const strM = minutes < 10 ? "0" + minutes : minutes;
  const strS = seconds < 10 ? "0" + seconds : seconds;

  if (greetingEl) greetingEl.innerText = greeting;
  if (heroClock) heroClock.innerText = `${strH}:${strM}:${strS} ${ampm}`;
  if (navClock) navClock.innerText = `${strH}:${strM} ${ampm}`;
}

setInterval(updateSystemStatus, 1000);
updateSystemStatus();

window.addEventListener("scroll", () => {
  const heroClockContainer = document.querySelector(".system-status");
  const navClock = document.getElementById("nav-clock");

  if (window.scrollY > 300) {
    if (heroClockContainer) heroClockContainer.classList.add("hidden");
    if (navClock) navClock.classList.add("visible");
  } else {
    if (heroClockContainer) heroClockContainer.classList.remove("hidden");
    if (navClock) navClock.classList.remove("visible");
  }
});

/* =========================================
   13. Contact Form (EmailJS)
   ========================================= */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = contactForm.querySelector("button");
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    btn.disabled = true;

    const serviceID = "service_fuluy6n";
    const templateID = "template_bpuf6mt";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        showCustomAlert(
          "تم استلام رسالتك بنجاح! سأتواصل معك قريباً.",
          "تم الإرسال ✅"
        );
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
      },
      (err) => {
        showCustomAlert(
          "حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.",
          "خطأ ❌"
        );
        console.log(JSON.stringify(err));
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    );
  });
}

// 1. Modal Logic
const reviewModal = document.getElementById("reviewModal");
function openReviewModal() {
  if (reviewModal) reviewModal.classList.add("active");
}
function closeReviewModal() {
  if (reviewModal) reviewModal.classList.remove("active");
}

// 2. Rating Logic
function setRating(n) {
  const ratingInput = document.getElementById("reviewRating");
  if (ratingInput) ratingInput.value = n;

  const stars = document.querySelectorAll(".rating-select i");
  stars.forEach((s, index) => {
    if (index < n) {
      s.className = "fas fa-star";
      s.style.color = "var(--gold-main)";
    } else {
      s.className = "far fa-star";
      s.style.color = "#ccc";
    }
  });
}

// 3. Add Review
const reviewForm = document.getElementById("addReviewForm");
if (reviewForm) {
  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("reviewName").value;
    const role = document.getElementById("reviewRole").value;
    const text = document.getElementById("reviewText").value;
    let rating = parseFloat(document.getElementById("reviewRating").value);

    // Half star check
    const isHalf = document.getElementById("halfStarCheck");
    if (isHalf && isHalf.checked) rating += 0.5;
    if (rating > 5) rating = 5;

    if (rating == 0) {
      showCustomAlert("من فضلك اختر عدد النجوم!");
      return;
    }

    const btn = reviewForm.querySelector('button[type="submit"]');
    const oldText = btn.innerText;
    btn.innerText = "جاري النشر...";
    btn.disabled = true;

    db.collection("reviews")
      .add({
        name: name,
        role: role,
        text: text,
        rating: rating,
        date: new Date(),
      })
      .then(() => {
        showCustomAlert("شكراً لك! تم نشر تقييمك.", "نجاح");
        closeReviewModal();
        reviewForm.reset();
        setRating(0);
        if (isHalf) isHalf.checked = false;
        btn.innerText = oldText;
        btn.disabled = false;
        loadReviews();
      })
      .catch((error) => {
        console.error("Error: ", error);
        showCustomAlert("حدث خطأ في الاتصال!", "خطأ");
        btn.innerText = oldText;
        btn.disabled = false;
      });
  });
}

// 4. Load Reviews
function loadReviews() {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;

  // Remove old Firebase reviews to avoid duplicates
  const addedReviews = grid.querySelectorAll(".added-by-firebase");
  addedReviews.forEach((el) => el.remove());

  db.collection("reviews")
    .orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      const allDocs = [];
      querySnapshot.forEach((doc) => allDocs.push(doc.data()));

      // Add Firebase reviews to DOM (Prepended)
      allDocs.forEach((data) => {
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
          if (data.rating >= i) starsHTML += '<i class="fas fa-star"></i>';
          else if (data.rating >= i - 0.5)
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
          else starsHTML += '<i class="far fa-star"></i>';
        }

        const cardHTML = `
                <div class="review-card glass added-by-firebase" data-aos="flip-up">
                    <div class="stars" style="color: var(--gold-main); direction: rtl; display: inline-flex;">${starsHTML}</div>
                    <p>"${data.text}"</p>
                    <div class="client-info">
                        <div class="client-avatar" style="background: var(--gold-main); color: #000;">${data.name
                          .charAt(0)
                          .toUpperCase()}</div>
                        <div><h4>${data.name}</h4><span>${
          data.role
        }</span></div>
                    </div>
                </div>
            `;
        grid.insertAdjacentHTML("afterbegin", cardHTML);
      });

      // Re-calculate visibility for ALL reviews (Hardcoded + Firebase)
      const allCards = grid.querySelectorAll(".review-card");
      allCards.forEach((card, index) => {
        if (index < 3) {
          card.classList.remove("hidden-review");
          card.style.display = "flex";
        } else {
          card.classList.add("hidden-review");
          card.style.display = "none";
        }
      });

      if (loadMoreBtn) {
        if (allCards.length <= 3) loadMoreBtn.style.display = "none";
        else {
          loadMoreBtn.style.display = "inline-block";
          loadMoreBtn.innerHTML =
            'عرض المزيد <i class="fas fa-chevron-down"></i>';
          loadMoreBtn.setAttribute("data-expanded", "false");
        }
      }
    });
}

if (typeof firebase !== "undefined") {
  loadReviews();
}
/* =========================================
   17. 3D Tag Cloud Logic (كرة المهارات)
   ========================================= */
const myTags = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "ES6",
  "React.js",
  "Firebase",
  "Git",
  "GitHub",
  "SASS",
  "Bootstrap",
  "Tailwind",
  "Figma",
  "Photoshop",
  "UI/UX",
  "SEO",
  "Responsive",
  "Animation",
  "JSON",
  "API",
  "EmailJS",
];

function initTagCloud() {
  const container = document.querySelector(".tag-sphere");
  if (!container) return;

  const radius = 200; // نصف قطر الكرة
  const totalTags = myTags.length;
  const tags = [];

  // إنشاء العناصر
  myTags.forEach((tagText, i) => {
    const tag = document.createElement("span");
    tag.className = "tag-item";
    tag.innerText = tagText;
    container.appendChild(tag);
    tags.push(tag);
  });

  // حساب المواقع (Spherical Distribution)
  let angleX = 0;
  let angleY = 0;

  // سرعة الدوران التلقائي
  let autoRotateX = 0.002;
  let autoRotateY = 0.002;

  function updateSphere() {
    angleX += autoRotateX;
    angleY += autoRotateY;

    tags.forEach((tag, i) => {
      // توزيع فيبوناتشي للكرة (توزيع متساوي)
      const phi = Math.acos(-1 + (2 * i + 1) / totalTags);
      const theta = Math.sqrt(totalTags * Math.PI) * phi;

      let x = radius * Math.cos(theta) * Math.sin(phi);
      let y = radius * Math.sin(theta) * Math.sin(phi);
      let z = radius * Math.cos(phi);

      // تطبيق الدوران
      // دوران حول Y
      let dy = y;
      let dz = z * Math.cos(angleY) - x * Math.sin(angleY);
      let dx = z * Math.sin(angleY) + x * Math.cos(angleY);

      // دوران حول X
      let dx2 = dx;
      let dy2 = dy * Math.cos(angleX) - dz * Math.sin(angleX);
      let dz2 = dy * Math.sin(angleX) + dz * Math.cos(angleX);

      // تحديث القيم النهائية
      x = dx2;
      y = dy2;
      z = dz2;

      // الحجم والشفافية بناءً على العمق (Z)
      const scale = (2 * radius + z) / (2.5 * radius); // منظور
      const opacity = (z + radius) / (2 * radius); // البعيد شفاف

      tag.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
      tag.style.opacity = Math.max(0.2, opacity);
      tag.style.zIndex = Math.floor(z); // القريب يغطي البعيد
    });

    requestAnimationFrame(updateSphere);
  }

  // تفاعل الماوس (تغيير السرعة والاتجاه)
  const wrapper = document.querySelector(".tag-cloud-container");
  wrapper.addEventListener("mousemove", (e) => {
    const rect = wrapper.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // تغيير السرعة حسب مكان الماوس
    autoRotateY = mouseX * 0.0002;
    autoRotateX = -mouseY * 0.0002;
  });

  // عند خروج الماوس، العودة للسرعة الهادئة
  wrapper.addEventListener("mouseleave", () => {
    autoRotateX = 0.002;
    autoRotateY = 0.002;
  });

  updateSphere();
}

/* =========================================
   16. Hacker Cursor Logic
   ========================================= */
const hackerChars = "01{}[]<>/*-+!@#$k"; // الرموز اللي هتظهر

document.addEventListener("mousemove", function (e) {
  // عشان ميعملش زحمة، بنشغل الكود مرة كل شوية حركات
  if (Math.random() < 0.5) return; // 15% بس من الحركات بتعمل رقم

  const char = document.createElement("span");
  char.innerText = hackerChars[Math.floor(Math.random() * hackerChars.length)];
  char.className = "hacker-char";

  // مكان الماوس
  char.style.left = e.clientX + "px";
  char.style.top = e.clientY + "px";

  // لون الثيم الحالي (عشان يليق مع الموقع)
  const themeColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--gold-main")
    .trim();
  char.style.color = themeColor;

  // حجم عشوائي لزوم الواقعية
  char.style.fontSize = Math.random() * 10 + 10 + "px";

  document.body.appendChild(char);

  // مسح العنصر بعد ثانية (لما الأنيميشن يخلص)
  setTimeout(() => {
    char.remove();
  }, 2000);
});

/* =========================================
   💰 Pop-Zoom Estimator Logic (Flexible)
   ========================================= */
let basePrice = 0;
let addonsPrice = 0;
let priceInterval;

function selectType(price, card) {
  // 1. Feature: Allow deselecting (Clicking again removes selection)
  if (card.classList.contains("active")) {
    card.classList.remove("active");
    basePrice = 0; // Reset base price
    updateTotal();
    return;
  }

  basePrice = price;

  // Remove Active from other project types
  const allTypes = document.querySelectorAll(".type-item");
  allTypes.forEach((c) => c.classList.remove("active"));

  // Activate clicked card
  card.classList.add("active");

  updateTotal();
}

function toggleAddon(price, bubble) {
  bubble.classList.toggle("active");

  if (bubble.classList.contains("active")) {
    addonsPrice += price;
  } else {
    addonsPrice -= price;
  }
  updateTotal();
}

function updateTotal() {
  const totalElement = document.getElementById("totalPrice");
  const priceContainer = document.querySelector(".bouncy-price");
  const targetTotal = basePrice + addonsPrice;

  if (priceInterval) clearInterval(priceInterval);

  // Bounce animation
  if (priceContainer) {
    priceContainer.style.transform = "scale(1.2)";
    setTimeout(() => {
      priceContainer.style.transform = "scale(1)";
    }, 200);
  }

  let currentVal = parseInt(totalElement.innerText) || 0;
  if (currentVal === targetTotal) return;

  const stepTime = 16;
  const increment = (targetTotal - currentVal) / 10;

  priceInterval = setInterval(() => {
    currentVal += increment;
    if (Math.abs(targetTotal - currentVal) < 1) {
      totalElement.innerText = targetTotal;
      clearInterval(priceInterval);
    } else {
      totalElement.innerText = Math.floor(currentVal);
    }
  }, stepTime);
}

/* =========================================
   🧾 Bill Generator Logic (Fixed Scroll + Icons + Date)
   ========================================= */
function showBill() {
  const billModal = document.getElementById("billModal");
  const billItemsContainer = document.getElementById("billItems");
  const billTotalEl = document.getElementById("billTotal");

  // 1. Get Active Items
  const activeProject = document.querySelector(".type-item.active");
  const activeAddons = document.querySelectorAll(".pop-bubble.active");

  if (!activeProject && activeAddons.length === 0) {
    showCustomAlert("من فضلك اختر خدمة واحدة على الأقل!", "السلة فارغة");
    return;
  }

  // 2. Lock Background Scroll (Important!)
  document.body.style.overflow = "hidden";

  // 3. Reset Bill
  billItemsContainer.innerHTML = "";
  let finalBillTotal = 0;

  // --- NEW: Add Date & Time Header ---
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB"); // DD/MM/YYYY
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  billItemsContainer.innerHTML += `
        <div class="bill-row" style="opacity: 0.6; font-size: 0.75rem; border-bottom: 1px solid #333; margin-bottom: 10px; padding-bottom: 8px; justify-content: center; gap: 15px;">
           <span>📅 ${dateStr}</span>
           <span>⏰ ${timeStr}</span>
        </div>
    `;

  // 4. Add Main Project (With Correct Icon)
  if (activeProject) {
    const projName = activeProject.querySelector("h4").innerText;
    const projPriceText = activeProject.querySelector(".price-badge").innerText;
    const projPriceVal = parseInt(projPriceText.replace(/[^0-9]/g, ""));

    // 🔥 GRAB ICON: Find the <i> tag inside the active card
    const iconClass = activeProject.querySelector("i").className;

    finalBillTotal += projPriceVal;

    billItemsContainer.innerHTML += `
            <div class="bill-row">
                <span style="display:flex; align-items:center; gap:8px;">
                    <i class="${iconClass}" style="color:var(--gold-main); width:20px; text-align:center;"></i> 
                    ${projName}
                </span>
                <span class="gold-text">${projPriceVal}</span>
            </div>
        `;
  }

  // 5. Add Addons (With Correct Icons)
  if (activeAddons.length > 0) {
    if (!activeProject) {
      billItemsContainer.innerHTML += `<div class="bill-row" style="border:none; color:#666; font-size:0.75rem; justify-content:center;">-- خدمات إضافية --</div>`;
    }

    activeAddons.forEach((addon) => {
      // Get Name (Clean up the text inside)
      // Depending on your HTML, the text might be inside a span or direct
      const nameSpan = addon.querySelector("span");
      const addonName = nameSpan
        ? nameSpan.innerText.trim()
        : addon.innerText.replace(/[0-9]/g, "").trim();

      const addonPriceText = addon.querySelector("small").innerText;
      const addonPriceVal = parseInt(addonPriceText.replace(/[^0-9]/g, ""));

      // 🔥 GRAB ICON
      const addonIconClass = addon.querySelector("i").className;

      finalBillTotal += addonPriceVal;

      billItemsContainer.innerHTML += `
                <div class="bill-row">
                    <span style="display:flex; align-items:center; gap:8px;">
                        <i class="${addonIconClass}" style="color:#888; width:20px; text-align:center; font-size:0.8rem;"></i>
                        ${addonName}
                    </span>
                    <span>${addonPriceVal}</span>
                </div>
            `;
    });
  }

  // 6. Update Total
  billTotalEl.innerText = finalBillTotal + " ج.م";

  // Show Modal
  billModal.classList.add("active");
}

// Ensure Close Function unlocks scroll
function closeBill() {
  document.getElementById("billModal").classList.remove("active");
  document.body.style.overflow = "auto"; // Unlock scroll
}
/* =========================================
   🔥 SYSTEM: DYNAMIC PROJECTS LOADER (WITH LOAD MORE) 🔥
   ========================================= */
function loadDynamicProjects() {
  const grid = document.querySelector(".projects-grid");

  if (!grid) return;

  if (typeof db === "undefined") {
    console.error("Firebase DB is not initialized.");
    return;
  }

  // 1. Get Data from Firebase
  db.collection("projects")
    .orderBy("date", "desc")
    .onSnapshot((snapshot) => {
      grid.innerHTML = ""; // Clear existing content

      // 2. Setup Variables
      const visibleLimit = 3; // Number of projects to show initially
      const allDocs = snapshot.docs;

      // 3. Loop through projects
      allDocs.forEach((doc, index) => {
        const data = doc.data();

        // If index is 3 or more, hide it initially
        const isHidden = index >= visibleLimit ? 'style="display:none"' : "";
        const hiddenClass = index >= visibleLimit ? "hidden-project" : "";

        const projectHTML = `
               <div class="project-card ${hiddenClass}" ${isHidden} data-category="${data.category}" data-aos="zoom-in-up" data-tilt>
                    <div class="project-img" style="background: url('${data.img}') center/cover no-repeat;"></div>
                    <div class="project-info">
                        <h3>${data.title}</h3>
                        <p>${data.desc}</p>
                        <a href="${data.link}" target="_blank"><span>معاينة</span> <i class="fas fa-arrow-left"></i></a>
                    </div>
                </div> 
            `;

        grid.insertAdjacentHTML("beforeend", projectHTML);
      });

      // 4. Manage "Load More" Button
      // Remove old button if exists to avoid duplicates
      const oldBtn = document.getElementById("projectLoadBtnContainer");
      if (oldBtn) oldBtn.remove();

      // If we have hidden projects, add the button
      if (allDocs.length > visibleLimit) {
        const btnHTML = `
                <div id="projectLoadBtnContainer" style="width:100%; text-align:center; margin-top:40px;">
                    <button class="btn primary" onclick="revealProjects(this)">
                        عرض المزيد <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            `;
        // Insert button AFTER the grid
        grid.parentNode.insertBefore(
          new DOMParser().parseFromString(btnHTML, "text/html").body.firstChild,
          grid.nextSibling
        );
      }

      // Re-init animations
      if (typeof AOS !== "undefined") setTimeout(() => AOS.refresh(), 500);
      if (typeof VanillaTilt !== "undefined")
        VanillaTilt.init(document.querySelectorAll(".project-card"));
    });
}

// 5. Function to Reveal Hidden Projects (Called by the button)
function revealProjects(btn) {
  const hiddenCards = document.querySelectorAll(".hidden-project");

  hiddenCards.forEach((card) => {
    card.style.display = "block"; // Show card
    card.classList.remove("hidden-project");
    card.classList.add("aos-animate"); // Trigger animation
  });

  btn.style.display = "none"; // Hide button after clicking
}

/* =========================================
   🔗 تحميل روابط السوشيال (Dynamic Socials) - FIXED
   ========================================= */
function loadSocialsFromDB() {
  // التأكد من أن قاعدة البيانات تعمل
  if (typeof db === "undefined") {
    console.error("Firebase DB not initialized in script.js");
    return;
  }

  db.collection("settings")
    .doc("socials")
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();

        // دالة مساعدة لتحديث الرابط
        const updateLink = (id, url) => {
          const el = document.getElementById(id);
          // نحدث الرابط فقط لو الأدمن حط قيمة، ولو الرابط مش فاضي
          if (el && url && url.trim() !== "") {
            el.href = url;
          }
        };

        // 1. تحديث أيقونات الـ Hero (الأيقونات العائمة)
        updateLink("heroFb", data.facebook);
        updateLink("heroInsta", data.instagram);
        updateLink("heroWa", data.whatsapp);
        updateLink("heroTiktok", data.tiktok);
        updateLink("heroGit", data.github);

        // 2. تحديث أيقونات الفوتر (تم تفعيلها الآن)
        updateLink("footerFb", data.facebook);
        updateLink("footerInsta", data.instagram);
        updateLink("footerWa", data.whatsapp); // تأكد إنك غيرت الـ ID في HTML لـ footerWa
        updateLink("footerGit", data.github);

        console.log("Social links updated form DB");
      }
    })
    .catch((error) => {
      console.log("Error getting socials:", error);
    });
}

/* --- Load Custom Profile Image --- */
function loadProfileImage() {
  if (typeof db === "undefined") return;

  db.collection("settings")
    .doc("profile")
    .onSnapshot((doc) => {
      const imgEl = document.getElementById("aboutProfileImg");
      if (doc.exists && doc.data().isCustom && doc.data().image) {
        if (imgEl) imgEl.src = doc.data().image;
      } else {
        // Revert to default if deleted
        if (imgEl) imgEl.src = "myphoto.png";
      }
    });
}

/* =========================================
   🕵️‍♂️ VISITOR TRACKING & STATUS CHECK
   ========================================= */

// 1. Increment Visitor Count (Run once per session)
function trackVisit() {
  // Check if we already counted this user in this session
  if (!sessionStorage.getItem("visited")) {
    const increment = firebase.firestore.FieldValue.increment(1);
    db.collection("stats").doc("visits").set(
      {
        count: increment,
      },
      { merge: true }
    );

    sessionStorage.setItem("visited", "true");
  }
}
/* =========================================
   🧙‍♂️ ULTIMATE WIZARD V7 (Status + Smooth Calc)
   ========================================= */

// 1. STATUS CHECKER (Updated for Wizard)
function checkAvailability() {
  if (typeof db === "undefined") return;

  db.collection("settings")
    .doc("status")
    .onSnapshot((doc) => {
      if (doc.exists) {
        const state = doc.data().state;

        // A. Update "About Me" Status
        document.querySelectorAll(".status-active").forEach((el) => {
          el.innerText = state === "available" ? "متاح للعمل" : "مشغول حالياً";
          el.style.color = state === "available" ? "#00ff88" : "#ff2e63";
        });

        // B. Update "Wizard" Status (The one above calculator)
        const wizStatus = document.getElementById("wizStatus");
        if (wizStatus) {
          const dot = wizStatus.querySelector(".status-dot");
          const text = wizStatus.querySelector(".status-text");

          if (state === "available") {
            dot.style.background = "#00ff88";
            dot.style.boxShadow = "0 0 10px #00ff88";
            text.innerText = "جاهز لاستلام مشروعك دلوقتى";
            text.style.color = "#00ff88";
          } else {
            dot.style.background = "#ff2e63";
            dot.style.boxShadow = "0 0 10px #ff2e63";
            text.innerText = "مشغول حالياً تقدر تطلب وهرد فاسرع وقت";
            text.style.color = "#ff2e63";
          }
        }
      }
    });
}
// Run Status Check

function initNewWizardSystem() {
  if (typeof db === "undefined") return;

  db.collection("settings")
    .doc("calculator_v3")
    .onSnapshot((doc) => {
      if (!doc.exists) return;
      const data = doc.data();

      // 1. Load Settings
      newWizState.serverLogoPrice = data.logoPrice
        ? Number(data.logoPrice)
        : 1500;
      newWizState.config.fastPercent = data.fastPercent
        ? Number(data.fastPercent)
        : 25;
      newWizState.config.slowPercent = data.slowPercent
        ? Number(data.slowPercent)
        : 10;

      // 2. Update UI Text
      const logoInput = document.querySelector('input[value="Need Design"]');
      if (logoInput)
        logoInput.parentElement.querySelector(
          "span"
        ).innerText = `أحتاج تصميم (+${newWizState.serverLogoPrice})`;

      // Update Time Badges with %
      const fastBadge = document.querySelector(
        '.time-card[onclick*="fast"] .badge'
      );
      const slowBadge = document.querySelector(
        '.time-card[onclick*="relaxed"] .badge'
      );

      if (fastBadge)
        fastBadge.innerText = `زيادة (+${newWizState.config.fastPercent}%)`;
      if (slowBadge)
        slowBadge.innerText = `خصم (-${newWizState.config.slowPercent}%)`;

      // 3. Render Grids (Same as before...)
      renderGrid(
        "newServicesGrid",
        data.services,
        "pop-card type-item",
        "selectNewService"
      );
      // ... rest of render code ...
      if (document.getElementById("newLoader1"))
        document.getElementById("newLoader1").style.display = "none";
      renderGrid("newAddonsGrid", data.addons, "pop-bubble", "toggleNewAddon");
      renderGrid(
        "newVisualsGrid",
        data.visuals,
        "pop-bubble",
        "toggleNewAddon"
      );
    });
}

function renderGrid(id, items, className, clickFunc) {
  const grid = document.getElementById(id);
  if (!grid || !items) return;
  grid.innerHTML = "";

  items.forEach((item) => {
    const icon = item.icon || "fa-star";
    if (className.includes("pop-card")) {
      grid.innerHTML += `
                <div class="${className}" onclick="${clickFunc}('${item.name}', ${item.price}, this)">
                    <i class="fas ${icon}"></i><h4>${item.name}</h4><span class="price-badge">${item.price} ج.م</span>
                </div>`;
    } else {
      grid.innerHTML += `
                <div class="${className}" onclick="${clickFunc}('${item.name}', ${item.price}, this)">
                    <span style="display:flex; align-items:center; gap:8px;"><i class="fas ${icon}"></i> ${item.name}</span><small>+${item.price}</small>
                </div>`;
    }
  });
}
/* =========================================
   🎨 LOGO SELECTION LOGIC (RESTORED)
   ========================================= */
function selectLogoOption(type, dummyPrice, element) {
  // 1. Determine Real Price (Get price from Firebase setting or default 1500)
  const realPrice = type === "need" ? newWizState.serverLogoPrice || 1500 : 0;

  // 2. Update State
  newWizState.logoPrice = realPrice;
  newWizState.logoStatus = type === "need" ? "Need Design" : "Have Logo";

  // 3. UI Updates
  // Remove 'selected' class from all options
  document.querySelectorAll(".logo-option").forEach((el) => {
    el.classList.remove("selected");
    // Uncheck hidden radios
    const radio = el.querySelector("input");
    if (radio) radio.checked = false;
  });

  // Add 'selected' to the clicked element
  element.classList.add("selected");

  // Check the specific radio
  const activeRadio = element.querySelector("input");
  if (activeRadio) activeRadio.checked = true;

  // 4. Recalculate Totals
  calcNewTotal();
}

// 3. SELECTION ACTIONS
function selectNewService(name, price, card) {
  newWizState.basePrice = parseInt(price);
  // Estimate Time: 1 day per 500 EGP + 2 buffer days
  newWizState.baseTime = Math.ceil(parseInt(price) / 500) + 2;
  newWizState.selectedService = { name, price };

  document
    .querySelectorAll(".type-item")
    .forEach((c) => c.classList.remove("active"));
  card.classList.add("active");
  calcNewTotal();
}

function toggleNewAddon(name, price, bubble) {
  price = parseInt(price);
  const timeEst = Math.ceil(price / 1000); // 1 day per 1000 EGP
  const index = newWizState.selectedAddons.findIndex((a) => a.name === name);

  if (index > -1) {
    newWizState.selectedAddons.splice(index, 1);
    newWizState.addonsPrice -= price;
    newWizState.addonsTime -= timeEst;
    bubble.classList.remove("active");
  } else {
    newWizState.selectedAddons.push({ name, price });
    newWizState.addonsPrice += price;
    newWizState.addonsTime += timeEst;
    bubble.classList.add("active");
  }
  calcNewTotal();
}
/* =========================================
   🔧 FIX: LOGO PRICE & TIME LOGIC
   ========================================= */

// 4. ANIMATION ENGINE (Smooth Counter)
let currentDisplayPrice = 0;

/* =========================================
   🚀 FIXED: ANIMATION ENGINE & LOGO LOGIC
   ========================================= */

// 2. The DOM-Based Animator (Prevents Snapping)
function animateValue(obj, start, end, duration) {
  if (start === end) return;

  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    // Easing for smoothness (Start fast, end slow)
    const ease = 1 - Math.pow(1 - progress, 3);

    obj.innerHTML = Math.floor(start + (end - start) * ease);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerHTML = end; // Ensure exact final number
    }
  };
  window.requestAnimationFrame(step);
}

// 5. COLOR PALETTE LOGIC
function togglePaletteColor(el) {
  el.classList.toggle("active");
}

function addCustomPaletteColor(input) {
  const color = input.value;
  const grid = document.getElementById("paletteGrid");
  const div = document.createElement("div");

  div.className = "color-preset active";
  div.style.setProperty("--c", color);
  div.setAttribute("data-color", color);
  div.style.animation = "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

  div.onclick = function () {
    this.classList.toggle("active");
  };

  // Add Remove Button
  div.innerHTML = `<span class="remove-color-btn" onclick="removePaletteColor(event, this)"><i class="fas fa-times"></i></span>`;

  grid.insertBefore(div, document.querySelector(".custom-preset"));
}

function removePaletteColor(e, btn) {
  e.stopPropagation(); // Stop click from toggling parent
  const orb = btn.parentElement;
  orb.style.transform = "scale(0)";
  setTimeout(() => orb.remove(), 200);
}

// Helper to create rows cleaner
function createBillRow(name, price) {
  return `
    <div class="bill-row">
        <span>${name}</span>
        <span>${price}</span>
    </div>`;
}
// 2. WIZARD STATE & LOGIC
let newWizState = {
  step: 1,
  basePrice: 0,
  baseTime: 0,
  addonsPrice: 0,
  addonsTime: 0,
  logoPrice: 0,
  serverLogoPrice: 1500,
  logoStatus: "Have Logo",
  selectedService: null,
  selectedAddons: [],
  // 🔥 NEW: Time Preference
  timeRange: { type: "normal", label: "وقت قياسي", extraCost: 0 },
  // 🔥 CONFIG FOR PERCENTAGES
  config: {
    fastPercent: 25, // Default 25%
    slowPercent: 10, // Default 10%
  },
};

/* REPLACE selectTimeRange WITH THIS */
function selectTimeRange(type, label, dummy, card) {
  // We only store the type now, calculation happens in calcNewTotal
  newWizState.timeRange = { type, label };

  // UI Updates
  document
    .querySelectorAll(".time-card")
    .forEach((el) => el.classList.remove("active"));
  card.classList.add("active");

  calcNewTotal();
}

function calcNewTotal() {
  const pEl = document.getElementById("newLiveTotal");
  const tEl = document.getElementById("newLiveTime");
  const box = document.getElementById("newBouncyBox");

  // 1. Calculate Subtotal (Service + Addons + Logo)
  const subTotal =
    newWizState.basePrice + newWizState.addonsPrice + newWizState.logoPrice;

  // 2. Calculate Time Adjustment (Percentage)
  let timeAdjustment = 0;

  if (newWizState.timeRange.type === "fast") {
    // Example: 25% extra
    timeAdjustment = Math.round(
      subTotal * (newWizState.config.fastPercent / 100)
    );
  } else if (newWizState.timeRange.type === "relaxed") {
    // Example: 10% discount
    timeAdjustment = -Math.round(
      subTotal * (newWizState.config.slowPercent / 100)
    );
  } else {
    // 🛑 ADD THIS ELSE BLOCK TO RESET COST FOR NORMAL TIME
    timeAdjustment = 0;
  }

  // 3. Final Total
  const total = subTotal + timeAdjustment;

  // Store for Bill
  newWizState.finalTimeCost = timeAdjustment;

  // 4. Time Logic
  let time = newWizState.baseTime + newWizState.addonsTime;
  if (newWizState.timeRange.type === "fast")
    time = Math.max(1, Math.ceil(time * 0.7));
  if (newWizState.timeRange.type === "relaxed") time = Math.ceil(time * 1.2);

  // Update UI
  if (pEl) animateValue(pEl, parseInt(pEl.innerText) || 0, total, 500);
  if (tEl) tEl.innerText = time > 0 ? time + " أيام" : "0 أيام";

  if (box) {
    box.style.transform = "scale(1.1)";
    setTimeout(() => (box.style.transform = "scale(1)"), 150);
  }
}

/* --- UPDATED NAVIGATION (7 STEPS) --- */
function navNewWizard(dir) {
  const nextBtn = document.getElementById("btnNewNext");
  const prevBtn = document.getElementById("btnNewPrev");

  // 🔥 UPDATE TOTAL STEPS TO 7
  const totalSteps = 7;

  // Validation for Step 1
  if (newWizState.step === 1 && dir === 1 && !newWizState.selectedService) {
    showCustomAlert("اختر نوع المشروع أولاً!", "تنبيه");
    return;
  }

  // Open Bill on Final Step
  if (newWizState.step === totalSteps && dir === 1) {
    openNewBill();
    return;
  }

  // Slide Animations
  const currentStepEl = document.getElementById(`new-step-${newWizState.step}`);
  currentStepEl.classList.add(dir === 1 ? "anim-out-left" : "anim-out-right");

  setTimeout(() => {
    currentStepEl.style.display = "none";
    currentStepEl.classList.remove("active", "anim-out-left", "anim-out-right");

    newWizState.step += dir;

    const nextStepEl = document.getElementById(`new-step-${newWizState.step}`);
    nextStepEl.style.display = "block";
    nextStepEl.classList.add(dir === 1 ? "anim-in-right" : "anim-in-left");

    setTimeout(() => {
      nextStepEl.classList.remove("anim-in-right", "anim-in-left");
      nextStepEl.classList.add("active");
    }, 300);

    // Update Progress Bar
    document.getElementById("newWizStepNum").innerText = newWizState.step;
    document.getElementById("newWizProgress").style.width =
      (newWizState.step / totalSteps) * 100 + "%";

    prevBtn.disabled = newWizState.step === 1;

    // Change Button Text on Last Step (7)
    if (newWizState.step === totalSteps) {
      nextBtn.innerHTML = `عرض الفاتورة <i class="fas fa-file-invoice-dollar"></i>`;
      nextBtn.style.color = "#ffd700";
      nextBtn.style.borderColor = "#ffd700";
    } else {
      nextBtn.innerHTML = `التالي`;
      nextBtn.style.color = "";
      nextBtn.style.borderColor = "";
    }
  }, 300);
}
/* =========================================
   🧾 OPEN BILL MODAL (RESTORED & FIXED)
   ========================================= */
function openNewBill() {
  const nameInput = document.getElementById("newName");
  const phoneInput = document.getElementById("newPhone");

  // Validation
  if (!nameInput.value || !phoneInput.value) {
    showCustomAlert(
      "يرجى كتابة الاسم ورقم الهاتف في الخطوة الأخيرة!",
      "بيانات ناقصة"
    );
    return;
  }

  // Fill Client Info
  document.getElementById("billCustomerName").innerText = nameInput.value;
  document.getElementById("billCustomerPhone").innerText = phoneInput.value;

  const itemsContainer = document.getElementById("billItems");
  const totalEl = document.getElementById("billTotal");

  itemsContainer.innerHTML = "";

  // 1. Service
  if (newWizState.selectedService) {
    itemsContainer.innerHTML += `
            <div class="bill-row">
                <span><i class="fas fa-cube" style="color:var(--gold-main)"></i> ${newWizState.selectedService.name}</span>
                <span class="gold-text">${newWizState.selectedService.price}</span>
            </div>`;
  }

  // 2. Addons
  newWizState.selectedAddons.forEach((addon) => {
    itemsContainer.innerHTML += `
            <div class="bill-row">
                <span><i class="fas fa-plus-circle" style="color:#888"></i> ${addon.name}</span>
                <span>${addon.price}</span>
            </div>`;
  });

  // 3. Logo
  if (newWizState.logoPrice > 0) {
    itemsContainer.innerHTML += `
            <div class="bill-row">
                <span><i class="fas fa-pen-nib"></i> تصميم شعار</span>
                <span>${newWizState.logoPrice}</span>
            </div>`;
  }

  // 4. Time Preference (Percentage Logic)
  const timeCost = newWizState.finalTimeCost || 0;

  if (timeCost !== 0) {
    const sign = timeCost > 0 ? "+" : "";
    const color = timeCost > 0 ? "#ff2e63" : "#00e5ff"; // Red for extra, Blue for discount
    const percent =
      timeCost > 0
        ? newWizState.config.fastPercent
        : newWizState.config.slowPercent;

    itemsContainer.innerHTML += `
            <div class="bill-row" style="color:${color}">
                <span><i class="fas fa-clock"></i> ${newWizState.timeRange.label} (${percent}%)</span>
                <span>${sign}${timeCost}</span>
            </div>`;
  } else {
    itemsContainer.innerHTML += `
            <div class="bill-row" style="color:#888;">
                <span><i class="fas fa-clock"></i> ${newWizState.timeRange.label}</span>
                <span>مجاناً</span>
            </div>`;
  }

  // 5. Colors (Visuals)
  const colorsContainer = document.getElementById("billColorsContainer");
  const colorsRow = document.getElementById("billColorsRow");
  colorsContainer.innerHTML = "";

  const selectedColors = document.querySelectorAll(".color-preset.active");
  if (selectedColors.length > 0) {
    colorsRow.style.display = "flex";
    selectedColors.forEach((el) => {
      colorsContainer.innerHTML += `<div style="width:15px; height:15px; border-radius:50%; background:${el.getAttribute(
        "data-color"
      )}; border:1px solid #555;"></div>`;
    });
  } else {
    colorsRow.style.display = "none";
  }

  // 6. Final Total
  // Recalculate one last time to be safe
  const subTotal =
    newWizState.basePrice + newWizState.addonsPrice + newWizState.logoPrice;
  const total = subTotal + timeCost;

  totalEl.innerText = total + " ج.م";

  // Show Modal
  document.getElementById("billModal").classList.add("active");
}
/* --- UPDATED WHATSAPP MSG --- */
function confirmOrderOnWhatsApp() {
  const name = document.getElementById("newName").value;
  const phone = document.getElementById("newPhone").value;
  const desc = document.getElementById("newDescription").value;
  const total = document.getElementById("billTotal").innerText;

  // Time Logic
  let days = newWizState.baseTime + newWizState.addonsTime;
  if (newWizState.timeRange.type === "fast") days = Math.ceil(days * 0.7);
  if (newWizState.timeRange.type === "relaxed") days = Math.ceil(days * 1.2);

  let msg =
    `🚀 *طلب جديد (Website)*\n` +
    `👤 ${name}\n📱 ${phone}\n` +
    `📦 الخدمة: ${newWizState.selectedService.name}\n` +
    `🎨 اللوجو: ${newWizState.logoStatus}\n` +
    `⏳ التوقيت: ${newWizState.timeRange.label} (${days} أيام)\n`;

  if (newWizState.selectedAddons.length > 0) {
    msg += `➕ الإضافات:\n`;
    newWizState.selectedAddons.forEach((a) => (msg += `   - ${a.name}\n`));
  }

  msg += `💰 الإجمالي: ${total}\n📝 ${desc}`;

  window.open(
    `https://wa.me/201275944732?text=${encodeURIComponent(msg)}`,
    "_blank"
  );

  // Save to DB (Optional, existing code handles this)
  // ...

  document.getElementById("billModal").classList.remove("active");
  location.reload();
}
/* =========================================
   🚀 SUBMIT ORDER (UPDATED FOR NEW TEMPLATE)
   ========================================= */
async function submitOrderFinal() {
  const nameInput = document.getElementById("newName");
  const phoneInput = document.getElementById("newPhone");
  const emailInput = document.getElementById("newEmail");
  const descInput = document.getElementById("newDescription");
  const btn = document.getElementById("btnSubmitOrder");

  if (!nameInput.value || !phoneInput.value || !emailInput.value) {
    showCustomAlert("يرجى إدخال البيانات المطلوبة!", "بيانات ناقصة");
    return;
  }

  // Loading...
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> جاري الإرسال...';
  btn.style.pointerEvents = "none";
  btn.style.opacity = "0.7";

  // 1. Gather Data
  const selectedColors = [];
  document.querySelectorAll(".color-preset.active").forEach((el) => {
    selectedColors.push(el.getAttribute("data-color"));
  });

  let estimatedDays = newWizState.baseTime + newWizState.addonsTime;
  if (newWizState.timeRange.type === "fast")
    estimatedDays = Math.ceil(estimatedDays * 0.7);
  if (newWizState.timeRange.type === "relaxed")
    estimatedDays = Math.ceil(estimatedDays * 1.2);

  const totalStr = document.getElementById("billTotal").innerText;

  // 2. Create Clean List HTML for the Email
  // This converts the items array into HTML divs for the email template
  const itemsArray = [
    `📦 الخدمة: ${
      newWizState.selectedService ? newWizState.selectedService.name : "None"
    }`,
    ...newWizState.selectedAddons.map((a) => `➕ ${a.name}`),
    newWizState.logoPrice > 0 ? `🎨 لوجو: تصميم جديد` : `🎨 لوجو: متوفر`,
    `🚀 الخطة: ${newWizState.timeRange.label}`,
  ];

  // Join them into HTML string with styles
  const itemsHtmlString = itemsArray
    .map(
      (item) =>
        `<div style="padding: 8px 0; border-bottom: 1px dashed #333;">${item}</div>`
    )
    .join("");

  const orderData = {
    customerName: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    notes: descInput.value,
    service: newWizState.selectedService
      ? newWizState.selectedService.name
      : "Unknown",
    items: itemsArray, // For Firebase (Array)
    total: totalStr,
    time: estimatedDays + " أيام",
    colors: selectedColors,
    status: "pending",
    date: firebase.firestore.FieldValue.serverTimestamp(),
  };

  try {
    // A. Save to Firebase
    await db.collection("orders").add(orderData);

    // B. Send Email via EmailJS (Using the new variables)
    const emailParams = {
      customer_name: orderData.customerName,
      customer_phone: orderData.phone,
      customer_email: orderData.email,
      service_name: orderData.service,
      items_html: itemsHtmlString, // <--- Sending HTML string here
      colors_text:
        selectedColors.length > 0 ? selectedColors.join(", ") : "لا يوجد",
      order_time: orderData.time,
      notes: orderData.notes || "لا توجد ملاحظات",
      total_price: orderData.total,
    };

    // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
    await emailjs.send("service_fuluy6n", "template_rmf5gzu", emailParams);

    showCustomAlert("تم إرسال الطلب بنجاح! سيتم مراجعته.", "تم بنجاح ✅");

    document.getElementById("billModal").classList.remove("active");
    btn.innerHTML = originalText;
    btn.style.pointerEvents = "auto";
    btn.style.opacity = "1";
    setTimeout(() => location.reload(), 2000);
  } catch (error) {
    console.error("Order Error:", error);
    showCustomAlert("حدث خطأ. حاول مرة أخرى.", "خطأ ❌");
    btn.innerHTML = originalText;
    btn.style.pointerEvents = "auto";
    btn.style.opacity = "1";
  }
}
/* =========================================
   🖱️ CUSTOM CONTEXT MENU LOGIC (FIX)
   ========================================= */

const contextMenu = document.getElementById("contextMenu");
const scope = document.querySelector("body");

// 1. Prevent Default & Show Menu
scope.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // Stop default browser menu

  // Calculate position to keep menu within screen
  const { clientX: mouseX, clientY: mouseY } = e;
  const { innerWidth: screenW, innerHeight: screenH } = window;
  const menuW = contextMenu.offsetWidth;
  const menuH = contextMenu.offsetHeight;

  // Check right edge
  const x = mouseX + menuW > screenW ? screenW - menuW - 10 : mouseX;
  // Check bottom edge
  const y = mouseY + menuH > screenH ? screenH - menuH - 10 : mouseY;

  contextMenu.style.top = `${y}px`;
  contextMenu.style.left = `${x}px`;

  // Reset animation
  contextMenu.classList.remove("visible");
  setTimeout(() => {
    contextMenu.classList.add("visible");
  }, 10);
});

// 2. Close Menu on Click
document.addEventListener("click", (e) => {
  if (contextMenu.classList.contains("visible")) {
    contextMenu.classList.remove("visible");
  }
});

// 3. Close on Scroll
window.addEventListener("scroll", () => {
  if (contextMenu.classList.contains("visible")) {
    contextMenu.classList.remove("visible");
  }
});

/* --- MISSING COPY FUNCTIONS (Added) --- */

function copyEmail() {
  // Replace with your actual email
  const email = "contact@kyrillos.com";
  navigator.clipboard
    .writeText(email)
    .then(() => {
      showCustomAlert("تم نسخ البريد الإلكتروني بنجاح!", "نسخ النص");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

function copyLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showCustomAlert("تم نسخ رابط الموقع بنجاح!", "نسخ الرابط");
  });
}

window.addEventListener("load", function () {
  // Force top scroll
  window.scrollTo(0, 0);

  // Init Functions
  loadDynamicProjects();
  loadSocialsFromDB();
  loadProfileImage();
  trackVisit();
  checkAvailability();
  initNewWizardSystem();
  initTagCloud();
  // Init Particles
  const themeColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--gold-main")
    .trim();
  loadParticles(themeColor);
});
// دالة اهتزاز محسنة
function triggerVibration() {
  if (navigator.vibrate) {
    // اهتزاز مزدوج خفيف ليعطي إيحاءً احترافياً
    navigator.vibrate([40, 30, 40]);
  } else {
    console.log("Vibration API not supported on this device/browser.");
  }
}

// تأكد من ربطها بالأزرار بعد تحميل الصفحة تماماً
window.addEventListener("DOMContentLoaded", () => {
  // استهداف كل الأزرار والروابط التفاعلية
  const elements = document.querySelectorAll(
    ".btn-cyber, .nav-icon, .color-btn, .btn"
  );

  elements.forEach((el) => {
    el.addEventListener("click", () => {
      triggerVibration();
      console.log("Vibrated!"); // للتأكد في الكونسول أثناء الفحص
    });
  });
});
async function sharePortfolio() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Kyrillos | Creative Developer",
        text: "شاهد معرض أعمال كيرلس المذهل!",
        url: window.location.href,
      });
      console.log("تمت المشاركة بنجاح");
    } catch (err) {
      console.log("تم إلغاء المشاركة");
    }
  } else {
    // إذا كان المتصفح لا يدعمها (مثل الكمبيوتر) استخدم الكود الموجود عندك فعلياً
    copyLink();
  }
}
window.addEventListener("deviceorientation", (event) => {
  const cards = document.querySelectorAll(".project-card");
  const x = event.beta; // الميل للأمام والخلف
  const y = event.gamma; // الميل لليمين واليسار

  cards.forEach((card) => {
    card.style.transform = `rotateX(${x / 10}deg) rotateY(${y / 10}deg)`;
  });
});
