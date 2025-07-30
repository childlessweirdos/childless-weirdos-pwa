// Cache name
const cacheName = 'childless-weirdos-pwa-cache-v1';

// Files to cache
const filesToCache = [
  '/index.html',         // No leading slash
  '/Latest-strip.png',   // Corrected path
  '/style.css',
  '/manifest.json',
  '/cwicon192.png',      // Corrected path
  '/cwicon512.png',      // Corrected path
];

// Install Service Worker and cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker installed, caching files...');
      return cache.addAll(filesToCache);
    })
  );
});

// Fetch files from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);  // Fetch if not in cache
    })
  );
});

// Update service worker (cleanup old caches)
self.addEventListener('activate', (event) => {
  const cacheWhiteList = [cacheName];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});
