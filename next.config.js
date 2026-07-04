/** @type {import('next').NextConfig} */
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/ingest/:path*',
        destination: `${posthogHost}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
