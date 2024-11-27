/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["unsplash.com", "firebasestorage.googleapis.com"],
    minimumCacheTTL: 60
  }
};

export default nextConfig;
