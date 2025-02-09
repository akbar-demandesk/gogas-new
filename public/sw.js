// // Define a cache name and list of pages to cache.
// const CACHE_NAME = "pwa-cache-v1";
// const OFFLINE_URL = "/offline.html";
// const PAGES_TO_CACHE = [
//   "/", // root (if desired)
//   "/dashboard/home", // home page
//   "/go-gas-from/GoGasForm", // first form page
//   "/go-gas-from/GoGasForm1", // second form page (adjust if the route differs)
//   "/offlinedata/offlinedatatable", // offline data table page
// ];

// // Installation: Pre-cache the defined pages and the offline fallback.
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll([...PAGES_TO_CACHE, OFFLINE_URL]);
//     })
//   );
//   // Activate new service worker immediately.
//   self.skipWaiting();
// });

// // Activation: Claim clients immediately.
// self.addEventListener("activate", (event) => {
//   event.waitUntil(self.clients.claim());
// });

// // Fetch: For navigations, try to fetch from network first; if that fails, serve the offline fallback.
// self.addEventListener("fetch", (event) => {
//   // We only want to handle navigation requests (e.g., full page loads).
//   if (event.request.mode === "navigate") {
//     event.respondWith(
//       fetch(event.request)
//         .then((response) => {
//           // Optionally, update the cache with the fresh response here.
//           return response;
//         })
//         .catch(() => {
//           // If network fails, return the offline fallback.
//           return caches.match(OFFLINE_URL);
//         })
//     );
//   }
// });

// public/sw.js

import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { clientsClaim } from "workbox-core";

// Immediately take control of the page
self.skipWaiting();
clientsClaim();

// ✅ Workbox needs this line to inject the manifest automatically
precacheAndRoute(self.__WB_MANIFEST || []);

// Cleanup outdated caches
cleanupOutdatedCaches();

// Define a cache name and list of pages to cache.
const CACHE_NAME = "pwa-cache-v1";
const OFFLINE_URL = "/offline.html";
const PAGES_TO_CACHE = [
  "/", // root (if desired)
  "/dashboard/home", // home page
  "/go-gas-from/GoGasForm", // first form page
  "/go-gas-from/GoGasForm1", // second form page
  "/offlinedata/offlinedatatable", // offline data table page
];

// Installation: Pre-cache the defined pages and the offline fallback.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([...PAGES_TO_CACHE, OFFLINE_URL]);
    })
  );
  self.skipWaiting();
});

// Activation: Claim clients immediately.
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// ✅ Workbox caching for navigations (HTML pages)
registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: "pages-cache",
    networkTimeoutSeconds: 10,
  })
);

// ✅ Workbox caching for CSS, JS, and fonts
registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font",
  new StaleWhileRevalidate({
    cacheName: "static-assets",
  })
);

// ✅ Workbox caching for images
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Fetch: For navigations, try to fetch from network first; if that fails, serve the offline fallback.
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => response)
        .catch(() => caches.match(OFFLINE_URL))
    );
  }
});
