// // // next.config.js
// // import withPWA from "next-pwa";

// // const pwaOptions = {
// //   dest: "public", // Next-pwa will output the service worker here
// //   register: true, // Enable automatic registration in production
// //   // swSrc: "public/sw.js", // Use your custom service worker file (relative to project root)
// //   skipWaiting: true, // Force the waiting service worker to become active
// //   disable: process.env.NODE_ENV === "development", // Disable SW in development mode
// // };

// // const nextConfig = {
// //   reactStrictMode: true,
// //   eslint: {
// //     ignoreDuringBuilds: true,
// //   },
// // };

// // export default withPWA(pwaOptions)(nextConfig);

import withPWA from "next-pwa";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const isDev = phase !== PHASE_PRODUCTION_BUILD;

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: isDev,
  },
};

export default withPWA(nextConfig);
