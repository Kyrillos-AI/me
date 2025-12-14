
/* =========================================
   0. FORCE SCROLL TO TOP (FIX REFRESH ISSUE)
   ========================================= */
// 1. Tell browser to not restore scroll position
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
/* =========================================
   1. LENIS SMOOTH SCROLL (HIGH-END FEEL)
   ========================================= */
const lenis = new Lenis({
    duration: 1.2, // مدة النعومة (كل ما الرقم زاد، النعومة زادت)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // معادلة فيزيائية للحركة
    direction: 'vertical',
    gestureDirection: 'vertical',
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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute('href'));
    });
});
// 2. Force jump to top immediately
window.scrollTo(0, 0);

// 3. Double check when page fully loads
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

/* =========================================
   1🌍 Translation System
   ========================================= */
let currentLang = 'ar'; // اللغة الافتراضية

// 1. قاموس الكلمات (أضف كل كلمات موقعك هنا)
const translations = {
    ar: {
        nav_home: "الرئيسية",
        nav_services: "خدماتي",
        nav_project: "أعمالي",
        nav_contact: "ابدأ مشروعك",
        btn_work: "شاهد إبداعي",
        btn_contact: "تواصل معي",
        hero_contact: "تواصل معي",
        hero_work: "شاهد إبداعي",
        about1: "أنا كيرلس، ",
        about2: "مهندس برمجيات",
        about3: "شغوف بالتفاصيل.",
        addreview: "أضف تقييمك",
        settheme: "اختر ثيم الموقع",
        about4: "لا أقوم فقط بكتابة الكود، بل أصنع تجارب رقمية حية. أدمج بين الفن البرمجي والتصميم الإبداعي لخلق مواقع لا تُنسى.",  
        co_me: "تواصل معي",
        myskills: "مهاراتي التقنية",
        mywork: "احدث اعمالي",
        viewproject: "معاينة المشروع",
        yourname: "الاسـم ",
        email: "البريد الإلكتروني ",
        whatsapp: "رقـم الواتسـاب ",
        yourproject: "تفـاصيل مشـروعـك",
        sendmsg: "إرسال الرسالة",
        credit: "جميع الحقوق محفوظة © 2025 كيرلس",
        p1t: "مـصـر الحـضاره",
        p1i: "موقع متكامل يعرض الاماكن الاثريه",
        p2t: "موقع مطعم فاخر",
        p2i: "قائمة طعام تفاعلية ونظام حجز.",
        p3t: "شركة عقارات",
        p3i: "عرض الوحدات السكنية بشكل احترافي.",
        t1: "من أنا؟",
        l2: "الاسم:",
        l2a: "كيرلس",
        l3: "الخبرة:",
        l3a: "+3 سنوات",
        l4: "الدولة:",
        l4a: "مصر",
        l5: "العمل:",
        l5a: "متاح فريلانسر",
        i1: "مشروع مكتمل",
        i2: "عميل سعيد",
        i3: "جودة وتسليم",
        pt : "رحلة نجاح مشروعك",
        rrc: "آراء العملاء",
        btnloadmore: "عرض المزيد",
        cobtn: "ناقش مشروعك معي",
        faqt: "أسئلة شائعة",
        q6: "ما هي الخدمات التي تقدمها؟",
        a6: "أقدم خدمات تصميم وتطوير مواقع الويب المخصصة، بما في ذلك التصميم المتجاوب، حلول التجارة الإلكترونية، وتحسين محركات البحث لمساعدة عملك على الازدهار عبر الإنترنت.",
        q7: "ما هو الجدول الزمني النموذجي للمشروع؟",
        a7: "تختلف الجداول الزمنية للمشاريع بناءً على التعقيد، ولكنها تتراوح عادةً بين 2 إلى 6 أسابيع. أقدم جدولًا زمنيًا مفصلاً بعد مناقشة متطلباتك المحددة.",
        q8: "هل يمكنني طلب تعديلات لاحقاً؟",
        a8: "نعم، أقدم دعم فني مجاني لمدة أسبوع بعد التسليم لضمان رضاك التام، وأي تعديلات جوهرية يمكن الاتفاق عليها بسهولة.",
        q9: "هل توفر الاستضافة والدومين؟",
        a9: "أنا أساعدك في اختيار وشراء أفضل استضافة تناسب مشروعك، وأقوم بربط الدومين ورفع ملفات الموقع مجاناً كجزء من الخدمة.",
        q10: "كيف يتم الدفع وضمان الحقوق؟",
        a10: "العمل يتم عبر منصات مضمونة مثل (مستقل) أو (خمسات)، حيث تضمن المنصة حق الطرفين ولا يتم تحويل المبلغ إلا بعد استلامك للمشروع كاملاً.",
        q11: "ماذا لو حدث خطأ في الموقع مستقبلاً؟",
        a11: "أكوادنا نظيفة ومستقرة، ولكن في حال حدوث أي خطأ تقني مفاجئ، يمكنك التواصل معي في أي وقت للصيانة الفورية.",
        s1: "التخطيط والتحليل",
        s1a: "فهم متطلباتك بدقة وتحويلها لخطة عمل واضحة لضمان تحقيق أهدافك.",
        s2: "التصميم الإبداعي (UI/UX)",
        s2a: "رسم واجهات عصرية تخطف العين، سهلة الاستخدام، وتناسب هوية مشروعك.",
        s3: "التكويد والتطوير",
        s3a: "تحويل التصميم لموقع حقيقي بكود نظيف، سريع، ومتجاوب مع جميع الشاشات.",
        s4: "التسليم والدعم",
        s4a: "رفع الموقع أونلاين، التأكد من خلوه من الأخطاء، وتقديم دعم فني مستمر.",
        contact_success: "تم استلام رسالتك بنجاح! سأتواصل معك قريباً.",
        // ... أكمل باقي نصوص موقعك هنا بنفس الطريقة
    },
    en: {
        nav_home: "Home",
        nav_services: "Services",
        nav_project: "My Work",
        nav_contact: "Start Project",
        btn_work: "View Work",
        btn_contact: "Contact Me",
        hero_contact: "Contact Me",
        hero_work: "View Work",
        about1: "I'm Kyrillos, ",
        about2: "A Software Engineer",
        about3: "Passionate about details.",
        addreview: "Add Review",
        settheme: "Choose Site Theme",
        about4: "I don't just write code, I craft living digital experiences. I blend coding art with creative design to create unforgettable websites.",
        co_me: "Contact Me",
        myskills: "My Skills",
        mywork: "My Latest Works",
        viewproject: "View Project",
        yourname: "Your Name",
        email: "Email Address",
        whatsapp: "WhatsApp Number",
        yourproject: "Project Details",
        sendmsg: "Send Message",
        credit: "All rights reserved © 2025 Kyrillos",
        p1t: "Egypt Tourism",
        p1i: "A comprehensive site showcasing historical places",
        p2t: "Luxury Restaurant Site",
        p2i: "Interactive menu and reservation system.",
        p3t: "Real Estate Company",
        p3i: "Professional display of housing units.",
        t1: "Who am I?",
        l2: "Name:",
        l2a: "Kyrillos",
        l3: "Experience:",
        l3a: "+3 Years",
        l4: "Country:",
        l4a: "Egypt",
        l5: "Availability:",
        l5a: "Available Freelance",
        i1: "Completed Projects",
        i2: "Happy Clients",
        i3: "Quality & Delivery",
        pt : "Your Project Journey",
        rrc: "Clients Reviews",
        btnloadmore: "Load More",
        cobtn: "Discuss Your Project",
        faqt: "FAQ",
        q6: "What services do you offer?",
        a6: "I offer custom web design and development services, including responsive design, e-commerce solutions, and SEO optimization to help your business thrive online.",
        q7: "What is the typical project timeline?",
        a7: "Project timelines vary based on complexity, but typically range from 2 to 6 weeks. I provide a detailed timeline after discussing your specific requirements.",
        q8: "Can I request revisions later?",
        a8: "Yes, I provide free technical support for one week after delivery to ensure your complete satisfaction, and any substantial revisions can be easily agreed upon.",
        q9: "Do you provide hosting and domain services?",
        a9: "I assist you in selecting and purchasing the best hosting suitable for your project, and I connect the domain and upload the site files for free as part of the service.",
        q10: "How is payment handled and rights ensured?",
        a10: "Work is conducted through secure platforms like (Mostaql) or (Khamsat), where the platform guarantees the rights of both parties and the amount is only transferred after you receive the complete project.",
        q11: "What if an error occurs on the site in the future?",
        a11: "Our codes are clean and stable, but in case of any sudden technical error, you can contact me anytime for immediate maintenance.",
        s1: "Planning & Analysis",
        s1a: "Understanding your requirements precisely and turning them into a clear action plan to ensure your goals are met.",
        s2: "Creative Design (UI/UX)",
        s2a: "Crafting eye-catching, user-friendly interfaces that align with your project's identity.",
        s3: "Coding & Development",
        s3a: "Transforming designs into a real website with clean, fast, and responsive code for all screens.",
        s4: "Delivery & Support",
        s4a: "Launching the website online, ensuring it's error-free, and providing ongoing technical support.",
        contact_success: "Your message has been successfully received! I will get back to you soon."
        
        // ... أكمل الترجمة الإنجليزية هنا
    }
};
// 🌟 الجديد: ترجمة الـ Placeholders 🌟
const placeholders = document.querySelectorAll('[data-lang-placeholder]');
placeholders.forEach(el => {
    const key = el.getAttribute('data-lang-placeholder');
    if (translations[currentLang][key]) {
        el.placeholder = translations[currentLang][key];
    }
});

/* =========================================
   🌍 وظيفة تبديل اللغة (تحديث الزر الجديد)
   ========================================= */
function toggleLanguage() {
    // 1. تبديل اللغة والاتجاه
    const langAr = document.getElementById('lang-ar');
    const langEn = document.getElementById('lang-en');
    
    if (currentLang === 'ar') {
        currentLang = 'en';
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
        langAr.classList.remove('active');
        langEn.classList.add('active');
    } else {
        currentLang = 'ar';
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
        langEn.classList.remove('active');
        langAr.classList.add('active');
    }

    // 2. ترجمة النصوص العادية (التي لها data-lang)
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });

    // 3. 🌟 ترجمة الـ Placeholders (الإصلاح هنا) 🌟
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });

    // 4. تحديث Typed.js (اختياري)
    if (typeof typed !== 'undefined') {
        typed.destroy();
        typed = new Typed('.auto-type', {
            strings: currentLang === 'ar' 
                ? ['مصمم واجهات مبدع.', 'مطور ويب محترف.', 'شريك نجاحك.'] 
                : ['Creative UI Designer.', 'Pro Web Developer.', 'Your Success Partner.'],
            typeSpeed: 100, backSpeed: 50, loop: true
        });
    }
}
/* =========================================
   2. Init Libraries
   ========================================= */
AOS.init({ offset: 120, duration: 1000 });

var typed = new Typed('.auto-type', {
    strings: ['مصمم واجهات مبدع.', 'مطور ويب محترف.', 'شريك نجاحك.'],
    typeSpeed: 100, backSpeed: 50, loop: true
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
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": colorHex },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5 },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": colorHex, "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 3 }
        },
        "interactivity": {
            /* 🛑 التغيير المهم هنا: window بدلاً من canvas 🛑 */
            "detect_on": "window", 
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } } }
        },
        "retina_detect": true
    });
}

/* =========================================
   4. Settings & Theme Logic
   ========================================= */
const settingsBox = document.querySelector('.settings-box');
const root = document.querySelector(':root');
const themeModal = document.getElementById('themeModal');

function openThemeModal() {
    if(themeModal) themeModal.classList.add('active');
}

function closeThemeModal() {
    if(themeModal) themeModal.classList.remove('active');
}

// Close if clicked outside the box
if(themeModal) {
    themeModal.addEventListener('click', (e) => {
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
    measurementId: "G-64M0V7QRPO"
};

// 2. Safety Check: Only initialize if Firebase library is loaded
if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    // Initialize Database
    db = firebase.firestore();
} else {
    console.error("⚠️ Firebase SDK not loaded yet. Database features will be disabled.");
}
function toggleSettings() { 
    if(settingsBox) settingsBox.classList.toggle('open'); 
}

function resetTheme() {
    setTheme('#D4AF37', '#AA8A2E');
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
}

function setTheme(mainColor, darkColor) {
    root.style.setProperty('--gold-main', mainColor);
    root.style.setProperty('--gold-dark', darkColor);
    root.style.setProperty('--gold-rgb', hexToRgb(mainColor)); 
    
    loadParticles(mainColor);
    
    if (event && event.target && event.target.classList.contains('color-btn') && !event.target.classList.contains('reset-btn')) {
        document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }
}
setTheme('#D4AF37', '#AA8A2E');


/* =========================================
   5. NEW SYSTEM PRELOADER (With Percentage)
   ========================================= */
{
    // 1. Lock Scroll & Force Top
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0); 
    
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const percentText = document.querySelector('.loader-percent');
    
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
            if(loaderWrapper) {
                loaderWrapper.classList.add('hidden');
                // 3. Unlock scroll ONLY after loader finishes
                document.body.style.overflow = 'auto'; 
            }
        }
        
        // Update the text
        if(percentText) {
            percentText.innerText = `${load}%`;
        }
    }
}
/* =========================================
   6. UI Logic (Nav & Scroll)
   ========================================= */
const hamburger = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');
if(hamburger) hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));

window.onscroll = function() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    const myBar = document.getElementById("myBar");
    if(myBar) myBar.style.width = scrolled + "%";
};

/* =========================================
   7. Counters
   ========================================= */
const counters = document.querySelectorAll('.counter');
let hasRun = false;
window.addEventListener('scroll', () => {
    const section = document.querySelector('.stats-section');
    if(section) {
        const sectionPos = section.getBoundingClientRect().top;
        if(sectionPos < window.innerHeight / 1.3 && !hasRun){
            counters.forEach(counter => {
                counter.innerText = '0';
                const updateCounter = () => {
                    const target = +counter.getAttribute('data-target');
                    const c = +counter.innerText;
                    const increment = target / 100;
                    if (c < target) {
                        counter.innerText = Math.ceil(c + increment);
                        setTimeout(updateCounter, 20);
                    } else { counter.innerText = target; }
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
const loadMoreBtn = document.getElementById('loadMoreBtn');
if(loadMoreBtn){
    loadMoreBtn.addEventListener('click', () => {
        const grid = document.getElementById('reviewsGrid');
        const cards = grid.querySelectorAll('.review-card');
        const isExpanded = loadMoreBtn.getAttribute('data-expanded') === 'true';

        if (!isExpanded) {
            cards.forEach(card => {
                card.classList.remove('hidden-review'); 
                card.style.display = 'flex'; 
                card.classList.add('aos-animate');
            });
            loadMoreBtn.innerHTML = 'عرض أقل <i class="fas fa-chevron-up"></i>';
            loadMoreBtn.setAttribute('data-expanded', 'true');
        } else {
            cards.forEach((card, index) => {
                if (index >= 3) {
                    card.classList.add('hidden-review');
                    card.style.display = 'none';
                }
            });
            loadMoreBtn.innerHTML = 'عرض المزيد <i class="fas fa-chevron-down"></i>';
            loadMoreBtn.setAttribute('data-expanded', 'false');
            document.querySelector('.testimonials-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

/* =========================================
   9. FAQ Logic
   ========================================= */
document.querySelectorAll(".faq-item").forEach(faq => {
    faq.addEventListener("click", () => {
        document.querySelectorAll(".faq-item").forEach(item => {
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
function showCustomAlert(message, title = "تنبيه", btnText = null, btnLink = null) {
    const alertBox = document.getElementById('customAlert');
    const msgEl = document.getElementById('alertMessage'); // Note: ID in HTML is 'alertMessage'
    const titleEl = document.getElementById('alertTitle');
    const actionBtn = document.getElementById('alertActionBtn');
    
    if(msgEl) msgEl.innerText = message;
    if(titleEl) titleEl.innerText = title;

    // Logic to Show/Hide the WhatsApp Button
    if(actionBtn) {
        if(btnText && btnLink) {
            actionBtn.style.display = 'inline-flex'; // Show button
            actionBtn.innerHTML = `<i class="fab fa-whatsapp"></i> ${btnText}`;
            actionBtn.href = btnLink;
        } else {
            actionBtn.style.display = 'none'; // Hide button
            actionBtn.href = '#';
        }
    }

    if(alertBox) alertBox.classList.add('active');
}
window.closeCustomAlert = function() {
    const alertBox = document.getElementById('customAlert');
    if(alertBox) {
        alertBox.classList.remove('active');
    }
}
/* =========================================
   11. Smart Greeting & Dual Clock
   ========================================= */
function updateSystemStatus() {
    const greetingEl = document.getElementById('greeting-text');
    const heroClock = document.getElementById('live-clock');
    const navClock = document.getElementById('nav-clock');
    
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    let greeting = "";
    if (hours >= 5 && hours < 12) greeting = "نهارك لـذيذ ☀️";
    else if (hours >= 12 && hours < 18) greeting = "صـباح الفـل 🚀";
    else if (hours >= 18 && hours < 22) greeting = "مساء الخير ✨";
    else greeting = "مش هتنام بقي 🌙";
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    let h = hours % 12; h = h ? h : 12; 
    const strH = h < 10 ? '0' + h : h;
    const strM = minutes < 10 ? '0' + minutes : minutes;
    const strS = seconds < 10 ? '0' + seconds : seconds;
    
    if(greetingEl) greetingEl.innerText = greeting;
    if(heroClock) heroClock.innerText = `${strH}:${strM}:${strS} ${ampm}`;
    if(navClock) navClock.innerText = `${strH}:${strM} ${ampm}`;
}

setInterval(updateSystemStatus, 1000);
updateSystemStatus();

window.addEventListener('scroll', () => {
    const heroClockContainer = document.querySelector('.system-status');
    const navClock = document.getElementById('nav-clock');
    
    if (window.scrollY > 300) {
        if(heroClockContainer) heroClockContainer.classList.add('hidden');
        if(navClock) navClock.classList.add('visible');
    } else {
        if(heroClockContainer) heroClockContainer.classList.remove('hidden');
        if(navClock) navClock.classList.remove('visible');
    }
});

/* =========================================
   13. Contact Form (EmailJS)
   ========================================= */
const contactForm = document.querySelector('.contact-form');

if(contactForm){
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        btn.disabled = true;

        const serviceID = 'service_fuluy6n'; 
        const templateID = 'template_bpuf6mt';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                showCustomAlert('تم استلام رسالتك بنجاح! سأتواصل معك قريباً.', 'تم الإرسال ✅');
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, (err) => {
                showCustomAlert('حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.', 'خطأ ❌');
                console.log(JSON.stringify(err));
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
    });
}


// 1. Modal Logic
const reviewModal = document.getElementById('reviewModal');
function openReviewModal() { if(reviewModal) reviewModal.classList.add('active'); }
function closeReviewModal() { if(reviewModal) reviewModal.classList.remove('active'); }

// 2. Rating Logic
function setRating(n) {
    const ratingInput = document.getElementById('reviewRating');
    if(ratingInput) ratingInput.value = n;
    
    const stars = document.querySelectorAll('.rating-select i');
    stars.forEach((s, index) => {
        if(index < n) { s.className = 'fas fa-star'; s.style.color = 'var(--gold-main)'; }
        else { s.className = 'far fa-star'; s.style.color = '#ccc'; }
    });
}

// 3. Add Review
const reviewForm = document.getElementById('addReviewForm');
if(reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewName').value;
        const role = document.getElementById('reviewRole').value;
        const text = document.getElementById('reviewText').value;
        let rating = parseFloat(document.getElementById('reviewRating').value);
        
        // Half star check
        const isHalf = document.getElementById('halfStarCheck');
        if(isHalf && isHalf.checked) rating += 0.5;
        if(rating > 5) rating = 5;

        if(rating == 0) { showCustomAlert("من فضلك اختر عدد النجوم!"); return; }

        const btn = reviewForm.querySelector('button[type="submit"]');
        const oldText = btn.innerText;
        btn.innerText = "جاري النشر...";
        btn.disabled = true;

        db.collection("reviews").add({
            name: name, role: role, text: text, rating: rating, date: new Date()
        }).then(() => {
            showCustomAlert("شكراً لك! تم نشر تقييمك.", "نجاح");
            closeReviewModal();
            reviewForm.reset();
            setRating(0);
            if(isHalf) isHalf.checked = false;
            btn.innerText = oldText;
            btn.disabled = false;
            loadReviews();
        }).catch((error) => {
            console.error("Error: ", error);
            showCustomAlert("حدث خطأ في الاتصال!", "خطأ");
            btn.innerText = oldText;
            btn.disabled = false;
        });
    });
}

// 4. Load Reviews
function loadReviews() {
    const grid = document.getElementById('reviewsGrid');
    if(!grid) return;

    // Remove old Firebase reviews to avoid duplicates
    const addedReviews = grid.querySelectorAll('.added-by-firebase');
    addedReviews.forEach(el => el.remove());

    db.collection("reviews").orderBy("date", "desc").get().then((querySnapshot) => {
        const allDocs = [];
        querySnapshot.forEach((doc) => allDocs.push(doc.data()));

        // Add Firebase reviews to DOM (Prepended)
        allDocs.forEach((data) => {
            let starsHTML = '';
            for(let i=1; i<=5; i++) {
                if(data.rating >= i) starsHTML += '<i class="fas fa-star"></i>';
                else if (data.rating >= i - 0.5) starsHTML += '<i class="fas fa-star-half-alt"></i>';
                else starsHTML += '<i class="far fa-star"></i>';
            }

            const cardHTML = `
                <div class="review-card glass added-by-firebase" data-aos="flip-up">
                    <div class="stars" style="color: var(--gold-main); direction: rtl; display: inline-flex;">${starsHTML}</div>
                    <p>"${data.text}"</p>
                    <div class="client-info">
                        <div class="client-avatar" style="background: var(--gold-main); color: #000;">${data.name.charAt(0).toUpperCase()}</div>
                        <div><h4>${data.name}</h4><span>${data.role}</span></div>
                    </div>
                </div>
            `;
            grid.insertAdjacentHTML('afterbegin', cardHTML);
        });
        
        // Re-calculate visibility for ALL reviews (Hardcoded + Firebase)
        const allCards = grid.querySelectorAll('.review-card');
        allCards.forEach((card, index) => {
            if (index < 3) {
                card.classList.remove('hidden-review');
                card.style.display = 'flex';
            } else {
                card.classList.add('hidden-review');
                card.style.display = 'none';
            }
        });

        if(loadMoreBtn) {
            if(allCards.length <= 3) loadMoreBtn.style.display = 'none';
            else {
                loadMoreBtn.style.display = 'inline-block';
                loadMoreBtn.innerHTML = 'عرض المزيد <i class="fas fa-chevron-down"></i>';
                loadMoreBtn.setAttribute('data-expanded', 'false');
            }
        }
    });
}

if(typeof firebase !== 'undefined') {
    loadReviews();
}
/* =========================================
   17. 3D Tag Cloud Logic (كرة المهارات)
   ========================================= */
const myTags = [
    'HTML5', 'CSS3', 'JavaScript', 'ES6', 'React.js',
    'Firebase', 'Git', 'GitHub', 'SASS', 'Bootstrap',
    'Tailwind', 'Figma', 'Photoshop', 'UI/UX', 'SEO',
    'Responsive', 'Animation', 'JSON', 'API', 'EmailJS'
];

function initTagCloud() {
    const container = document.querySelector('.tag-sphere');
    if (!container) return;

    const radius = 200; // نصف قطر الكرة
    const totalTags = myTags.length;
    const tags = [];

    // إنشاء العناصر
    myTags.forEach((tagText, i) => {
        const tag = document.createElement('span');
        tag.className = 'tag-item';
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
    const wrapper = document.querySelector('.tag-cloud-container');
    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        
        // تغيير السرعة حسب مكان الماوس
        autoRotateY = mouseX * 0.0002;
        autoRotateX = -mouseY * 0.0002;
    });
    
    // عند خروج الماوس، العودة للسرعة الهادئة
    wrapper.addEventListener('mouseleave', () => {
        autoRotateX = 0.002;
        autoRotateY = 0.002;
    });

    updateSphere();
}

// تشغيل بعد التحميل
window.addEventListener('load', initTagCloud);
/* =========================================
   16. Hacker Cursor Logic
   ========================================= */
const hackerChars = "01{}[]<>/*-+!@#$k"; // الرموز اللي هتظهر

document.addEventListener('mousemove', function(e) {
    // عشان ميعملش زحمة، بنشغل الكود مرة كل شوية حركات
    if (Math.random() < 0.50) return; // 15% بس من الحركات بتعمل رقم

    const char = document.createElement('span');
    char.innerText = hackerChars[Math.floor(Math.random() * hackerChars.length)];
    char.className = 'hacker-char';
    
    // مكان الماوس
    char.style.left = e.clientX + 'px';
    char.style.top = e.clientY + 'px';
    
    // لون الثيم الحالي (عشان يليق مع الموقع)
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--gold-main').trim();
    char.style.color = themeColor;

    // حجم عشوائي لزوم الواقعية
    char.style.fontSize = (Math.random() * 10 + 10) + 'px';

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
    if (card.classList.contains('active')) {
        card.classList.remove('active');
        basePrice = 0; // Reset base price
        updateTotal();
        return; 
    }

    basePrice = price;

    // Remove Active from other project types
    const allTypes = document.querySelectorAll('.type-item');
    allTypes.forEach(c => c.classList.remove('active'));

    // Activate clicked card
    card.classList.add('active');

    updateTotal();
}

function toggleAddon(price, bubble) {
    bubble.classList.toggle('active');

    if (bubble.classList.contains('active')) {
        addonsPrice += price;
    } else {
        addonsPrice -= price;
    }
    updateTotal();
}

function updateTotal() {
    const totalElement = document.getElementById('totalPrice');
    const priceContainer = document.querySelector('.bouncy-price');
    const targetTotal = basePrice + addonsPrice;

    if (priceInterval) clearInterval(priceInterval);

    // Bounce animation
    if(priceContainer) {
        priceContainer.style.transform = "scale(1.2)";
        setTimeout(() => { priceContainer.style.transform = "scale(1)"; }, 200);
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
    const billModal = document.getElementById('billModal');
    const billItemsContainer = document.getElementById('billItems');
    const billTotalEl = document.getElementById('billTotal');
    
    // 1. Get Active Items
    const activeProject = document.querySelector('.type-item.active');
    const activeAddons = document.querySelectorAll('.pop-bubble.active');

    if (!activeProject && activeAddons.length === 0) {
        showCustomAlert('من فضلك اختر خدمة واحدة على الأقل!', 'السلة فارغة');
        return;
    }

    // 2. Lock Background Scroll (Important!)
    document.body.style.overflow = 'hidden';

    // 3. Reset Bill
    billItemsContainer.innerHTML = '';
    let finalBillTotal = 0;

    // --- NEW: Add Date & Time Header ---
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB'); // DD/MM/YYYY
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    billItemsContainer.innerHTML += `
        <div class="bill-row" style="opacity: 0.6; font-size: 0.75rem; border-bottom: 1px solid #333; margin-bottom: 10px; padding-bottom: 8px; justify-content: center; gap: 15px;">
           <span>📅 ${dateStr}</span>
           <span>⏰ ${timeStr}</span>
        </div>
    `;

    // 4. Add Main Project (With Correct Icon)
    if (activeProject) {
        const projName = activeProject.querySelector('h4').innerText;
        const projPriceText = activeProject.querySelector('.price-badge').innerText;
        const projPriceVal = parseInt(projPriceText.replace(/[^0-9]/g, ''));
        
        // 🔥 GRAB ICON: Find the <i> tag inside the active card
        const iconClass = activeProject.querySelector('i').className; 

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
        if(!activeProject) {
             billItemsContainer.innerHTML += `<div class="bill-row" style="border:none; color:#666; font-size:0.75rem; justify-content:center;">-- خدمات إضافية --</div>`;
        }

        activeAddons.forEach(addon => {
            // Get Name (Clean up the text inside)
            // Depending on your HTML, the text might be inside a span or direct
            const nameSpan = addon.querySelector('span'); 
            const addonName = nameSpan ? nameSpan.innerText.trim() : addon.innerText.replace(/[0-9]/g, '').trim();

            const addonPriceText = addon.querySelector('small').innerText;
            const addonPriceVal = parseInt(addonPriceText.replace(/[^0-9]/g, ''));
            
            // 🔥 GRAB ICON
            const addonIconClass = addon.querySelector('i').className;

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
    billModal.classList.add('active');
}

// Ensure Close Function unlocks scroll
function closeBill() {
    document.getElementById('billModal').classList.remove('active');
    document.body.style.overflow = 'auto'; // Unlock scroll
}
/* =========================================
   🔥 SYSTEM: DYNAMIC PROJECTS LOADER (WITH LOAD MORE) 🔥
   ========================================= */
function loadDynamicProjects() {
    const grid = document.querySelector('.projects-grid'); 
    
    if(!grid) return;

    if (typeof db === 'undefined') {
        console.error("Firebase DB is not initialized.");
        return;
    }

    // 1. Get Data from Firebase
    db.collection("projects").orderBy("date", "desc").onSnapshot((snapshot) => {
        
        grid.innerHTML = ""; // Clear existing content
        
        // 2. Setup Variables
        const visibleLimit = 3; // Number of projects to show initially
        const allDocs = snapshot.docs;
        
        // 3. Loop through projects
        allDocs.forEach((doc, index) => {
            const data = doc.data();
            
            // If index is 3 or more, hide it initially
            const isHidden = index >= visibleLimit ? 'style="display:none"' : '';
            const hiddenClass = index >= visibleLimit ? 'hidden-project' : '';

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
            
            grid.insertAdjacentHTML('beforeend', projectHTML);
        });

        // 4. Manage "Load More" Button
        // Remove old button if exists to avoid duplicates
        const oldBtn = document.getElementById('projectLoadBtnContainer');
        if(oldBtn) oldBtn.remove();

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
            grid.parentNode.insertBefore(new DOMParser().parseFromString(btnHTML, 'text/html').body.firstChild, grid.nextSibling);
        }

        // Re-init animations
        if(typeof AOS !== 'undefined') setTimeout(() => AOS.refresh(), 500);
        if(typeof VanillaTilt !== 'undefined') VanillaTilt.init(document.querySelectorAll(".project-card"));
    });
}

// 5. Function to Reveal Hidden Projects (Called by the button)
function revealProjects(btn) {
    const hiddenCards = document.querySelectorAll('.hidden-project');
    
    hiddenCards.forEach(card => {
        card.style.display = 'block'; // Show card
        card.classList.remove('hidden-project');
        card.classList.add('aos-animate'); // Trigger animation
    });

    btn.style.display = 'none'; // Hide button after clicking
}

// Run on load
window.addEventListener('load', loadDynamicProjects);
/* =========================================
   🔗 تحميل روابط السوشيال (Dynamic Socials) - FIXED
   ========================================= */
function loadSocialsFromDB() {
    // التأكد من أن قاعدة البيانات تعمل
    if (typeof db === 'undefined') {
        console.error("Firebase DB not initialized in script.js");
        return;
    }

    db.collection("settings").doc("socials").get().then((doc) => {
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
            updateLink('heroFb', data.facebook);
            updateLink('heroInsta', data.instagram);
            updateLink('heroWa', data.whatsapp);
            updateLink('heroTiktok', data.tiktok);
            updateLink('heroGit', data.github);

            // 2. تحديث أيقونات الفوتر (تم تفعيلها الآن)
            updateLink('footerFb', data.facebook);
            updateLink('footerInsta', data.instagram);
            updateLink('footerWa', data.whatsapp); // تأكد إنك غيرت الـ ID في HTML لـ footerWa
            updateLink('footerGit', data.github);
            
            console.log("Social links updated form DB");
        }
    }).catch(error => {
        console.log("Error getting socials:", error);
    });
}

// تشغيل الدالة
window.addEventListener('load', loadSocialsFromDB);
/* --- Load Custom Profile Image --- */
function loadProfileImage() {
    if (typeof db === 'undefined') return;

    db.collection("settings").doc("profile").onSnapshot((doc) => {
        const imgEl = document.getElementById('aboutProfileImg');
        if (doc.exists && doc.data().isCustom && doc.data().image) {
            if(imgEl) imgEl.src = doc.data().image;
        } else {
            // Revert to default if deleted
            if(imgEl) imgEl.src = "myphoto.png"; 
        }
    });
}
window.addEventListener('load', loadProfileImage);

/* =========================================
   🕵️‍♂️ VISITOR TRACKING & STATUS CHECK
   ========================================= */

// 1. Increment Visitor Count (Run once per session)
function trackVisit() {
    // Check if we already counted this user in this session
    if (!sessionStorage.getItem('visited')) {
        const increment = firebase.firestore.FieldValue.increment(1);
        db.collection("stats").doc("visits").set({
            count: increment
        }, { merge: true });
        
        sessionStorage.setItem('visited', 'true');
    }
}

/* =========================================
   🧙‍♂️ ULTIMATE WIZARD V7 (Status + Smooth Calc)
   ========================================= */

// 1. STATUS CHECKER (Updated for Wizard)
function checkAvailability() {
    if (typeof db === 'undefined') return;

    db.collection("settings").doc("status").onSnapshot((doc) => {
        if (doc.exists) {
            const state = doc.data().state;
            
            // A. Update "About Me" Status
            document.querySelectorAll('.status-active').forEach(el => {
                el.innerText = state === 'available' ? "متاح للعمل" : "مشغول حالياً";
                el.style.color = state === 'available' ? "#00ff88" : "#ff2e63";
            });

            // B. Update "Wizard" Status (The one above calculator)
            const wizStatus = document.getElementById('wizStatus');
            if(wizStatus) {
                const dot = wizStatus.querySelector('.status-dot');
                const text = wizStatus.querySelector('.status-text');
                
                if (state === 'available') {
                    dot.style.background = "#00ff88"; dot.style.boxShadow = "0 0 10px #00ff88";
                    text.innerText = "النظام متاح لاستقبال مشاريع جديدة"; text.style.color = "#00ff88";
                } else {
                    dot.style.background = "#ff2e63"; dot.style.boxShadow = "0 0 10px #ff2e63";
                    text.innerText = "النظام مشغول حالياً (قائمة الانتظار)"; text.style.color = "#ff2e63";
                }
            }
        }
    });
}
// Run Status Check
window.addEventListener('load', checkAvailability);


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
};

function initNewWizardSystem() {
    if (typeof db === 'undefined') return;

    db.collection("settings").doc("calculator_v3").onSnapshot((doc) => {
        if (!doc.exists) return;
        const data = doc.data();

        // A. Logo Price
        const adminPrice = data.logoPrice ? Number(data.logoPrice) : 1500;
        newWizState.serverLogoPrice = adminPrice;
        
        // Update Label Text
        const logoInput = document.querySelector('input[value="Need Design"]');
        if(logoInput) logoInput.parentElement.querySelector('span').innerText = `أحتاج تصميم (+${adminPrice})`;

        // B. Services
        renderGrid('newServicesGrid', data.services, 'pop-card type-item', 'selectNewService');
        const l1 = document.getElementById('newLoader1'); if(l1) l1.style.display = 'none';

        // C. Addons
        renderGrid('newAddonsGrid', data.addons, 'pop-bubble', 'toggleNewAddon');
        const l3 = document.getElementById('newLoader3'); if(l3) l3.style.display = 'none';

        // D. Visuals
        renderGrid('newVisualsGrid', data.visuals, 'pop-bubble', 'toggleNewAddon');
    });
}
window.addEventListener('load', initNewWizardSystem);

function renderGrid(id, items, className, clickFunc) {
    const grid = document.getElementById(id);
    if (!grid || !items) return;
    grid.innerHTML = '';
    
    items.forEach(item => {
        const icon = item.icon || 'fa-star';
        if(className.includes('pop-card')) {
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

// 3. SELECTION ACTIONS
function selectNewService(name, price, card) {
    newWizState.basePrice = parseInt(price);
    // Estimate Time: 1 day per 500 EGP + 2 buffer days
    newWizState.baseTime = Math.ceil(parseInt(price) / 500) + 2; 
    newWizState.selectedService = { name, price };
    
    document.querySelectorAll('.type-item').forEach(c => c.classList.remove('active'));
    card.classList.add('active'); 
    calcNewTotal();
}

function toggleNewAddon(name, price, bubble) {
    price = parseInt(price);
    const timeEst = Math.ceil(price / 1000); // 1 day per 1000 EGP
    const index = newWizState.selectedAddons.findIndex(a => a.name === name);

    if (index > -1) { 
        newWizState.selectedAddons.splice(index, 1);
        newWizState.addonsPrice -= price;
        newWizState.addonsTime -= timeEst;
        bubble.classList.remove('active');
    } else { 
        newWizState.selectedAddons.push({ name, price });
        newWizState.addonsPrice += price;
        newWizState.addonsTime += timeEst;
        bubble.classList.add('active');
    }
    calcNewTotal();
}
/* =========================================
   🔧 FIX: LOGO PRICE & TIME LOGIC
   ========================================= */

function selectLogoOption(type, dummyPrice, element) {
    const realPrice = (type === 'need') ? newWizState.serverLogoPrice : 0;
    
    // Check if we are switching TO 'need' FROM 'have'
    if (type === 'need' && newWizState.logoStatus !== "يحتاج تصميم") {
        newWizState.addonsTime += 2; // Add time only once
        newWizState.logoStatus = "يحتاج تصميم";
    } 
    // Check if switching BACK to 'have'
    else if (type === 'have' && newWizState.logoStatus === "يحتاج تصميم") {
        newWizState.addonsTime -= 2; // Remove time
        newWizState.logoStatus = "لديه شعار";
    }
    
    // Update Price
    newWizState.logoPrice = realPrice;
    
    // Visual Update
    document.querySelectorAll('.logo-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    
    // Trigger Calculation (This runs the smooth animation)
    calcNewTotal();
}
// 4. ANIMATION ENGINE (Smooth Counter)
let currentDisplayPrice = 0;

/* =========================================
   🚀 FIXED: ANIMATION ENGINE & LOGO LOGIC
   ========================================= */

// 1. Calculate & Animate
function calcNewTotal() {
    // Calculate targets
    const targetPrice = newWizState.basePrice + newWizState.addonsPrice + newWizState.logoPrice;
    const targetTime = newWizState.baseTime + newWizState.addonsTime;
    
    // Elements
    const pEl = document.getElementById('newLiveTotal');
    const tEl = document.getElementById('newLiveTime');
    const box = document.getElementById('newBouncyBox');
    
    // A. Animate Price (Read start value from DOM)
    if(pEl) {
        const currentPrice = parseInt(pEl.innerText.replace(/\D/g, '')) || 0; // Read current number
        animateValue(pEl, currentPrice, targetPrice, 600);
    }

    // B. Update Time
    if(tEl) tEl.innerText = targetTime > 0 ? targetTime + " أيام (تقريباً)" : "0 أيام";

    // C. Bounce Effect
    if(box) { 
        box.style.transform = "scale(1.2)"; 
        setTimeout(() => box.style.transform = "scale(1)", 150); 
    }
}

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

// 3. Fixed Logo Selector (Prevents Time Accumulation)
function selectLogoOption(type, dummyPrice, element) {
    const realPrice = (type === 'need') ? newWizState.serverLogoPrice : 0;
    
    // Check if we are switching TO 'need' FROM 'have'
    if (type === 'need' && newWizState.logoStatus !== "يحتاج تصميم") {
        newWizState.addonsTime += 2; // Add time only once
        newWizState.logoStatus = "يحتاج تصميم";
    } 
    // Check if switching BACK to 'have'
    else if (type === 'have' && newWizState.logoStatus === "يحتاج تصميم") {
        newWizState.addonsTime -= 2; // Remove time
        newWizState.logoStatus = "لديه شعار";
    }
    
    // Update Price
    newWizState.logoPrice = realPrice;
    
    // Visual Update
    document.querySelectorAll('.logo-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    element.querySelector('input').checked = true;
    
    // Trigger Calculation
    calcNewTotal();
}

// 5. COLOR PALETTE LOGIC
function togglePaletteColor(el) { el.classList.toggle('active'); }

function addCustomPaletteColor(input) {
    const color = input.value;
    const grid = document.getElementById('paletteGrid');
    const div = document.createElement('div');
    
    div.className = 'color-preset active';
    div.style.setProperty('--c', color);
    div.setAttribute('data-color', color);
    div.style.animation = "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    
    div.onclick = function() { this.classList.toggle('active'); };
    
    // Add Remove Button
    div.innerHTML = `<span class="remove-color-btn" onclick="removePaletteColor(event, this)"><i class="fas fa-times"></i></span>`;
    
    grid.insertBefore(div, document.querySelector('.custom-preset'));
}

function removePaletteColor(e, btn) {
    e.stopPropagation(); // Stop click from toggling parent
    const orb = btn.parentElement;
    orb.style.transform = "scale(0)";
    setTimeout(() => orb.remove(), 200);
}

/* =========================================
   🚀 ANIMATED NAVIGATION FUNCTION
   ========================================= */
function navNewWizard(dir) {
    const nextBtn = document.getElementById('btnNewNext');
    const prevBtn = document.getElementById('btnNewPrev');

    // 1. Validation Check
    if (newWizState.step === 1 && dir === 1 && !newWizState.selectedService) {
        showCustomAlert("اختر نوع المشروع أولاً!", "تنبيه"); return;
    }
    
    // 2. Submit Check
    if (newWizState.step === 5 && dir === 1) {
        submitNewOrder(); return;
    }

    // --- ANIMATION LOGIC START ---
    
    const currentStepEl = document.getElementById(`new-step-${newWizState.step}`);
    
    // A. Apply Exit Animation
    if (dir === 1) {
        currentStepEl.classList.add('anim-out-left'); // Slide out to left
    } else {
        currentStepEl.classList.add('anim-out-right'); // Slide out to right
    }

    // B. Wait for animation to finish (400ms), then swap
    setTimeout(() => {
        // Hide Old
        currentStepEl.style.display = 'none';
        currentStepEl.classList.remove('active', 'anim-out-left', 'anim-out-right');

        // Increment/Decrement Step
        newWizState.step += dir;
        
        // Show New
        const nextStepEl = document.getElementById(`new-step-${newWizState.step}`);
        nextStepEl.style.display = 'block';
        
        // Apply Enter Animation
        if (dir === 1) {
            nextStepEl.classList.add('anim-in-right'); // Enter from right
        } else {
            nextStepEl.classList.add('anim-in-left'); // Enter from left
        }
        
        // Cleanup after animation finishes
        setTimeout(() => {
            nextStepEl.classList.remove('anim-in-right', 'anim-in-left');
            nextStepEl.classList.add('active'); 
        }, 500);

        // Update UI (Progress & Buttons)
        document.getElementById('newWizStepNum').innerText = newWizState.step;
        document.getElementById('newWizProgress').style.width = (newWizState.step / 5) * 100 + "%";
        
        prevBtn.disabled = (newWizState.step === 1);
        
        if (newWizState.step === 5) {
            nextBtn.innerHTML = `إرسال واتساب <i class="fab fa-whatsapp"></i>`;
            nextBtn.style.color = "#00ff88";
            nextBtn.style.borderColor = "#00ff88";
        } else {
            nextBtn.innerHTML = `التالي`;
            nextBtn.style.color = "";
            nextBtn.style.borderColor = "";
        }

    }, 400); // ⏱️ Wait time
}
function submitNewOrder() {
    const name = document.getElementById('newName').value;
    const phone = document.getElementById('newPhone').value;
    const desc = document.getElementById('newDescription').value;

    if (!name || !phone) { showCustomAlert("اكتب الاسم ورقم الهاتف!", "ناقص"); return; }

    const colors = [];
    document.querySelectorAll('.color-preset.active').forEach(el => colors.push(el.getAttribute('data-color')));
    
    const total = document.getElementById('newLiveTotal').innerText + " ج.م";
    const time = document.getElementById('newLiveTime').innerText;
    
    const items = [
        `📦 مشروع: ${newWizState.selectedService.name}`, 
        `🎨 اللوجو: ${newWizState.logoStatus}`,
        ...newWizState.selectedAddons.map(a => `➕ ${a.name}`)
    ];

    const btn = document.getElementById('btnNewNext');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; btn.disabled = true;

    db.collection("orders").add({
        customerName: name, phone: phone, client: `${name} (${phone})`,
        items: items, total: total, time: time, date: new Date(), status: 'pending', notes: desc
    }).then(() => {
        let msg = `🚀 *طلب جديد (Website)*\n👤 ${name}\n📱 ${phone}\n` +
                  `📦 ${newWizState.selectedService.name}\n` +
                  `🎨 اللوجو: ${newWizState.logoStatus}\n`;
        
        if (newWizState.selectedAddons.length > 0) {
            msg += `✨ الإضافات:\n`;
            newWizState.selectedAddons.forEach(a => msg += `   - ${a.name}\n`);
        }
        if (colors.length > 0) msg += `🖌️ ألوان مفضلة: (صورة مرفقة)\n`;
        
        msg += `⏳ الوقت: ${time}\n💰 الإجمالي: ${total}\n📝 ${desc}`;

        window.open(`https://wa.me/201275944732?text=${encodeURIComponent(msg)}`, '_blank');
        location.reload();
    });
}
/* =========================================
   🔥 SMART ORDER SYSTEM (FINAL FIXED VERSION)
   ========================================= */
function confirmOrderOnWhatsApp() {
    // 1. Get Values
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    
    // Validation
    if(!name || !phone) {
        showCustomAlert("من فضلك ادخل الاسم ورقم الهاتف!", "بيانات ناقصة");
        return;
    }

    const confirmBtn = document.querySelector('.bill-footer .btn');
    const oldText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';
    confirmBtn.disabled = true;

    // 2. Collect Data
    const totalText = document.getElementById('billTotal').innerText;
    const items = [];
    document.querySelectorAll('#billItems .bill-row').forEach(row => {
        if(!row.innerText.includes('📅')) {
            items.push(row.innerText.replace(/\n/g, ' ').trim());
        }
    });

    // 3. Save to Firebase
    db.collection("orders").add({
        customerName: name,
        phone: phone,
        client: name + " (" + phone + ")",
        items: items,
        total: totalText,
        date: new Date(),
        status: 'pending'
    }).then(() => {
        
        // Increment Counter
        const increment = firebase.firestore.FieldValue.increment(1);
        db.collection("stats").doc("orders_received").set({ count: increment }, { merge: true });

        // 4. Generate Link
        const waMessage = `*طلب جديد من:* ${name}\n` +
                          `*رقم الهاتف:* ${phone}\n` +
                          `*الإجمالي:* ${totalText}\n` +
                          `------------------\n` +
                          items.join('\n');
        
        const url = `https://wa.me/201275944732?text=${encodeURIComponent(waMessage)}`;

        // Reset UI
        confirmBtn.innerHTML = oldText;
        confirmBtn.disabled = false;
        
        closeBill(); // Close bill modal

        // ✅ SHOW ALERT WITH BUTTON
        showCustomAlert(
            "تم حفظ الطلب بنجاح! اضغط بالأسفل لإرسال التفاصيل.", 
            "نجاح العملية ✅", 
            "إرسال واتساب", 
            url
        );

    }).catch((error) => {
        console.error("Order Error:", error);
        showCustomAlert("حدث خطأ في الاتصال", "خطأ");
        confirmBtn.innerHTML = oldText;
        confirmBtn.disabled = false;
    });
}
