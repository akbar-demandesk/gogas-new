self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("static-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/dashboard/home", // ✅ Cache dashboard page for offline mode
        "/offline.html", // ✅ Cache offline fallback page
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// ✅ Intercept Fetch Requests to Serve Cached Content When Offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open("dynamic-cache").then((cache) => {
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
});
