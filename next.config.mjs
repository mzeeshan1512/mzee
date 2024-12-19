/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps:
    process?.env?.NODE_ENV === "production" ? false : true,
  reactStrictMode: process?.env?.NODE_ENV === "production" ? false : true,
  images: {
    domains: ["unsplash.com", "firebasestorage.googleapis.com"],
    minimumCacheTTL: 60
  },
  compiler: {
    removeConsole: process?.env?.NODE_ENV === "production"
  }
  // webpack: (config, { dev, isServer, productionBrowserSourceMaps }) => {
  //   console.log({ config });
  //   // if (!dev && !isServer) {
  //   //   // Suppress React runtime errors in production
  //   //   config.optimization.minimize = true;
  //   // }
  //   return config;
  // }
};

export default nextConfig;
