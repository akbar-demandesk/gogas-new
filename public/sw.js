if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + ".js", c).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, n) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let o = {};
    const r = (e) => a(e, i),
      t = {
        module: {
          uri: i,
        },
        exports: o,
        require: r,
      };
    s[i] = Promise.all(c.map((e) => t[e] || r(e))).then((e) => (n(...e), o));
  };
}

define(["./workbox-58cdce56"], function (e) {
  "use strict";

  importScripts();
  self.skipWaiting(); // ✅ Forces activation of new SW
  e.clientsClaim(); // ✅ Takes control immediately

  // ✅ Precache and Cache Management
  e.precacheAndRoute(
    [
      { url: "/offline.html", revision: "1" },
      {
        url: "/_next/dynamic-css-manifest.json",
        revision: "d751713988987e9331980363e24189ce",
      },
      { url: "/manifest.json", revision: "e7c2c9aa327fb77d20f9b952057cda1d" },
      { url: "/favicon.ico", revision: "c30c7d42707a47a3f4591831641e50dc" },
    ],
    {
      ignoreURLParametersMatching: [],
    }
  );

  e.cleanupOutdatedCaches(); // ✅ Clean outdated cache automatically

  // ✅ Cache homepage & dashboard using "Network First" (so latest content is fetched when online)
  e.registerRoute(
    "/",
    new e.NetworkFirst({
      cacheName: "start-url",
      plugins: [
        {
          cacheWillUpdate: async ({ request, response }) =>
            response && response.type === "opaqueredirect"
              ? new Response(response.body, {
                  status: 200,
                  statusText: "OK",
                  headers: response.headers,
                })
              : response,
        },
      ],
    }),
    "GET"
  );

  e.registerRoute(
    /\/dashboard\/home/,
    new e.StaleWhileRevalidate({
      cacheName: "dashboard-cache",
      plugins: [
        new e.ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 2592e3 }),
      ],
    }),
    "GET"
  );

  // ✅ Cache API responses & other pages
  e.registerRoute(
    /^https?.*/,
    new e.NetworkFirst({
      cacheName: "pages-cache",
      plugins: [
        new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 2592e3 }),
      ],
    }),
    "GET"
  );

  // ✅ Cache Images
  e.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
    new e.CacheFirst({
      cacheName: "images-cache",
      plugins: [
        new e.ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 2592e3 }),
      ],
    }),
    "GET"
  );

  // ✅ Cache JS, CSS, Fonts, JSON
  e.registerRoute(
    /\.(?:js|css|woff2|woff|ttf|eot|json)$/,
    new e.StaleWhileRevalidate({
      cacheName: "static-assets-cache",
      plugins: [
        new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 604800 }),
      ],
    }),
    "GET"
  );

  // ✅ Fallback for offline pages
  self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installing...");
    self.skipWaiting(); // ✅ Forces activation
  });

  self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activated!");
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (
              ![
                "dashboard-cache",
                "static-assets-cache",
                "forms-cache",
                "offlinedata-cache",
              ].includes(cache)
            ) {
              console.log("[Service Worker] Deleting old cache:", cache);
              return caches.delete(cache);
            }
          })
        );
      })
    );
    self.clients.claim(); // ✅ Forces SW to take control immediately
  });

  // ✅ Fetch & Serve from Cache when Offline
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request).then((response) => {
          return response || caches.match("/offline.html"); // ✅ Show offline page if not found in cache
        });
      })
    );
  });
});
