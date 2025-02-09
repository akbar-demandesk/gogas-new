// importScripts(
//   "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
// );

// if (workbox) {
//   console.log("✅ Workbox loaded successfully!");
//   workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
//   workbox.core.clientsClaim();
//   workbox.core.skipWaiting();

//   workbox.routing.registerRoute(
//     ({ request }) => request.mode === "navigate",
//     new workbox.strategies.NetworkFirst({
//       cacheName: "pages-cache",
//       networkTimeoutSeconds: 10,
//     })
//   );

//   workbox.routing.registerRoute(
//     ({ request }) => ["style", "script", "font"].includes(request.destination),
//     new workbox.strategies.StaleWhileRevalidate({
//       cacheName: "static-assets",
//     })
//   );

//   workbox.routing.registerRoute(
//     ({ request }) => request.destination === "image",
//     new workbox.strategies.CacheFirst({
//       cacheName: "images-cache",
//       plugins: [
//         new workbox.expiration.ExpirationPlugin({
//           maxEntries: 60,
//           maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
//         }),
//       ],
//     })
//   );
// } else {
//   console.error("❌ Workbox failed to load");
// }

// // ✅ Take control of clients immediately
// self.skipWaiting();
// clientsClaim();

// console.log("✅ Service Worker Loaded Successfully!");

// // ✅ Workbox needs this line to inject the manifest automatically
// precacheAndRoute(self.__WB_MANIFEST || []);

// // ✅ Cleanup outdated caches
// cleanupOutdatedCaches();

// // ✅ Define a cache name and offline fallback
// const CACHE_NAME = "pwa-cache-v2";
// const OFFLINE_URL = "../offline.html";
// const PAGES_TO_CACHE = [
//   "/", // Root/home page
//   "/dashboard/home",
//   "/go-gas-from/GoGasForm",
//   "/go-gas-from/GoGasForm1",
//   "/offlinedata/offlinedatatable",
// ];

// // ✅ Install Event - Precache pages for offline use
// self.addEventListener("install", (event) => {
//   console.log("⚡ Service Worker Installing...");
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("🗂️ Caching Pages:", PAGES_TO_CACHE);
//       return cache.addAll([...PAGES_TO_CACHE, OFFLINE_URL]).catch((err) => {
//         console.error("❌ Cache addAll failed:", err);
//       });
//     })
//   );
//   self.skipWaiting();
// });

// // ✅ Activate Event - Cleanup old caches
// self.addEventListener("activate", (event) => {
//   console.log("⚡ Service Worker Activated!");
//   event.waitUntil(
//     caches.keys().then((keys) => {
//       return Promise.all(
//         keys.map((key) => {
//           if (key !== CACHE_NAME) {
//             console.log("🗑️ Deleting old cache:", key);
//             return caches.delete(key);
//           }
//         })
//       );
//     })
//   );
//   self.clients.claim();
// });

// // ✅ Workbox Caching Strategies
// // Cache HTML pages using Network First
// registerRoute(
//   ({ request }) => request.mode === "navigate",
//   new NetworkFirst({
//     cacheName: "pages-cache",
//     networkTimeoutSeconds: 10,
//   })
// );

// // Cache CSS, JS, and Fonts using Stale-While-Revalidate
// registerRoute(
//   ({ request }) => ["style", "script", "font"].includes(request.destination),
//   new StaleWhileRevalidate({
//     cacheName: "static-assets",
//   })
// );

// // Cache Images using Cache-First with Expiration Policy
// registerRoute(
//   ({ request }) => request.destination === "image",
//   new CacheFirst({
//     cacheName: "images-cache",
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
//       }),
//     ],
//   })
// );

// // ✅ Fetch Event - Serve cached offline fallback for navigation requests
// self.addEventListener("fetch", (event) => {
//   if (event.request.mode === "navigate") {
//     event.respondWith(
//       fetch(event.request)
//         .then((response) => response)
//         .catch(() => {
//           console.warn("⚠️ Network failed, serving offline.html");
//           return caches.match(OFFLINE_URL);
//         })
//     );
//   }
// });

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);

if (workbox) {
  console.log("✅ Workbox loaded successfully!");

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  // ✅ Caching strategies

  // 🔹 Cache HTML pages using NetworkFirst strategy
  workbox.routing.registerRoute(
    ({ request }) => request.mode === "navigate",
    new workbox.strategies.NetworkFirst({
      cacheName: "pages-cache",
      networkTimeoutSeconds: 10,
    })
  );

  // 🔹 Cache CSS, JS, and Fonts using Stale-While-Revalidate
  workbox.routing.registerRoute(
    ({ request }) => ["style", "script", "font"].includes(request.destination),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-assets",
    })
  );

  // 🔹 Cache Images using Cache-First with Expiration
  workbox.routing.registerRoute(
    ({ request }) => request.destination === "image",
    new workbox.strategies.CacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        }),
      ],
    })
  );

  console.log("✅ Custom Workbox Service Worker loaded!");
} else {
  console.error("❌ Workbox failed to load");
}

// ✅ Offline fallback setup
const CACHE_NAME = "pwa-cache-v7"; // 🔥 Change version to force update
const OFFLINE_URL = "/offline.html"; // Ensure this file exists in /public

const PAGES_TO_CACHE = [
  "/", // ✅ Root route (Homepage)
  "/dashboard/home",
  "/go-gas-from/go-gas-form",
  "/go-gas-from/go-gas-form1",
  "/offlinedata/offlinedatatable",
  "/offline",
];

// ✅ Install Event - Cache important pages for offline use
self.addEventListener("install", (event) => {
  console.log("⚡ Installing Service Worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("🗂️ Caching Pages:", PAGES_TO_CACHE);
      return cache
        .addAll(PAGES_TO_CACHE)
        .then(() => console.log("✅ All pages cached successfully!"))
        .catch((err) => console.error("❌ Cache addAll failed:", err));
    })
  );
  self.skipWaiting();
});

// ✅ Activate Event - Cleanup old caches
self.addEventListener("activate", (event) => {
  console.log("⚡ Service Worker Activated!");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("🗑️ Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ✅ Fetch Event - Serve cached offline fallback for navigation requests
self.addEventListener("fetch", (event) => {
  console.log("🔍 Fetching:", event.request.url);
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        console.log("✅ Fetched from network:", event.request.url);
        return response;
      })
      .catch(() => {
        console.warn("⚠️ Network failed, trying cache:", event.request.url);
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match(OFFLINE_URL);
        });
      })
  );
});

// ✅ Debugging: Log Cached Files
caches
  .open(CACHE_NAME)
  .then((cache) => cache.keys())
  .then((keys) => console.log("Cached files:", keys));
