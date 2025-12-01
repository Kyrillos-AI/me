
/* =========================================
   2. تهيئة المكتبات (AOS & Typed)
   ========================================= */
AOS.init({ offset: 120, duration: 1000 });

var typed = new Typed('.auto-type', {
    strings: ['مصمم واجهات مبدع.', 'مطور ويب محترف.', 'شريك نجاحك.'],
    typeSpeed: 100, backSpeed: 50, loop: true
});

/* =========================================
   3. إدارة البارتكلز (الإصلاح الجذري: Destroy)
   ========================================= */
function loadParticles(colorHex) {
    // 🛑 تنظيف الذاكرة القديمة لمنع الشاشة السوداء 🛑
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }

    // تشغيل النسخة الجديدة
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": colorHex }, /* اللون المتغير */
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5 },
            "size": { "value": 3, "random": true },
            "line_linked": { 
                "enable": true, 
                "distance": 150, 
                "color": colorHex, /* الخطوط تأخذ نفس اللون */
                "opacity": 0.4, 
                "width": 1 
            },
            "move": { "enable": true, "speed": 3 }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } } }
        },
        "retina_detect": true
    });
}

/* =========================================
   4. إدارة الثيمات والألوان (Settings Logic)
   ========================================= */
const settingsBox = document.querySelector('.settings-box');
const root = document.querySelector(':root');

function toggleSettings() { 
    if(settingsBox) settingsBox.classList.toggle('open'); 
}

function resetTheme() {
    setTheme('#D4AF37', '#AA8A2E');
    // إزالة التحديد من الأزرار
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
}

function setTheme(mainColor, darkColor) {
    // 1. تغيير متغيرات CSS (النصوص، الأزرار)
    root.style.setProperty('--gold-main', mainColor);
    root.style.setProperty('--gold-dark', darkColor);
    
    // 2. تغيير لون الوهج والشفافية (مهم جداً)
    root.style.setProperty('--gold-rgb', hexToRgb(mainColor)); 
    
    // 3. إعادة بناء البارتكلز باللون الجديد
    loadParticles(mainColor);
    
    // 4. تحديث حالة الزر النشط
    if (event && event.target && event.target.classList.contains('color-btn') && !event.target.classList.contains('reset-btn')) {
        document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }
}

// تشغيل الثيم الافتراضي عند الفتح
setTheme('#D4AF37', '#AA8A2E');

/* =========================================
   5. شاشة التحميل (System Boot)
   ========================================= */
if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);
document.body.style.overflow = 'hidden';

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const percentText = document.getElementById('loading-percent');
    const loadingBar = document.querySelector('.loading-bar');
    const statusText = document.getElementById('loading-status');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 2;
        if (progress > 100) progress = 100;
        
        if (percentText) percentText.innerText = progress + "%";
        if (loadingBar) loadingBar.style.width = progress + "%";

        if(progress > 30 && statusText) statusText.innerText = "LOADING ASSETS...";
        if(progress > 70 && statusText) statusText.innerText = "CONFIGURING UI...";
        if(progress === 100) {
            if(statusText) {
                statusText.innerText = "SYSTEM READY";
                statusText.style.color = "#fff";
            }
            clearInterval(interval);
            setTimeout(() => {
                if(preloader) preloader.classList.add('loaded');
                document.body.style.overflow = 'visible';
            }, 800);
        }
    }, 50);
});

/* =========================================
   6. القوائم والموبايل (Mobile Menu)
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
   7. عداد الأرقام (Counters)
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
   8. المزيد من التقييمات (Load More)
   ========================================= */
const loadMoreBtn = document.getElementById('loadMoreBtn');
if(loadMoreBtn){
    loadMoreBtn.addEventListener('click', () => {
        document.querySelectorAll('.hidden-review').forEach(r => {
            r.classList.remove('hidden-review');
            r.classList.add('aos-animate');
        });
        loadMoreBtn.style.display = 'none';
    });
}

/* =========================================
   9. الأسئلة الشائعة (FAQ)
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
   10. التنبيهات وقائمة كليك يمين (UX)
   ========================================= */
const customAlert = document.getElementById('customAlert');
const alertMsg = document.getElementById('alertMessage');
const alertTitle = document.getElementById('alertTitle');

function showCustomAlert(message, title = "تنبيه النظام") {
    if(alertMsg) alertMsg.innerText = message;
    if(alertTitle) alertTitle.innerText = title;
    if(customAlert) customAlert.classList.add('active');
}
function closeCustomAlert() { 
    if(customAlert) customAlert.classList.remove('active'); 
}
if(customAlert) customAlert.addEventListener('click', (e) => { if (e.target === customAlert) closeCustomAlert(); });

const contextMenu = document.getElementById("contextMenu");
document.body.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if(contextMenu) {
        const { clientX: mouseX, clientY: mouseY } = event;
        const menuWidth = contextMenu.offsetWidth || 200;
        const menuHeight = contextMenu.offsetHeight || 300;
        
        if (mouseX + menuWidth > window.innerWidth) contextMenu.style.left = `${mouseX - menuWidth}px`;
        else contextMenu.style.left = `${mouseX}px`;
        
        if (mouseY + menuHeight > window.innerHeight) contextMenu.style.top = `${mouseY - menuHeight}px`;
        else contextMenu.style.top = `${mouseY}px`;
        
        contextMenu.classList.add("visible");
    }
});

document.body.addEventListener("click", (e) => {
    if (contextMenu && e.target.offsetParent != contextMenu) contextMenu.classList.remove("visible");
});

function copyEmail() {
    navigator.clipboard.writeText("email@example.com");
    showCustomAlert("تم نسخ البريد الإلكتروني بنجاح!", "عملية ناجحة");
}
function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    showCustomAlert("تم نسخ رابط الموقع بنجاح!", "مشاركة الرابط");
}

/* =========================================
   11. الساعة المزدوجة والترحيب (Clock Logic)
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
    if (hours >= 5 && hours < 12) greeting = "صباح الخير ☀️";
    else if (hours >= 12 && hours < 18) greeting = "طاب يومك 🚀";
    else if (hours >= 18 && hours < 22) greeting = "مساء الخير ✨";
    else greeting = "ساهر الليل 🌙";
    
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

/* =========================================
   12. حركة الساعة مع السكرول
   ========================================= */
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
   13. خدعة عنوان التبويب
   ========================================= */
let docTitle = document.title;
window.addEventListener("blur", () => { document.title = "🥺 لا ترحل!"; });
window.addEventListener("focus", () => {
    document.title = "🔥 أهلاً بك مجدداً";
    setTimeout(() => { document.title = docTitle; }, 2000);
});
/* === Contact Form Logic (EmailJS) === */
const contactForm = document.querySelector('.contact-form');

if(contactForm){
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // منع إعادة تحميل الصفحة
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        // تغيير شكل الزرار أثناء الإرسال
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        btn.disabled = true;

        // إرسال البيانات (استبدل الـ IDs باللي جبتهم من الموقع)
        const serviceID = 'service_fuluy6n';
        const templateID = 'template_bpuf6mt';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                showCustomAlert('تم استلام رسالتك بنجاح! سأتواصل معك قريباً.', 'تم الإرسال ✅');
                contactForm.reset(); // مسح الحقول
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
/* === Firebase Logic (Reviews) === */
// ⚠️ انسخ إعداداتك من موقع Firebase وحطها هنا
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

// تهيئة فايربيس
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 1. فتح وقفل المودال
const reviewModal = document.getElementById('reviewModal');
function openReviewModal() { reviewModal.classList.add('active'); }
function closeReviewModal() { reviewModal.classList.remove('active'); }

// 2. اختيار النجوم
function setRating(n) {
    document.getElementById('reviewRating').value = n;
    const stars = document.querySelectorAll('.rating-select i');
    stars.forEach((s, index) => {
        if(index < n) { s.className = 'fas fa-star'; s.style.color = 'var(--gold-main)'; }
        else { s.className = 'far fa-star'; s.style.color = '#ccc'; }
    });
}

// 3. حفظ التقييم في قاعدة البيانات
document.getElementById('addReviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('reviewName').value;
    const role = document.getElementById('reviewRole').value;
    const text = document.getElementById('reviewText').value;
    const rating = document.getElementById('reviewRating').value;

    if(rating == 0) { showCustomAlert("من فضلك اختر عدد النجوم!"); return; }

    db.collection("reviews").add({
        name: name,
        role: role,
        text: text,
        rating: parseInt(rating),
        date: new Date()
    }).then(() => {
        showCustomAlert("شكراً لك! تم إضافة تقييمك بنجاح.", "تم");
        closeReviewModal();
        loadReviews(); // تحديث القائمة
    }).catch((error) => {
        console.error("Error: ", error);
        showCustomAlert("حدث خطأ، تأكد من الاتصال بالإنترنت.");
    });
});

// 4. جلب وعرض التقييمات من قاعدة البيانات
function loadReviews() {
    const grid = document.getElementById('reviewsGrid');
    // هنسيب أول 3 تقييمات ثابتة (عشان الشكل) ونضيف الجديد تحتهم
    // أو ممكن نمسحهم ونعرض من الداتا بيس بس
    
    db.collection("reviews").orderBy("date", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const starsHTML = Array(5).fill(0).map((_, i) => 
                i < data.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'
            ).join('');

            const card = `
                <div class="review-card glass" data-aos="flip-up">
                    <div class="stars" style="color: var(--gold-main)">${starsHTML}</div>
                    <p>"${data.text}"</p>
                    <div class="client-info">
                        <div class="client-avatar">${data.name.charAt(0)}</div>
                        <div><h4>${data.name}</h4><span>${data.role}</span></div>
                    </div>
                </div>
            `;
            // إضافة الكارت الجديد في الأول
            grid.insertAdjacentHTML('afterbegin', card); 
        });
    });
}

// تحميل التقييمات عند فتح الموقع
loadReviews();