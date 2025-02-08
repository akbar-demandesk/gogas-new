import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "production",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
  register: true,
  skipWaiting: true,
  buildExcludes: [
    /_next\/dynamic-css-manifest\.json$/, // ✅ Exclude this file from precaching
    /_next\/build-manifest\.json$/, // ✅ Prevent caching this too
    /_next\/export-marker\.json$/, // ✅ Avoid caching unnecessary files
  ],
  runtimeCaching: [
    // ✅ Ignore missing dynamic CSS manifest file to prevent Workbox error
    {
      urlPattern: /_next\/dynamic-css-manifest\.json$/,
      handler: "NetworkOnly",
    },
    {
      urlPattern: /_next\/build-manifest\.json$/,
      handler: "NetworkOnly",
    },
    // ✅ Cache all pages, but always fetch the latest when online
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    // ✅ Cache dashboard for offline access
    {
      urlPattern: /\/dashboard\/home/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "dashboard-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    // ✅ Cache offline page for handling offline mode
    {
      urlPattern: /\/offline.html/,
      handler: "CacheFirst",
      options: {
        cacheName: "offline-cache",
        expiration: {
          maxEntries: 1,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    // ✅ Cache static assets (JS, CSS, fonts, images)
    {
      urlPattern:
        /\.(?:png|jpg|jpeg|svg|gif|ico|woff2|woff|ttf|eot|json|js|css)$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-assets-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 30 days
        },
      },
    },
  ],
});
