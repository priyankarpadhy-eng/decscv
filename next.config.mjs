/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  webpack: (config) => {
    // For @react-pdf/renderer on client or SSR
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/(dashboard|editor|settings|login|signup|onboarding)(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: '/__/auth/:path*',
        destination: 'https://decs-cv.firebaseapp.com/__/auth/:path*',
      },
    ];
  },
};

export default nextConfig;
