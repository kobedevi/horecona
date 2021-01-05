/*
====================
---service worker---
====================
*/
/* eslint-disable no-restricted-globals */

// debug status
const DEBUG = false;
// offline page
const OFFLINE_URL = 'offline.html';
// version
const CACHE_NAME = 'v1';

// on install
self.addEventListener('install', (e) => {
  if (DEBUG) console.log('[Serviceworker] installed');

  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
      })
      .then(() => {
        if (DEBUG) console.log('Cached assets: ', OFFLINE_URL);
      })
      .catch((err) => console.err(err.message)),
  );
});

// when active
self.addEventListener('activate', (e) => {
  if (DEBUG) console.log(`[Serviceworker] ${CACHE_NAME} is active & ready to handle fetches`);

  // remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName !== CACHE_NAME) {
          return caches.delete(cacheName);
        }
        return null;
      }),
    )),
  );
});

// when fetch is triggered
self.addEventListener('fetch', (e) => {
  if (DEBUG) console.log('[Serviceworker] fetching', e.request.url);

  e.respondWith(
    fetch(e.request)
      .catch((err) => {
        if (DEBUG) console.info('Fetch failed, returing offline page', err);
        return caches.match(OFFLINE_URL);
      }),
  );
});
