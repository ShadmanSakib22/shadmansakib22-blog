import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "http", hostname: "shadmansakib22blog.atwebpages.com" },
      { protocol: "https", hostname: "shadmansakib22blog.atwebpages.com" },
    ],
  },
};

export default nextConfig;
