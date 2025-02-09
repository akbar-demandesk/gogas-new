import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { clientsClaim } from "workbox-core";

// ✅ Take control of clients immediately
self.skipWaiting();
clientsClaim();

console.log("✅ Service Worker Loaded Successfully!");

// ✅ Workbox needs this line to inject the manifest automatically
precacheAndRoute(self.__WB_MANIFEST || []);

// ✅ Cleanup outdated caches
cleanupOutdatedCaches();

// ✅ Define a cache name and offline fallback
const CACHE_NAME = "pwa-cache-v2";
const OFFLINE_URL = "/offline.html";
const PAGES_TO_CACHE = [
  "/", // Root/home page
  "/dashboard/home",
  "/go-gas-from/GoGasForm",
  "/go-gas-from/GoGasForm1",
  "/offlinedata/offlinedatatable",
];

// ✅ Install Event - Precache pages for offline use
self.addEventListener("install", (event) => {
  console.log("⚡ Service Worker Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("🗂️ Caching Pages:", PAGES_TO_CACHE);
      return cache.addAll([...PAGES_TO_CACHE, OFFLINE_URL]).catch((err) => {
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

// ✅ Workbox Caching Strategies
// Cache HTML pages using Network First
registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: "pages-cache",
    networkTimeoutSeconds: 10,
  })
);

// Cache CSS, JS, and Fonts using Stale-While-Revalidate
registerRoute(
  ({ request }) => ["style", "script", "font"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "static-assets",
  })
);

// Cache Images using Cache-First with Expiration Policy
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

// ✅ Fetch Event - Serve cached offline fallback for navigation requests
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => response)
        .catch(() => {
          console.warn("⚠️ Network failed, serving offline.html");
          return caches.match(OFFLINE_URL);
        })
    );
  }
});
