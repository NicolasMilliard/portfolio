/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
        port: '',
        pathname: '/*',
      },
    ],
  },
  env: {
    GOOGLE_TAG_MANAGER: process.env.GOOGLE_TAG_MANAGER,
    NEXT_PUBLIC_HYGRAPH_API_KEY: process.env.NEXT_PUBLIC_HYGRAPH_API_KEY,
    HYGRAPH_TOKEN: process.env.HYGRAPH_TOKEN,
  },
};

module.exports = nextConfig;
