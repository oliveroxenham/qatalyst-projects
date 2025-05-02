import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/projects',
        permanent: true,
      },
    ]
  },
  // Server-side env variables are automatically available in Server Components and API Routes
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v3jxx0dboaeguwsf.public.blob.vercel-storage.com',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  }
};

export default nextConfig;
