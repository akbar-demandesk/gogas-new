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

  // ✅ Skip waiting and take control immediately
  self.skipWaiting();
  workbox.core.clientsClaim();

  // ✅ Precache and cleanup outdated caches
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
  workbox.precaching.cleanupOutdatedCaches();

  // ✅ Caching Strategies

  // Cache HTML pages using Network First
  workbox.routing.registerRoute(
    ({ request }) => request.mode === "navigate",
    new workbox.strategies.NetworkFirst({
      cacheName: "pages-cache",
      networkTimeoutSeconds: 10,
    })
  );

  // Cache CSS, JS, and Fonts using Stale-While-Revalidate
  workbox.routing.registerRoute(
    ({ request }) => ["style", "script", "font"].includes(request.destination),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-assets",
    })
  );

  // Cache Images using Cache-First with Expiration Policy
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

  console.log("✅ Workbox setup complete!");
} else {
  console.error("❌ Workbox failed to load");
}

// ✅ Offline Fallback Setup
const CACHE_NAME = "pwa-cache-v2";
const OFFLINE_URL = "/offline.html"; // Ensure offline.html exists in /public

const PAGES_TO_CACHE = [
  "/",
  "/dashboard/home",
  "/go-gas-from/GoGasForm",
  "/go-gas-from/GoGasForm1",
  "/offlinedata/offlinedatatable",
  OFFLINE_URL,
];

// ✅ Install Event - Precache important pages for offline use
self.addEventListener("install", (event) => {
  console.log("⚡ Service Worker Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("🗂️ Caching Pages:", PAGES_TO_CACHE);
      return cache.addAll(PAGES_TO_CACHE).catch((err) => {
        console.error("❌ Cache addAll failed:", err);
      });
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
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        console.warn("⚠️ Network failed, serving offline.html");
        return caches.match(OFFLINE_URL);
      })
    );
  }
});
