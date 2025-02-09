// import withPWA from "next-pwa";
// import { PHASE_PRODUCTION_BUILD } from "next/constants.js";

// export default (phase) => {
//   const isDev = phase !== PHASE_PRODUCTION_BUILD;

//   const nextConfig = {
//     reactStrictMode: true,
//     eslint: {
//       ignoreDuringBuilds: true, // Ignore eslint errors during builds
//     },
//     pwa: {
//       dest: "public", // Where the service worker will be generated
//       register: true, // Automatically register the service worker in production
//       skipWaiting: true, // Skip waiting state for SW updates
//       disable: isDev, // Disable PWA in development mode
//       customWorkerDir: "public/service-worker/sw-new.js", // ✅ Specify custom service worker folder
//     },
//   };

//   return withPWA(nextConfig);
// };

import withPWA from "next-pwa";
import { PHASE_PRODUCTION_BUILD } from "next/constants.js";

export default (phase) => {
  const isDev = phase !== PHASE_PRODUCTION_BUILD;

  const nextConfig = {
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true, // Ignore eslint errors during builds
    },
    pwa: {
      dest: "public", // ✅ Final SW will be generated in `public/`
      register: true, // ✅ Auto-registers in production
      skipWaiting: true, // ✅ Forces updates immediately
      disable: isDev, // ✅ Disable PWA in development mode
      customWorkerDir: "public/service-worker", // ✅ Ensures `sw-new.js` is inside `public/service-worker`
    },
  };

  return withPWA(nextConfig);
};
