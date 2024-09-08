const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:5001/api',
  },
  webpack: (config) => {
    config.resolve.alias['@shared'] = path.resolve(__dirname, '../shared');
    return config;
  },
}

module.exports = nextConfig
