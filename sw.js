self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
});

self.addEventListener("fetch", (e) => {
  // هذا الجزء فارغ حالياً لتسهيل التجربة
  e.respondWith(fetch(e.request));
});
