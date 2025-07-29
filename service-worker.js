// service-worker.js

// Cache name
const cacheName = 'childless-weirdos-pwa-cache-v1';

// Files to cache
const filesToCache = [
  '/',
  '/index.html',
  '/Latest-strip.png',
  '/style.css',
  '/manifest.json',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/cwicon192.png',
  '/images/cwicon512.png'
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
      return cachedResponse || fetch(event.request);
    })
  );
});

// Update service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
