/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["unsplash.com", "firebasestorage.googleapis.com"],
    minimumCacheTTL: 60
  }
};

export default nextConfig;
