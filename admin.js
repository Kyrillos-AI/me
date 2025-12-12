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
   إعدادات فايربيز والدخول
   ========================================= */

// ⚠️ بيانات مشروعك (تأكد أنها صحيحة)
const firebaseConfig = {
    apiKey: "AIzaSyANz8dBPKkSD6mqTuVk77WLRqsVQ1hVlog",
    authDomain: "kyrillos-protifolio.firebaseapp.com",
    projectId: "kyrillos-protifolio",
    storageBucket: "kyrillos-protifolio.firebasestorage.app",
    messagingSenderId: "154071914816",
    appId: "1:154071914816:web:b246ca0b0aada5db3502a5",
    measurementId: "G-64M0V7QRPO"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// --- 🔥 منطق تسجيل الدخول الجديد 🔥 ---
function checkLogin() {
    const inputPass = document.getElementById('adminPass').value;
    const errorMsg = document.getElementById('loginError');
    const loginModal = document.getElementById('loginModal');
    const dashboard = document.getElementById('dashboardContent');
    const btn = document.querySelector('#loginModal .btn-cyber');

    // تأثير تحميل بسيط
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> جاري التحقق...';

    // 1. محاولة جلب الباسورد من السيرفر
    db.collection("settings").doc("security").get().then((doc) => {
        let realPass = "123456"; // الباسورد الافتراضي لو مفيش داتا
        
        if (doc.exists && doc.data().adminPassword) {
            realPass = doc.data().adminPassword;
        }

        // 2. المقارنة
        if (inputPass === realPass) {
            loginModal.style.opacity = '0';
            setTimeout(() => {
                loginModal.style.display = 'none';
                dashboard.style.display = 'flex'; // استخدام flex عشان الـ layout الجديد
                loadSocials();
            }, 500);
        } else {
            errorMsg.innerText = "❌ كلمه السر غير صحيحه!";
            btn.innerHTML = '<span class="btn-text">دخول</span> <i class="fas fa-unlock-alt"></i>';
            document.querySelector('.login-box').style.animation = "shake 0.3s";
            setTimeout(() => document.querySelector('.login-box').style.animation = "", 300);
        }
    }).catch((error) => {
        console.error("Login Error:", error);
        // في حالة الخطأ (مثل النت مفصول)، نستخدم الافتراضي للطوارئ
        if (inputPass === "123456") {
             loginModal.style.display = 'none';
             dashboard.style.display = 'flex';
        } else {
             errorMsg.innerText = "خطأ في الاتصال، حاول مجدداً.";
             btn.innerHTML = '<span class="btn-text">دخول</span> <i class="fas fa-unlock-alt"></i>';
        }
    });
}

/* =========================================
   🔥 1. نظام التنبيه المخصص (Custom Alert)
   ========================================= */
function showAlert(msg, title = "تنبيه", icon = "fa-info-circle") {
    const alertBox = document.getElementById('customAlert');
    document.getElementById('alertMsg').innerText = msg;
    document.getElementById('alertTitle').innerText = title;
    
    const iconEl = document.getElementById('alertIcon');
    iconEl.className = `fas ${icon}`;
    
    if(title.includes("خطأ")) iconEl.style.color = "#ff2e63";
    else if(title.includes("نجاح")) iconEl.style.color = "#00ff88";
    else iconEl.style.color = "#D4AF37";

    if(alertBox) alertBox.classList.add('active');
}

window.closeAlert = function() {
    document.getElementById('customAlert').classList.remove('active');
}

/* =========================================
   🌐 2. إدارة روابط السوشيال ميديا
   ========================================= */
function loadSocials() {
    
    db.collection("settings").doc("socials").get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            if(data.facebook) document.getElementById('fbLink').value = data.facebook;
            if(data.instagram) document.getElementById('instaLink').value = data.instagram;
            if(data.whatsapp) document.getElementById('waLink').value = data.whatsapp;
            if(data.github) document.getElementById('gitLink').value = data.github;
            if(data.tiktok) document.getElementById('tiktokLink').value = data.tiktok;
        }
    }).catch(error => console.log("Error loading socials:", error));
}

document.getElementById('saveSocialsBtn').addEventListener('click', function() {
    const btn = this;
    const oldText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';

    db.collection("settings").doc("socials").set({
        facebook: document.getElementById('fbLink').value,
        instagram: document.getElementById('instaLink').value,
        whatsapp: document.getElementById('waLink').value,
        github: document.getElementById('gitLink').value,
        tiktok: document.getElementById('tiktokLink').value
    }, { merge: true }).then(() => {
        showAlert("تم حفظ الروابط بنجاح وسيتم تحديث الموقع!", "عملية ناجحة", "fa-check-circle");
        btn.innerHTML = oldText;
    }).catch(err => {
        showAlert("حدث خطأ: " + err.message, "خطأ", "fa-times-circle");
        btn.innerHTML = oldText;
    });
});

/* =========================================
   🖼️ 3. رفع المشاريع (Drag & Drop Logic)
   ========================================= */
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('imageFile');
const previewImg = document.getElementById('previewImg');
const dropContent = document.querySelector('.drop-content');
let selectedFile = null;

dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
});

dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
});

function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        if (file.size > 800 * 1024) {
            showAlert("الصورة كبيرة جداً! يرجى استخدام صورة أقل من 1 ميجابايت.", "تحذير الحجم", "fa-exclamation-triangle");
        }
        selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            previewImg.classList.remove('hidden');
            dropContent.style.display = 'none';
        };
        reader.readAsDataURL(file);
    } else {
        showAlert("يرجى اختيار ملف صورة فقط!", "خطأ", "fa-times-circle");
    }
}

// زر إضافة المشروع
document.getElementById('addBtn').addEventListener('click', function() {
    const title = document.getElementById('pTitle').value;
    const desc = document.getElementById('pDesc').value;
    const link = document.getElementById('pLink').value;
    const cat = document.getElementById('pCat').value;

    if(!title || !selectedFile) {
        showAlert("يجب كتابة اسم المشروع واختيار صورة!", "بيانات ناقصة", "fa-exclamation-circle");
        return;
    }

    const btn = document.getElementById('addBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري النشر...';
    btn.disabled = true;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    
    reader.onload = function () {
        const base64String = reader.result;

        db.collection("projects").add({
            title: title,
            desc: desc,
            img: base64String,
            link: link,
            category: cat,
            date: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            showAlert("تم نشر المشروع بنجاح!", "عملية ناجحة", "fa-check-circle");
            resetForm();
        }).catch((err) => {
            console.error(err);
            showAlert("حدث خطأ (ربما الصورة كبيرة جداً): " + err.message, "خطأ", "fa-times-circle");
            btn.disabled = false;
            btn.innerHTML = '<span class="btn-text">حاول مجدداً</span>';
        });
    };
});

function resetForm() {
    document.getElementById('pTitle').value = "";
    document.getElementById('pDesc').value = "";
    document.getElementById('pLink').value = "";
    fileInput.value = "";
    selectedFile = null;
    previewImg.classList.add('hidden');
    previewImg.src = "";
    dropContent.style.display = 'block';
    
    const btn = document.getElementById('addBtn');
    btn.innerHTML = '<span class="btn-text">نشر المشروع</span> <span class="btn-glitch"></span> <i class="fas fa-rocket"></i>';
    btn.disabled = false;
}

// عرض المشاريع
db.collection("projects").orderBy("date", "desc").onSnapshot((snapshot) => {
    const list = document.getElementById("projectsList");
    list.innerHTML = "";

    if(snapshot.empty) {
        list.innerHTML = "<p style='padding:20px; text-align:center;'>لا توجد مشاريع مضافة.</p>";
        return;
    }

    snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;

        const div = document.createElement('div');
        div.className = 'project-item';
        div.innerHTML = `
            <div class="p-info">
                <img src="${data.img}" class="p-img">
                <div class="p-details">
                    <h4>${data.title}</h4>
                    <span class="badge">${data.category}</span>
                </div>
            </div>
            <button class="btn-del" onclick="deleteProject('${id}')">
                <i class="fas fa-trash"></i> حذف
            </button>
        `;
        list.appendChild(div);
    });
});

/* =========================================
   🗑️ PROJECT DELETE LOGIC (WITH CUSTOM ALERT)
   ========================================= */
window.deleteProject = function(id) {
    
    // Call our custom confirmation box
    showConfirm(
        "حذف المشروع؟", 
        "سيتم حذف هذا المشروع نهائياً من المعرض. هل أنت متأكد؟",
        
        // This runs only if they click "Yes"
        function() {
            db.collection("projects").doc(id).delete().then(() => {
                showAlert("تم حذف المشروع بنجاح!", "تم الحذف", "fa-trash");
            }).catch(err => {
                console.error(err);
                showAlert("حدث خطأ أثناء الحذف: " + err.message, "خطأ");
            });
        }
    );
}
/* =========================================
   🔥 DASHBOARD TABS LOGIC (FIXED) 🔥
   ========================================= */
function showTab(tabId, btnElement) {
    // 1. Hide ALL tabs
    document.querySelectorAll('.tab-section').forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active');
    });

    // 2. Show the SELECTED tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';
        setTimeout(() => selectedTab.classList.add('active'), 10); // Fade in effect
    }

    // 3. Update Sidebar Active State
    if (btnElement) {
        document.querySelectorAll('.sidebar li').forEach(li => {
            li.classList.remove('active');
        });
        btnElement.classList.add('active');
    }
}
function switchTab(tabName) {
    // إخفاء الكل
    document.querySelectorAll('.content-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    // إظهار المطلوب
    document.getElementById(`tab-${tabName}`).classList.add('active');

    // تحديث العنوان
    const titles = {
        'projects-add': 'إضافة مشروع جديد',
        'projects-list': 'قائمة المشاريع الحالية',
        'socials': 'إدارة روابط التواصل',
        'security': 'إعدادات الأمان' // الجديد
    };
    const titleEl = document.getElementById('pageTitle');
    if(titleEl) titleEl.innerText = titles[tabName];

    // تنشيط الزر (تلقائي)
    const items = document.querySelectorAll('.nav-item');
    // ترتيب الأزرار: 0:إضافة، 1:قائمة، 2:سوشيال، 3:أمان
    if(tabName === 'projects-list') items[0].classList.add('active');
    if(tabName === 'projects-add') items[1].classList.add('active');
    if(tabName === 'socials') items[2].classList.add('active');
    if(tabName === 'security') items[3].classList.add('active');
}
/* =========================================
   🔐 تغيير كلمة المرور
   ========================================= */
function changePassword() {
    const newPass = document.getElementById('newPass').value;
    const confirmPass = document.getElementById('confirmPass').value;
    const btn = document.getElementById('savePassBtn');

    if (newPass.length < 4) {
        showAlert("كلمة المرور قصيرة جداً!", "خطأ", "fa-times-circle");
        return;
    }

    if (newPass !== confirmPass) {
        showAlert("كلمات المرور غير متطابقة!", "خطأ", "fa-times-circle");
        return;
    }

    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحديث...';
    btn.disabled = true;

    // حفظ الباسورد الجديد في مجموعة settings -> security
    db.collection("settings").doc("security").set({
        adminPassword: newPass
    }, { merge: true }).then(() => {
        showAlert("تم تغيير كلمة المرور بنجاح! يرجى حفظها جيداً.", "تم بنجاح", "fa-check-circle");
        document.getElementById('newPass').value = "";
        document.getElementById('confirmPass').value = "";
        btn.innerHTML = originalText;
        btn.disabled = false;
    }).catch((error) => {
        console.error(error);
        showAlert("حدث خطأ أثناء الحفظ: " + error.message, "خطأ", "fa-times-circle");
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}

/* --- 📸 Profile Image Logic (FIXED) --- */
const profileDrop = document.getElementById('profileDropZone');
const profileInput = document.getElementById('profileFile');
const profilePreview = document.getElementById('profilePreview');
// Select the text content inside the box
const profileContent = document.querySelector('#profileDropZone .drop-content'); 

let selectedProfileFile = null;

if(profileDrop) profileDrop.addEventListener('click', () => profileInput.click());

if(profileInput) profileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        selectedProfileFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePreview.src = e.target.result;
            profilePreview.classList.remove('hidden');
            
            // ✅ FIX: Hide the text explicitly
            if(profileContent) profileContent.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Save Function
document.getElementById('saveProfileBtn').addEventListener('click', function() {
    if(!selectedProfileFile) { showAlert("اختر صورة أولاً!", "تنبيه"); return; }
    
    const btn = this;
    const oldHtml = btn.innerHTML;
    btn.innerHTML = 'جاري الرفع...';
    
    const reader = new FileReader();
    reader.readAsDataURL(selectedProfileFile);
    reader.onload = function() {
        db.collection("settings").doc("profile").set({
            image: reader.result,
            isCustom: true
        }, { merge: true }).then(() => {
            showAlert("تم تحديث الصورة!", "نجاح", "fa-check-circle");
            btn.innerHTML = oldHtml;
        });
    };
});

/* =========================================
   🛑 CUSTOM CONFIRMATION FUNCTION (YES/NO)
   ========================================= */
function showConfirm(title, message, yesCallback) {
    const modal = document.getElementById('confirmModal');
    const titleEl = document.getElementById('confirmTitle');
    const msgEl = document.getElementById('confirmMsg');
    const yesBtn = document.getElementById('btnConfirmYes');
    const noBtn = document.getElementById('btnConfirmNo');

    // 1. Set the Text
    if(titleEl) titleEl.innerText = title;
    if(msgEl) msgEl.innerText = message;

    // 2. Show the Modal
    if(modal) modal.classList.add('active');

    // 3. Handle "Yes" Click
    yesBtn.onclick = function() {
        if(modal) modal.classList.remove('active');
        yesCallback(); // Run the actual delete code
    };

    // 4. Handle "No" Click
    noBtn.onclick = function() {
        if(modal) modal.classList.remove('active');
    };
}

/* =========================================
   📸 PROFILE DELETE LOGIC (USING THE NEW ALERT)
   ========================================= */
document.getElementById('deleteProfileBtn').addEventListener('click', function() {
    
    // Call our new custom function instead of window.confirm()
    showConfirm(
        "حذف الصورة الشخصية؟", 
        "سيتم استرجاع الصورة الافتراضية فوراً. هل أنت متأكد؟",
        
        // This code ONLY runs if "Yes" is clicked
        function() {
            db.collection("settings").doc("profile").set({
                image: null,
                isCustom: false
            }, { merge: true }).then(() => {
                
                // Show your existing Success Alert
                showAlert("تم استرجاع الصورة الافتراضية بنجاح", "تم الحذف", "fa-trash");
                
                // Reset Preview Image
                const profilePreview = document.getElementById('profilePreview');
                const profileContent = document.querySelector('#profileDropZone .drop-content');
                
                if(profilePreview) {
                    profilePreview.classList.add('hidden');
                    profilePreview.src = "";
                }
                // Show the "Upload" text again
                if(profileContent) {
                    profileContent.style.display = 'block';
                }
            });
        }
    );
});

/* =========================================
   💰 ROBUST CALCULATOR LOGIC (V3)
   ========================================= */

// 1. ADD SERVICE (UI Only)
function addNewService() {
    const name = document.getElementById('newServName').value;
    const price = document.getElementById('newServPrice').value;
    const icon = document.getElementById('newServIcon').value; // Grabs selected icon

    if (!name || !price) { showAlert("يرجى إدخال الاسم والسعر", "بيانات ناقصة"); return; }

    createRow('adminServicesList', name, price, icon, 'service-row');
    
    // Clear fields
    document.getElementById('newServName').value = "";
    document.getElementById('newServPrice').value = "";
}

// 2. ADD ADDON (UI Only)
function addNewAddon() {
    const name = document.getElementById('newAddonName').value;
    const price = document.getElementById('newAddonPrice').value;
    const icon = document.getElementById('newAddonIcon').value;

    if (!name || !price) { showAlert("يرجى إدخال الاسم والسعر", "بيانات ناقصة"); return; }

    createRow('adminAddonsList', name, price, icon, 'addon-row');

    document.getElementById('newAddonName').value = "";
    document.getElementById('newAddonPrice').value = "";
}

// 3. CREATE ROW (Helper)
function createRow(containerID, name, price, icon, rowClass) {
    const container = document.getElementById(containerID);
    const div = document.createElement('div');
    div.className = rowClass; 
    div.style.cssText = "display: grid; grid-template-columns: 40px 2fr 1fr auto; gap: 10px; align-items: center; background: #151515; padding: 10px; border-radius: 8px; margin-bottom: 8px; border: 1px solid #333;";
    
    div.innerHTML = `
        <div style="text-align:center;"><i class="fas ${icon}" style="color:var(--gold); font-size:1.2rem;"></i></div>
        <input type="text" class="p-name" value="${name}" style="background:transparent; border:none; color:#fff; width:100%;">
        <input type="number" class="p-price" value="${price}" style="background:transparent; border:none; color:var(--gold); font-weight:bold; width:100%;">
        <input type="hidden" class="p-icon" value="${icon}"> <button onclick="this.parentElement.remove()" style="background:#ff2e63; color:#fff; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;"><i class="fas fa-trash"></i></button>
    `;
    container.appendChild(div);
}

// 4. SAVE TO DATABASE (The Critical Part)
function saveAllCalculatorData() {
    const btn = document.getElementById('saveDynamicPricesBtn');
    const oldText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';

    // Collect Services
    const services = [];
    document.querySelectorAll('.service-row').forEach(row => {
        services.push({
            name: row.querySelector('.p-name').value,
            price: Number(row.querySelector('.p-price').value),
            icon: row.querySelector('.p-icon').value
        });
    });

    // Collect Addons
    const addons = [];
    document.querySelectorAll('.addon-row').forEach(row => {
        addons.push({
            name: row.querySelector('.p-name').value,
            price: Number(row.querySelector('.p-price').value),
            icon: row.querySelector('.p-icon').value
        });
    });

    console.log("Saving Data:", { services, addons }); // For Debugging

    // Save to Firestore 'calculator_v3'
    db.collection("settings").doc("calculator_v3").set({
        services: services,
        addons: addons
    }).then(() => {
        showAlert("تم تحديث البيانات بنجاح!", "نجاح");
        btn.innerHTML = oldText;
    }).catch(err => {
        console.error("Save Error:", err);
        showAlert("حدث خطأ في الحفظ (راجع الكونسول)", "خطأ");
        btn.innerHTML = oldText;
    });
}

// 5. LOAD DATA (On Refresh)
function loadCalcData() {
    db.collection("settings").doc("calculator_v3").get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            document.getElementById('adminServicesList').innerHTML = "";
            document.getElementById('adminAddonsList').innerHTML = "";

            if (data.services) data.services.forEach(s => createRow('adminServicesList', s.name, s.price, s.icon || 'fa-code', 'service-row'));
            if (data.addons) data.addons.forEach(a => createRow('adminAddonsList', a.name, a.price, a.icon || 'fa-plus', 'addon-row'));
        }
    }).catch(err => console.log("Load Error:", err));
}

// Run on Load
document.addEventListener('DOMContentLoaded', () => setTimeout(loadCalcData, 1000));