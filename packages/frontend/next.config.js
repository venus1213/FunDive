const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  // Configure MDX for blog content
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fundive-c795f.s3.ap-northeast-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'fundive-c795f.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
    dangerouslyAllowSVG: true,
  },
}); 