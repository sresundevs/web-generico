/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'chatwoot.leapfinancial.com' }]
  }
}

module.exports = nextConfig
