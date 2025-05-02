import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // // Add env variables that should be accessible to the client
  // env: {
  //   NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://qatalyst-demo.vercel.app',
  //   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  // },
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
