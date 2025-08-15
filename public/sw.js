// Service Worker for WH Pubs
// Provides offline functionality and faster loading for return visits

const CACHE_NAME = 'whpubs-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/offline.html',
  '/images/hero-fallback.jpg',
  '/images/book-table-hero.jpg',
  '/images/logo.png',
  '/js/image-fallback.js'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first for dynamic content, cache first for static
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-HTTP(S) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Cache first for static assets (images, fonts, CSS, JS)
  if (request.destination === 'image' || 
      request.destination === 'font' || 
      request.destination === 'style' || 
      request.destination === 'script') {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          // Return fallback for images if network fails
          if (request.destination === 'image') {
            return caches.match('/images/hero-fallback.jpg');
          }
        });
      })
    );
    return;
  }

  // Network first for HTML pages and API calls
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful HTML responses
        if (response.status === 200 && request.destination === 'document') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Return cached version if network fails
        return caches.match(request).then((response) => {
          if (response) {
            return response;
          }
          // Return offline page for navigation requests
          if (request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});