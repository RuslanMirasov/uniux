import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    domains: ['s3-alpha.figma.com', 'pluggedin.ru'], // Добавьте нужный домен
  },
};

export default nextConfig;
