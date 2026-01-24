import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* images optimization settings */
  images: {
    domains: ['your-image-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
