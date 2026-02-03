import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  /* config options here */
  // serverExternalPackages: [], // Add packages here if needed, e.g. ['bcryptjs']
};

export default nextConfig;
