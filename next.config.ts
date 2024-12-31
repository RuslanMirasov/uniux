import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-alpha.figma.com',
      },
      {
        protocol: 'https',
        hostname: 'pluggedin.ru',
      },
      {
        protocol: 'https',
        hostname: 'cdn.futura-sciences.com',
      },
    ],
  },
};

export default nextConfig;
