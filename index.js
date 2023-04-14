const CACHE_NAME = "analog-clock-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/main.js",
  "/images/icon-72x72.png",
  "/images/icon-96x96.png",
  "/images/icon-128x128.png",
  "/images/icon-144x144.png",
  "/images/icon-152x152.png",
  "/images/icon-192x192.png",
  "/images/icon-384x384.png",
  "/images/icon-512x512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
