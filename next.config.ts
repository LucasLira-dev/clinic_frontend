import type { NextConfig } from "next";

const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/admin/:path*',
        destination: `${backendUrl}/admin/:path*`,
      },
      {
        source: '/appointments/:path*',
        destination: `${backendUrl}/appointments/:path*`,
      },
      {
        source: '/blog/:path*',
        destination: `${backendUrl}/blog/:path*`,
      },
      {
        source: '/doctor/:path*',
        destination: `${backendUrl}/doctor/:path*`,
      },
    ];
  },
};

export default nextConfig;
