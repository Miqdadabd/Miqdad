
const CACHE_NAME = "jurnal-v10-emas-fix";
const assets = [
  "./",
  "./index.html",
  "./manifest.json",
  "./logo-192.png",
  "./logo-512.png"
];

// Install & Cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Activate & Cleanup Cache Lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch dari Cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});

