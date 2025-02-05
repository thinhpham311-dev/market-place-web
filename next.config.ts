import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "/api/admin/:path*",
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images2.thanhnien.vn',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  }
};

export default nextConfig;
