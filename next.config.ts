import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    base_url: 'https://market-place-server-whko.onrender.com',
  },
};

export default nextConfig;
