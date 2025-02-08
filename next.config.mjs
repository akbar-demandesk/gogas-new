// // Use ESM `import` instead of `require`
// import withPwa from "next-pwa";

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   distDir: ".next",
//   reactStrictMode: true,
//   swcMinify: true,
//   compiler: {
//     removeConsole: process.env.NODE_ENV === "development",
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };

// export default withPwa({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
//   register: true,
//   skipWaiting: true,
// })(nextConfig);

import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "development",
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore ESLint errors in build
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV !== "production", // ✅ Enable PWA only in production
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/, // Cache all API and HTML pages
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 50, // Keep up to 50 pages cached
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        },
      },
    },
    {
      urlPattern: /\/dashboard\/home/, // ✅ Cache the home dashboard
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "dashboard-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico)$/, // Cache images
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // Cache images for 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:js|css|woff2|woff|ttf|eot|json)$/, // Cache static assets
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-assets-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 7, // Cache assets for 7 days
        },
      },
    },
  ],
})(nextConfig);
