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

// import withPWA from "next-pwa";

// const isDev = process.env.NODE_ENV === "development";

// const nextConfig = {
//   reactStrictMode: true,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//     disable: isDev,
//   },
// };

// export default withPWA(nextConfig);

import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const nextConfig = withPWA({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Ensures no ESLint warnings break the build
  },
  webpack(config) {
    config.resolve.fallback = { fs: false }; // Prevents file system issues in Webpack
    return config;
  },
  experimental: {
    emotion: { sourceMap: true, autoLabel: "always", labelFormat: "[local]" },
  },
  compiler: {
    styledComponents: true, // Ensures styled-components support
  },
  pwa: {
    dest: "public", // PWA files output here
    register: true,
    skipWaiting: true,
    disable: isDev, // Disable PWA in development mode
  },
});

export default nextConfig;
