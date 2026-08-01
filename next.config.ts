import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve smaller, modern formats where the browser supports them.
    // AVIF is ~50% smaller than JPEG, WebP ~30% smaller.
    formats: ["image/avif", "image/webp"],
    // Keep optimized images cached for 1 year so repeat visits are instant.
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

export default nextConfig;
