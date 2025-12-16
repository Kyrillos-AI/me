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
      }
    }

    // Update the text
    if (percentText) {
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
  measurementId: "G-64M0V7QRPO",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// --- 🔥 منطق تسجيل الدخول الجديد 🔥 ---
function checkLogin() {
  const inputPass = document.getElementById("adminPass").value;
  const errorMsg = document.getElementById("loginError");
  const loginModal = document.getElementById("loginModal");
  const dashboard = document.getElementById("dashboardContent");
  const btn = document.querySelector("#loginModal .btn-cyber");

  // تأثير تحميل بسيط
  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> جاري التحقق...';

  // 1. محاولة جلب الباسورد من السيرفر
  db.collection("settings")
    .doc("security")
    .get()
    .then((doc) => {
      let realPass = "123456"; // الباسورد الافتراضي لو مفيش داتا

      if (doc.exists && doc.data().adminPassword) {
        realPass = doc.data().adminPassword;
      }

      // 2. المقارنة
      if (inputPass === realPass) {
        loginModal.style.opacity = "0";
        setTimeout(() => {
          loginModal.style.display = "none";
          dashboard.style.display = "flex"; // استخدام flex عشان الـ layout الجديد
          loadSocials();
          loadAdminStats();
          loadAdminReviews();
          loadOrdersManager();
        }, 500);
      } else {
        errorMsg.innerText = "❌ كلمه السر غير صحيحه!";
        btn.innerHTML =
          '<span class="btn-text">دخول</span> <i class="fas fa-unlock-alt"></i>';
        document.querySelector(".login-box").style.animation = "shake 0.3s";
        setTimeout(
          () => (document.querySelector(".login-box").style.animation = ""),
          300
        );
      }
    })
    .catch((error) => {
      console.error("Login Error:", error);
      // في حالة الخطأ (مثل النت مفصول)، نستخدم الافتراضي للطوارئ
      if (inputPass === "123456") {
        loginModal.style.display = "none";
        dashboard.style.display = "flex";
      } else {
        errorMsg.innerText = "خطأ في الاتصال، حاول مجدداً.";
        btn.innerHTML =
          '<span class="btn-text">دخول</span> <i class="fas fa-unlock-alt"></i>';
      }
    });
}

/* =========================================
   🔥 1. نظام التنبيه المخصص (Custom Alert)
   ========================================= */
function showAlert(msg, title = "تنبيه", icon = "fa-info-circle") {
  const alertBox = document.getElementById("customAlert");
  document.getElementById("alertMsg").innerText = msg;
  document.getElementById("alertTitle").innerText = title;

  const iconEl = document.getElementById("alertIcon");
  iconEl.className = `fas ${icon}`;

  if (title.includes("خطأ")) iconEl.style.color = "#ff2e63";
  else if (title.includes("نجاح")) iconEl.style.color = "#00ff88";
  else iconEl.style.color = "#D4AF37";

  if (alertBox) alertBox.classList.add("active");
}

window.closeAlert = function () {
  document.getElementById("customAlert").classList.remove("active");
};

/* =========================================
   🌐 2. إدارة روابط السوشيال ميديا
   ========================================= */
function loadSocials() {
  db.collection("settings")
    .doc("socials")
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data.facebook)
          document.getElementById("fbLink").value = data.facebook;
        if (data.instagram)
          document.getElementById("instaLink").value = data.instagram;
        if (data.whatsapp)
          document.getElementById("waLink").value = data.whatsapp;
        if (data.github) document.getElementById("gitLink").value = data.github;
        if (data.tiktok)
          document.getElementById("tiktokLink").value = data.tiktok;
      }
    })
    .catch((error) => console.log("Error loading socials:", error));
}

document
  .getElementById("saveSocialsBtn")
  .addEventListener("click", function () {
    const btn = this;
    const oldText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';

    db.collection("settings")
      .doc("socials")
      .set(
        {
          facebook: document.getElementById("fbLink").value,
          instagram: document.getElementById("instaLink").value,
          whatsapp: document.getElementById("waLink").value,
          github: document.getElementById("gitLink").value,
          tiktok: document.getElementById("tiktokLink").value,
        },
        { merge: true }
      )
      .then(() => {
        showAlert(
          "تم حفظ الروابط بنجاح وسيتم تحديث الموقع!",
          "عملية ناجحة",
          "fa-check-circle"
        );
        btn.innerHTML = oldText;
      })
      .catch((err) => {
        showAlert("حدث خطأ: " + err.message, "خطأ", "fa-times-circle");
        btn.innerHTML = oldText;
      });
  });

/* =========================================
   🖼️ 3. رفع المشاريع (Drag & Drop Logic)
   ========================================= */
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("imageFile");
const previewImg = document.getElementById("previewImg");
const dropContent = document.querySelector(".drop-content");
let selectedFile = null;

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  handleFile(e.target.files[0]);
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("drag-over");
});
dropZone.addEventListener("dragleave", () =>
  dropZone.classList.remove("drag-over")
);
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");
  if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
});

function handleFile(file) {
  if (file && file.type.startsWith("image/")) {
    if (file.size > 600 * 1024) {
      showAlert(
        "الصورة كبيرة جداً! يرجى استخدام صورة أقل من 1 ميجابايت.",
        "تحذير الحجم",
        "fa-exclamation-triangle"
      );
    }
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewImg.classList.remove("hidden");
      dropContent.style.display = "none";
    };
    reader.readAsDataURL(file);
  } else {
    showAlert("يرجى اختيار ملف صورة فقط!", "خطأ", "fa-times-circle");
  }
}

// زر إضافة المشروع
document.getElementById("addBtn").addEventListener("click", function () {
  const title = document.getElementById("pTitle").value;
  const desc = document.getElementById("pDesc").value;
  const link = document.getElementById("pLink").value;
  const cat = document.getElementById("pCat").value;

  if (!title || !selectedFile) {
    showAlert(
      "يجب كتابة اسم المشروع واختيار صورة!",
      "بيانات ناقصة",
      "fa-exclamation-circle"
    );
    return;
  }

  const btn = document.getElementById("addBtn");
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري النشر...';
  btn.disabled = true;

  const reader = new FileReader();
  reader.readAsDataURL(selectedFile);

  reader.onload = function () {
    const base64String = reader.result;

    db.collection("projects")
      .add({
        title: title,
        desc: desc,
        img: base64String,
        link: link,
        category: cat,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        showAlert("تم نشر المشروع بنجاح!", "عملية ناجحة", "fa-check-circle");
        resetForm();
      })
      .catch((err) => {
        console.error(err);
        showAlert(
          "حدث خطأ (ربما الصورة كبيرة جداً): " + err.message,
          "خطأ",
          "fa-times-circle"
        );
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-text">حاول مجدداً</span>';
      });
  };
});

function resetForm() {
  document.getElementById("pTitle").value = "";
  document.getElementById("pDesc").value = "";
  document.getElementById("pLink").value = "";
  fileInput.value = "";
  selectedFile = null;
  previewImg.classList.add("hidden");
  previewImg.src = "";
  dropContent.style.display = "block";

  const btn = document.getElementById("addBtn");
  btn.innerHTML =
    '<span class="btn-text">نشر المشروع</span> <span class="btn-glitch"></span> <i class="fas fa-rocket"></i>';
  btn.disabled = false;
}

// عرض المشاريع
db.collection("projects")
  .orderBy("date", "desc")
  .onSnapshot((snapshot) => {
    const list = document.getElementById("projectsList");
    list.innerHTML = "";

    if (snapshot.empty) {
      list.innerHTML =
        "<p style='padding:20px; text-align:center;'>لا توجد مشاريع مضافة.</p>";
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;

      const div = document.createElement("div");
      div.className = "project-item";
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
window.deleteProject = function (id) {
  // Call our custom confirmation box
  showConfirm(
    "حذف المشروع؟",
    "سيتم حذف هذا المشروع نهائياً من المعرض. هل أنت متأكد؟",

    // This runs only if they click "Yes"
    function () {
      db.collection("projects")
        .doc(id)
        .delete()
        .then(() => {
          showAlert("تم حذف المشروع بنجاح!", "تم الحذف", "fa-trash");
        })
        .catch((err) => {
          console.error(err);
          showAlert("حدث خطأ أثناء الحذف: " + err.message, "خطأ");
        });
    }
  );
};
/* =========================================
   🔥 DASHBOARD TABS LOGIC (FIXED) 🔥
   ========================================= */
function showTab(tabId, btnElement) {
  // 1. Hide ALL tabs
  document.querySelectorAll(".tab-section").forEach((sec) => {
    sec.style.display = "none";
    sec.classList.remove("active");
  });

  // 2. Show the SELECTED tab
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.style.display = "block";
    setTimeout(() => selectedTab.classList.add("active"), 10); // Fade in effect
  }

  // 3. Update Sidebar Active State
  if (btnElement) {
    document.querySelectorAll(".sidebar li").forEach((li) => {
      li.classList.remove("active");
    });
    btnElement.classList.add("active");
  }
}
function switchTab(tabName) {
  // إخفاء الكل
  document
    .querySelectorAll(".content-tab")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".nav-item")
    .forEach((item) => item.classList.remove("active"));

  // إظهار المطلوب
  document.getElementById(`tab-${tabName}`).classList.add("active");

  // تحديث العنوان
  const titles = {
    "projects-add": "إضافة مشروع جديد",
    "projects-list": "قائمة المشاريع الحالية",
    socials: "إدارة روابط التواصل",
    security: "إعدادات الأمان", // الجديد
  };
  const titleEl = document.getElementById("pageTitle");
  if (titleEl) titleEl.innerText = titles[tabName];

  // تنشيط الزر (تلقائي)
  const items = document.querySelectorAll(".nav-item");
  // ترتيب الأزرار: 0:إضافة، 1:قائمة، 2:سوشيال، 3:أمان
  if (tabName === "projects-list") items[0].classList.add("active");
  if (tabName === "projects-add") items[1].classList.add("active");
  if (tabName === "socials") items[2].classList.add("active");
  if (tabName === "security") items[3].classList.add("active");
}
/* =========================================
   🔐 تغيير كلمة المرور
   ========================================= */
function changePassword() {
  const newPass = document.getElementById("newPass").value;
  const confirmPass = document.getElementById("confirmPass").value;
  const btn = document.getElementById("savePassBtn");

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
  db.collection("settings")
    .doc("security")
    .set(
      {
        adminPassword: newPass,
      },
      { merge: true }
    )
    .then(() => {
      showAlert(
        "تم تغيير كلمة المرور بنجاح! يرجى حفظها جيداً.",
        "تم بنجاح",
        "fa-check-circle"
      );
      document.getElementById("newPass").value = "";
      document.getElementById("confirmPass").value = "";
      btn.innerHTML = originalText;
      btn.disabled = false;
    })
    .catch((error) => {
      console.error(error);
      showAlert(
        "حدث خطأ أثناء الحفظ: " + error.message,
        "خطأ",
        "fa-times-circle"
      );
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
}

/* --- 📸 Profile Image Logic (FIXED) --- */
const profileDrop = document.getElementById("profileDropZone");
const profileInput = document.getElementById("profileFile");
const profilePreview = document.getElementById("profilePreview");
// Select the text content inside the box
const profileContent = document.querySelector("#profileDropZone .drop-content");

let selectedProfileFile = null;

if (profileDrop)
  profileDrop.addEventListener("click", () => profileInput.click());

if (profileInput)
  profileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      selectedProfileFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        profilePreview.src = e.target.result;
        profilePreview.classList.remove("hidden");

        // ✅ FIX: Hide the text explicitly
        if (profileContent) profileContent.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });

// Save Function
document
  .getElementById("saveProfileBtn")
  .addEventListener("click", function () {
    if (!selectedProfileFile) {
      showAlert("اختر صورة أولاً!", "تنبيه");
      return;
    }

    const btn = this;
    const oldHtml = btn.innerHTML;
    btn.innerHTML = "جاري الرفع...";

    const reader = new FileReader();
    reader.readAsDataURL(selectedProfileFile);
    reader.onload = function () {
      db.collection("settings")
        .doc("profile")
        .set(
          {
            image: reader.result,
            isCustom: true,
          },
          { merge: true }
        )
        .then(() => {
          showAlert("تم تحديث الصورة!", "نجاح", "fa-check-circle");
          btn.innerHTML = oldHtml;
        });
    };
  });

/* =========================================
   🛑 CUSTOM CONFIRMATION FUNCTION (YES/NO)
   ========================================= */
function showConfirm(title, message, yesCallback) {
  const modal = document.getElementById("confirmModal");
  const titleEl = document.getElementById("confirmTitle");
  const msgEl = document.getElementById("confirmMsg");
  const yesBtn = document.getElementById("btnConfirmYes");
  const noBtn = document.getElementById("btnConfirmNo");

  // 1. Set the Text
  if (titleEl) titleEl.innerText = title;
  if (msgEl) msgEl.innerText = message;

  // 2. Show the Modal
  if (modal) modal.classList.add("active");

  // 3. Handle "Yes" Click
  yesBtn.onclick = function () {
    if (modal) modal.classList.remove("active");
    yesCallback(); // Run the actual delete code
  };

  // 4. Handle "No" Click
  noBtn.onclick = function () {
    if (modal) modal.classList.remove("active");
  };
}

/* =========================================
   📸 PROFILE DELETE LOGIC (USING THE NEW ALERT)
   ========================================= */
document
  .getElementById("deleteProfileBtn")
  .addEventListener("click", function () {
    // Call our new custom function instead of window.confirm()
    showConfirm(
      "حذف الصورة الشخصية؟",
      "سيتم استرجاع الصورة الافتراضية فوراً. هل أنت متأكد؟",

      // This code ONLY runs if "Yes" is clicked
      function () {
        db.collection("settings")
          .doc("profile")
          .set(
            {
              image: null,
              isCustom: false,
            },
            { merge: true }
          )
          .then(() => {
            // Show your existing Success Alert
            showAlert(
              "تم استرجاع الصورة الافتراضية بنجاح",
              "تم الحذف",
              "fa-trash"
            );

            // Reset Preview Image
            const profilePreview = document.getElementById("profilePreview");
            const profileContent = document.querySelector(
              "#profileDropZone .drop-content"
            );

            if (profilePreview) {
              profilePreview.classList.add("hidden");
              profilePreview.src = "";
            }
            // Show the "Upload" text again
            if (profileContent) {
              profileContent.style.display = "block";
            }
          });
      }
    );
  });
/* =========================================
   📊 STATS & STATUS LOGIC
   ========================================= */

function loadAdminStats() {
  // 1. Listen for Visitor Count
  db.collection("stats")
    .doc("visits")
    .onSnapshot((doc) => {
      if (doc.exists) {
        const count = doc.data().count || 0;
        const el = document.getElementById("totalViews");
        if (el) el.innerText = count;
      }
    });

  // 2. Listen for Status
  db.collection("settings")
    .doc("status")
    .onSnapshot((doc) => {
      if (doc.exists) {
        const state = doc.data().state;
        const textEl = document.getElementById("currentStatusText");
        const icon = document.getElementById("statusIcon");
        const iconBg = document.getElementById("statusIconBg");

        if (state === "available") {
          textEl.innerHTML =
            '<span style="color:#00ff88">●  يلا بيــنا شـغـل </span>';
          icon.style.color = "#00ff88";
          iconBg.style.background = "rgba(0, 255, 136, 0.1)";
        } else {
          textEl.innerHTML =
            '<span style="color:#ff2e63">● انا بردو بقول فاكس شغل</span>';
          icon.style.color = "#ff2e63";
          iconBg.style.background = "rgba(255, 46, 99, 0.1)";
        }
      }
    });
}

function updateStatus(state) {
  db.collection("settings")
    .doc("status")
    .set(
      {
        state: state,
      },
      { merge: true }
    )
    .then(() => {
      showAlert(
        state === "available"
          ? " ✅ فاضي يلا بينا فلوس "
          : " ⛔   مشغول ريحلك حبه ",
        "تم التحديث"
      );
    });
}
/* =========================================
   ⭐ REVIEW MODERATION SYSTEM
   ========================================= */

// 1. Load Reviews Live
function loadAdminReviews() {
  const list = document.getElementById("adminReviewsList");

  db.collection("reviews")
    .orderBy("date", "desc")
    .onSnapshot((snapshot) => {
      list.innerHTML = ""; // Clear list

      if (snapshot.empty) {
        list.innerHTML = "<p style='color:#666;'>لا توجد تقييمات حالياً.</p>";
        return;
      }

      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;

        // Generate Stars HTML
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
          if (data.rating >= i)
            starsHTML +=
              '<i class="fas fa-star" style="color:var(--gold)"></i>';
          else if (data.rating >= i - 0.5)
            starsHTML +=
              '<i class="fas fa-star-half-alt" style="color:var(--gold)"></i>';
          else starsHTML += '<i class="far fa-star" style="color:#444"></i>';
        }

        const card = document.createElement("div");
        card.style.cssText =
          "background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); padding:20px; border-radius:10px; position:relative;";

        card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                    <h4 style="margin:0; color:#fff;">${data.name}</h4>
                    <span style="background:#222; padding:2px 8px; border-radius:5px; font-size:0.8rem; color:#888;">${
                      data.role || "Client"
                    }</span>
                </div>
                <div style="margin-bottom:10px;">${starsHTML}</div>
                <p style="color:#ccc; font-size:0.95rem; line-height:1.6; margin-bottom:15px;">"${
                  data.text
                }"</p>
                
                <button onclick="deleteReview('${id}')" class="btn-del" style="width:100%;">
                    <i class="fas fa-trash"></i> حذف التقييم
                </button>
            `;
        list.appendChild(card);
      });
    });
}

// 2. Delete Review Function
window.deleteReview = function (id) {
  showConfirm(
    "حذف التقييم؟",
    "سيتم إزالة هذا التقييم نهائياً من الموقع. هل أنت متأكد؟",
    function () {
      db.collection("reviews")
        .doc(id)
        .delete()
        .then(() => {
          showAlert("تم حذف التقييم بنجاح!", "تم الحذف", "fa-check-circle");
        })
        .catch((err) => {
          showAlert("حدث خطأ: " + err.message, "خطأ");
        });
    }
  );
};

/* =========================================
   📦 ORDER MANAGEMENT SYSTEM (FIXED)
   ========================================= */

let allOrdersData = []; // Store orders globally for filtering

function loadOrdersManager() {
  // Listen to "orders" collection
  db.collection("orders")
    .orderBy("date", "desc")
    .onSnapshot((snapshot) => {
      allOrdersData = []; // Reset global data

      snapshot.forEach((doc) => {
        let order = doc.data();
        order.id = doc.id; // Save ID inside the object
        allOrdersData.push(order);
      });

      // Render all orders initially
      renderOrders(allOrdersData);

      // Update Stats Counters
      loadOrderStats();
    });
}
// Helper function to render the list (Updated)
function renderOrders(ordersToRender) {
  const list = document.getElementById("ordersList");
  list.innerHTML = "";

  if (ordersToRender.length === 0) {
    list.innerHTML =
      "<p style='text-align:center; color:#666;'>لا توجد طلبات.</p>";
    return;
  }

  ordersToRender.forEach((data) => {
    // 1. Determine Status Badge
    let statusBadge = "";
    if (data.status === "pending") {
      statusBadge =
        '<span class="badge" style="background:#ffd700; color:#000;">قيد الانتظار ⏳</span>';
    } else if (data.status === "confirmed") {
      statusBadge =
        '<span class="badge" style="background:#00ff88; color:#000;">تم التأكيد ✅</span>';
    } else {
      statusBadge =
        '<span class="badge" style="background:#ff2e63; color:#fff;">ملغي ❌</span>';
    }

    // 2. Extract Main Service Name only (for the card summary)
    let mainService = "مشروع مخصص";
    if (Array.isArray(data.items) && data.items.length > 0) {
      // Usually the first item is the service (e.g., "📦 Project: X")
      // We clean the emoji to make it look clean
      mainService = data.items[0].replace(/📦|✨|🎨|➕/g, "").trim();
    }

    // 3. Format Date
    const dateObj = data.date ? data.date.toDate() : new Date();
    const dateStr = dateObj.toLocaleDateString("ar-EG");

    const itemHTML = `
            <div class="glass-panel" style="border:1px solid #333; padding:15px; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:15px;">
                
                <div style="flex: 1;">
                    <h4 style="margin:0 0 5px 0; color:#fff; font-size:1.1rem;">${
                      data.customerName || "عميل"
                    }</h4> 
                    
                    <div style="color:var(--gold); font-size:0.9rem; margin-bottom:5px;">
                        <i class="fas fa-cube"></i> ${mainService}
                    </div>

                    <small style="color:#666;">${dateStr} • ${
      data.phone || "No Phone"
    }</small>
                </div>

                <div style="text-align:left; display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
                    <div style="font-size:1.2rem; font-weight:bold; color:#fff;">${
                      data.total
                    }</div>
                    <div>${statusBadge}</div>
                    
                    <div style="display:flex; gap:8px; margin-top:5px;">
                        <button class="btn-cyber small-btn" onclick="showOrderDetails('${
                          data.id
                        }')" style="padding: 5px 15px; font-size:0.8rem;">
                            <i class="fas fa-eye"></i> التفاصيل
                        </button>
                        
                        ${
                          data.status === "pending"
                            ? `
                            <button class="btn-cyber small-btn" onclick="updateOrderStatus('${data.id}', 'confirmed')" style="border-color:#00ff88; color:#00ff88; padding: 5px;">✅</button>
                            <button class="btn-cyber red small-btn" onclick="updateOrderStatus('${data.id}', 'cancelled')" style="padding: 5px;">❌</button>                        `
                            : ""
                        }
                    </div>
                </div>
            </div>
        `;
    list.innerHTML += itemHTML;
  });
}
/* =========================================
   ✅ إصلاح شامل: الفلتر، الحذف، والتحديث
   (ضع هذا الكود في نهاية ملف admin.js)
   ========================================= */

// 1. فلتر الطلبات (عشان لما تضغط على مربع الأرباح يفلتر)
window.filterOrders = function (statusToFilter) {
  // نتأكد إن الداتا موجودة
  if (!allOrdersData) return;

  const list = document.getElementById("ordersList");

  // رسالة تحميل صغيرة عشان تعرف إن فيه حاجة بتحصل
  list.innerHTML =
    '<p style="text-align:center; padding:20px; color:#888;">↻ جاري التحديث...</p>';

  setTimeout(() => {
    let filteredList = [];

    // لو اخترنا "عرض الكل" بنعرض كله، غير كده بنفلتر حسب الحالة
    if (statusToFilter === "all") {
      filteredList = allOrdersData;
    } else {
      filteredList = allOrdersData.filter(
        (order) => order.status === statusToFilter
      );
    }

    // إعادة رسم الطلبات
    renderOrders(filteredList);
  }, 200);
};

// 2. حذف كل البيانات (تفعيل الزر الأحمر)
window.clearAllData = function () {
  showConfirm(
    "⚠️ حذف كل البيانات؟",
    "هل أنت متأكد أنك تريد حذف جميع الطلبات؟ لا يمكن التراجع عن هذا الإجراء.",
    function () {
      // كود الحذف الفعلي من فايربيز
      db.collection("orders")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            showAlert("لا توجد طلبات لحذفها.", "تنبيه");
            return;
          }
          const batch = db.batch();
          querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
          });
          return batch.commit();
        })
        .then(() => {
          showAlert("تم حذف جميع الطلبات بنجاح.", "تم الحذف", "fa-trash");
          // العدادات هتتحدث لوحدها تلقائي
        })
        .catch((error) => {
          showAlert("حدث خطأ: " + error.message, "خطأ");
        });
    }
  );
};

// 3. تحديث حالة الطلب (تفعيل أزرار تأكيد وإلغاء)
window.updateOrderStatus = function (orderId, newStatus) {
  db.collection("orders")
    .doc(orderId)
    .update({
      status: newStatus,
    })
    .then(() => {
      const msg =
        newStatus === "confirmed"
          ? "تم تأكيد الطلب بنجاح ✅"
          : "تم إلغاء الطلب ❌";
      showAlert(
        msg,
        "تم التحديث",
        newStatus === "confirmed" ? "fa-check-circle" : "fa-times-circle"
      );
    })
    .catch((error) => {
      showAlert("حدث خطأ: " + error.message, "خطأ", "fa-exclamation-triangle");
    });
};

// 4. حساب الإحصائيات (عشان الأرقام اللي فوق تتضبط)
window.loadOrderStats = function () {
  if (!allOrdersData) return;

  const receivedCount = allOrdersData.length;
  // عد الطلبات المؤكدة فقط
  const confirmedCount = allOrdersData.filter(
    (order) => order.status === "confirmed"
  ).length;

  const recEl = document.getElementById("statReceived");
  const confEl = document.getElementById("statConfirmed");

  if (recEl) recEl.innerText = receivedCount;
  if (confEl) confEl.innerText = confirmedCount;
};
/* =========================================
   💰 CALCULATOR LOGIC V7 (Admin Fix)
   ========================================= */

// 1. ADD FUNCTIONS (Unified)
function addNewService() {
  addRow(
    "adminServicesList",
    "newServName",
    "newServPrice",
    "newServIcon",
    "service-row"
  );
}
function addNewAddon() {
  addRow(
    "adminAddonsList",
    "newAddonName",
    "newAddonPrice",
    "newAddonIcon",
    "addon-row"
  );
}
// This was missing before 👇
function addNewVisual() {
  addRow(
    "adminVisualsList",
    "newVisualName",
    "newVisualPrice",
    "newVisualIcon",
    "visual-row"
  );
}

function addRow(containerID, nameID, priceID, iconID, className) {
  const name = document.getElementById(nameID).value;
  const price = document.getElementById(priceID).value;
  const icon = document.getElementById(iconID).value;

  if (!name || !price) {
    showAlert("بيانات ناقصة", "خطأ");
    return;
  }

  createRow(containerID, name, price, icon, className);

  // Clear inputs
  document.getElementById(nameID).value = "";
  document.getElementById(priceID).value = "";
}

function createRow(containerID, name, price, icon, rowClass) {
  const container = document.getElementById(containerID);
  const div = document.createElement("div");
  div.className = rowClass;
  // Styling for the row
  div.style.cssText =
    "display: grid; grid-template-columns: 40px 2fr 1fr auto; gap: 10px; align-items: center; background: #151515; padding: 10px; margin-bottom: 8px; border: 1px solid #333; border-radius: 8px;";

  div.innerHTML = `
        <div style="text-align:center;"><i class="fas ${icon}" style="color:var(--gold);"></i></div>
        <input type="text" class="p-name" value="${name}" style="background:transparent; border:none; color:#fff; width:100%;">
        <input type="number" class="p-price" value="${price}" style="background:transparent; border:none; color:var(--gold); font-weight:bold; width:100%;">
        <input type="hidden" class="p-icon" value="${icon}">
        <button onclick="this.parentElement.remove()" class="btn-del" style="padding:5px 10px;"><i class="fas fa-trash"></i></button>
    `;
  container.appendChild(div);
}

function saveAllCalculatorData() {
  const btn = document.getElementById("saveDynamicPricesBtn");
  const oldText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';

  const getData = (selector) => {
    let arr = [];
    document.querySelectorAll(selector).forEach((row) => {
      arr.push({
        name: row.querySelector(".p-name").value,
        price: Number(row.querySelector(".p-price").value),
        icon: row.querySelector(".p-icon").value,
      });
    });
    return arr;
  };

  // Get Values
  const logoPrice =
    Number(document.getElementById("adminLogoPrice").value) || 1500;
  const fastPercent =
    Number(document.getElementById("adminFastPercent").value) || 25; // Default 25%
  const slowPercent =
    Number(document.getElementById("adminSlowPercent").value) || 10; // Default 10%

  db.collection("settings")
    .doc("calculator_v3")
    .set(
      {
        services: getData(".service-row"),
        addons: getData(".addon-row"),
        visuals: getData(".visual-row"),
        logoPrice: logoPrice,
        fastPercent: fastPercent, // Saved as %
        slowPercent: slowPercent, // Saved as %
      },
      { merge: true }
    )
    .then(() => {
      showAlert("تم حفظ الإعدادات بنجاح!", "نجاح");
      btn.innerHTML = oldText;
    })
    .catch((err) => {
      console.error(err);
      showAlert("خطأ في الحفظ", "خطأ");
      btn.innerHTML = oldText;
    });
}
function loadCalcData() {
  db.collection("settings")
    .doc("calculator_v3")
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();

        document.getElementById("adminServicesList").innerHTML = "";
        document.getElementById("adminAddonsList").innerHTML = "";
        document.getElementById("adminVisualsList").innerHTML = "";

        if (data.services)
          data.services.forEach((s) =>
            createRow(
              "adminServicesList",
              s.name,
              s.price,
              s.icon,
              "service-row"
            )
          );
        if (data.addons)
          data.addons.forEach((a) =>
            createRow("adminAddonsList", a.name, a.price, a.icon, "addon-row")
          );
        if (data.visuals)
          data.visuals.forEach((v) =>
            createRow("adminVisualsList", v.name, v.price, v.icon, "visual-row")
          );

        // Load Settings
        if (data.logoPrice)
          document.getElementById("adminLogoPrice").value = data.logoPrice;
        if (data.fastPercent)
          document.getElementById("adminFastPercent").value = data.fastPercent;
        if (data.slowPercent)
          document.getElementById("adminSlowPercent").value = data.slowPercent;
      }
    });
}
document.addEventListener("DOMContentLoaded", () =>
  setTimeout(loadCalcData, 1000)
);
/* =========================================
   👁️ ORDER DETAILS MODAL LOGIC
   ========================================= */

window.showOrderDetails = function (orderId) {
  // 1. Find the order data from the global array
  const order = allOrdersData.find((o) => o.id === orderId);

  if (!order) {
    showAlert("تعذر العثور على بيانات الطلب", "خطأ");
    return;
  }

  const modal = document.getElementById("orderDetailsModal");
  const content = document.getElementById("modalContent");

  // 2. Build Items List (Full List)
  let itemsHTML = '<ul style="padding-right:20px; color:#ddd; margin:0;">';
  if (Array.isArray(order.items)) {
    order.items.forEach((item) => {
      itemsHTML += `<li style="margin-bottom:5px;">${item}</li>`;
    });
  } else {
    itemsHTML += `<li>${order.items}</li>`;
  }
  itemsHTML += "</ul>";

  // 3. Build Colors HTML
  let colorsHTML = "";
  if (order.colors && Array.isArray(order.colors) && order.colors.length > 0) {
    colorsHTML = '<div class="color-grid">';
    order.colors.forEach((colorCode) => {
      colorsHTML += `
                <div class="color-circle-box">
                    <div class="color-circle" style="background:${colorCode}"></div>
                    <span class="color-code">${colorCode}</span>
                </div>
            `;
    });
    colorsHTML += "</div>";
  } else {
    colorsHTML = '<span style="color:#666;">لا توجد ألوان محددة</span>';
  }

  // 4. WhatsApp Button for the modal
  let waBtn = "";
  if (order.phone) {
    waBtn = `
            <a href="https://wa.me/20${order.phone}" target="_blank" class="btn-cyber" style="margin-top:10px; display:inline-flex; width:auto; text-decoration:none;">
                <i class="fab fa-whatsapp"></i> تواصل مع العميل
            </a>
        `;
  }

  // 5. Inject Content
  content.innerHTML = `
        <div class="order-detail-row">
            <span class="order-label">العميل</span>
            <div class="order-value">${order.customerName} (${
    order.phone
  })</div>
        </div>

        <div class="order-detail-row">
            <span class="order-label">التفاصيل الكاملة</span>
            <div class="order-value" style="font-size:0.9rem;">${itemsHTML}</div>
        </div>

        <div class="order-detail-row">
            <span class="order-label">الألوان المختارة</span>
            <div class="order-value">${colorsHTML}</div>
        </div>

        <div class="order-detail-row">
            <span class="order-label">ملاحظات العميل</span>
            <div class="order-value" style="color:${
              order.notes ? "#fff" : "#666"
            };">
                "${order.notes || "لا توجد ملاحظات إضافية"}"
            </div>
        </div>

        <div class="order-detail-row" style="background:rgba(212, 175, 55, 0.1); border-color:var(--gold);">
            <span class="order-label" style="color:var(--gold);">الإجمالي والوقت</span>
            <div class="order-value">
                💰 ${order.total} <span style="margin:0 10px;">|</span> ⏳ ${
    order.time || "غير محدد"
  }
            </div>
        </div>

        <div style="text-align:center;">${waBtn}</div>
    `;

  // 6. Show Modal
  modal.classList.add("active");
};

window.closeOrderDetails = function () {
  document.getElementById("orderDetailsModal").classList.remove("active");
};
