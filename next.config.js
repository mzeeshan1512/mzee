/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: process?.env?.NODE_ENV === "production" ? false : true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  images: {
    domains: [
      "unsplash.com",
      "firebasestorage.googleapis.com",
      "googleusercontent.com",
      "*.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ],
    minimumCacheTTL: 60
  },
  productionBrowserSourceMaps:
    process?.env?.NODE_ENV === "production" ? false : true,
  compiler: {
    removeConsole: process?.env?.NODE_ENV === "production"
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin",
        permanent: true
      },
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
