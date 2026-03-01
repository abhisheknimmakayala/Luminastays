/**
 * next.config.ts
 * Next.js configuration for Lumina Stays.
 *
 * images.formats      – Serve AVIF/WebP for optimal compression on mobile
 * images.remotePatterns – Unsplash allowed as external image source (placeholder photos).
 *                         Remove once real property photos are hosted (e.g. Cloudinary / S3).
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
