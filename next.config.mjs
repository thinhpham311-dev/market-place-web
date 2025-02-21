/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: () => [
    {
      source: "/admin/:path*",
      destination: "/api/admin/:path*",
    },
  ],
  experimental: {
    forceSwcTransforms: true,
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"]
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
        protocol: 'https',
        hostname: 'cdn.grofers.com',
        pathname: "**"
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  }
};

export default nextConfig;