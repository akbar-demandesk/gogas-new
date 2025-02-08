import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore ESLint errors during build
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
  register: true,
  skipWaiting: true, // ✅ Forces immediate activation
  buildExcludes: [
    /_next\/dynamic-css-manifest\.json$/, // ✅ Prevent Workbox from caching this missing file
  ],
  mode: "production",
  swSrc: "public/sw-custom.js",
});
