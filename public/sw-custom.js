import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST || []); // ✅ Fix: Inject manifest here

const CACHE_NAME = "gogas-static-cache-v2";
const DYNAMIC_CACHE_NAME = "gogas-dynamic-cache-v1";

// ✅ Static Assets to Cache
const STATIC_ASSETS = [
  "/",
  "/dashboard/home", // ✅ Cache dashboard for offline mode
  "/offline.html", // ✅ Cache offline fallback page
  "/favicon.ico",
  "/icons/logo-gagas-192.png",
  "/icons/logo-gagas-512.png",
  "/manifest.json",
];

// ✅ Install Event: Cache Essential Pages & Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting(); // ✅ Activate new SW immediately
});

// ✅ Activate Event: Cleanup Old Caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // ✅ Ensure SW takes control immediately
});

// ✅ Fetch Event: Serve Cached Content & Handle Offline Mode
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // ✅ Handle Navigation Requests (HTML Pages)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || caches.match("/offline.html"); // ✅ Serve offline.html if page is not cached
          });
        })
    );
    return;
  }

  // ✅ Handle Static Assets (CSS, JS, Images, Fonts)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request)
          .then((response) => {
            return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(event.request.url, response.clone());
              return response;
            });
          })
          .catch(() => {
            // ✅ If it's an image request & offline, serve a placeholder
            if (event.request.destination === "image") {
              return caches.match("/icons/logo-gagas-192.png");
            }
          })
      );
    })
  );
});
