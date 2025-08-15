import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // basePath: '/tablog-front',
  images: {
    domains: [
      'img.daisyui.com',
      'k.kakaocdn.net',
      'lh3.googleusercontent.com',
      'onceclick.s3.ap-northeast-2.amazonaws.com',
      'tablelog.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  async rewrites() {
    return [
      {
        // proxy
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
