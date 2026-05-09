import type { NextConfig } from "next";

const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const securityHeaders = [
  // Prevents the page from being embedded in an <iframe> on other origins.
  // Mitigates clickjacking attacks on login, delete account and appointment actions.
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },

  // Prevents browsers from guessing the content type (MIME sniffing).
  // Stops a malicious file upload from being executed as a script.
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Controls how much referrer info is sent to external sites.
  // Prevents auth callback/verification URLs from leaking to third-party domains.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // Disables browser features unused by this app.
  // Reduces attack surface if XSS occurs (attacker can't access camera/mic/location).
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },

  // Content Security Policy — restricts where scripts, styles, images and connections can come from.
  // Main defense against XSS: even if an attacker injects a script, CSP blocks its execution or external calls.
  // - script-src: cloudinary upload widget is loaded from CDN, must be explicitly allowed
  // - img-src: allows same-origin, data URIs, Cloudinary (doctor photos) and OAuth provider avatars
  // - connect-src: better-auth client calls the backend directly (not through Next.js rewrite proxy)
  // - frame-ancestors: blocks embedding from any origin other than self (reinforces X-Frame-Options)
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://upload-widget.cloudinary.com",
      "style-src 'self' 'unsafe-inline' https://upload-widget.cloudinary.com",
      "img-src 'self' data: blob: https://res.cloudinary.com https://lh3.googleusercontent.com https://avatars.githubusercontent.com",
      "font-src 'self'",
      `connect-src 'self' ${backendUrl}`,
      "worker-src blob:",
      "frame-src 'self' https://accounts.google.com https://github.com https://upload-widget.cloudinary.com",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
];

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
        source: '/blog-api',
        destination: `${backendUrl}/blog`,
      },
      {
        source: '/blog-api/:path*',
        destination: `${backendUrl}/blog/:path*`,
      },
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
        source: '/doctor/:path*',
        destination: `${backendUrl}/doctor/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
