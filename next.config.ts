import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "av-morzze.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "av-morzze.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;