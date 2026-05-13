import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "av-morzze.s3.amazonaws.com",
        pathname: "/blog/**",
      },
    ],
  },
};

export default nextConfig;