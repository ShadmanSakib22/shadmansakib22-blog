import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "http", hostname: "**.atwebpages.com" },
      { protocol: "https", hostname: "**.atwebpages.com" },
      { protocol: "http", hostname: "**.vercel.app" },
      { protocol: "https", hostname: "**.vercel.app" },
      { protocol: "http", hostname: "localhost", port: "3000" },
    ],
  },
};

export default nextConfig;
