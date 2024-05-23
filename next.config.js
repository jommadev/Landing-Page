/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jomma.online",
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "staging.jomma.online",
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig
