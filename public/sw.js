const CACHE_NAME = 'choji-store-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo/logo.svg',
  '/logo/logo-footer.svg',
  '/images/choji.jpg',
  '/favicon/favicon.svg',
  '/favicon/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
