const CACHE_NAME = 'sikosib-cache-v1';
const urlsToCache = [
  '/koperasi-simpanan/',
  '/koperasi-simpanan/index.html',
  '/koperasi-simpanan/manifest.json',
  '/koperasi-simpanan/icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          console.warn('Network request failed and no cache available');
        });
      })
  );
});
