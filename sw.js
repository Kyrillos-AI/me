self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
});

self.addEventListener("fetch", (e) => {
  // هذا الجزء فارغ حالياً لتسهيل التجربة
  e.respondWith(fetch(e.request));
});
const CACHE_NAME = "kyrillos-v1";
const assets = ["/", "/index.html", "/style.css", "/script.js", "/logo.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(assets)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
