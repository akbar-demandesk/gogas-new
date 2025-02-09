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
      dest: "public", // Where the service worker will be generated
      register: true, // Automatically register the service worker in production
      skipWaiting: true, // Skip waiting state for SW updates
      disable: isDev, // Disable PWA in development mode
    },
  };

  return withPWA(nextConfig);
};
