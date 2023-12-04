/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            pathname: '**',
            port: '3000',
          },
          {
            protocol: 'https',
            hostname: 'matie-store.vercel.app',
            pathname: '**',
            port: '0000',
          },
        ],
      },
}

module.exports = nextConfig
