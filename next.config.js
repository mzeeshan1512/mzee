/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["unsplash.com", "firebasestorage.googleapis.com"],
    minimumCacheTTL: 60,
  },
//   async redirects() {
//     return [
//         {
//             source: "/admin",
//             destination: "/admin/dashboard",
//             permanent: true,
//         },
//         {
//           source: "/",
//           destination: "/auth/login",
//           permanent: true,
//       },
//     ];
// },
};

module.exports = nextConfig;
