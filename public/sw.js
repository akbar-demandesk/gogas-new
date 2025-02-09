// Define a cache name and list of pages to cache.
const CACHE_NAME = "pwa-cache-v1";
const OFFLINE_URL = "/offline.html";
const PAGES_TO_CACHE = [
  "/", // root (if desired)
  "/dashboard/home", // home page
  "/go-gas-from/GoGasForm", // first form page
  "/go-gas-from/GoGasForm1", // second form page (adjust if the route differs)
  "/offlinedata/offlinedatatable", // offline data table page
];

// Installation: Pre-cache the defined pages and the offline fallback.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([...PAGES_TO_CACHE, OFFLINE_URL]);
    })
  );
  // Activate new service worker immediately.
  self.skipWaiting();
});

// Activation: Claim clients immediately.
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch: For navigations, try to fetch from network first; if that fails, serve the offline fallback.
self.addEventListener("fetch", (event) => {
  // We only want to handle navigation requests (e.g., full page loads).
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Optionally, update the cache with the fresh response here.
          return response;
        })
        .catch(() => {
          // If network fails, return the offline fallback.
          return caches.match(OFFLINE_URL);
        })
    );
  }
});
