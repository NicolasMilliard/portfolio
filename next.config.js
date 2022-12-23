/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLE_TAG_MANAGER: process.env.GOOGLE_TAG_MANAGER,
  },
};

module.exports = nextConfig;
