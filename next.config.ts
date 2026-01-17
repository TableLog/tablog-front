import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'img.daisyui.com',
      'k.kakaocdn.net',
      'lh3.googleusercontent.com',
      'onceclick.s3.ap-northeast-2.amazonaws.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tablelog.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  async rewrites() {
    return [
      // /api/v1/logout는 Next.js API Route에서 쿠키 삭제를 처리하므로 프록시 제외
      { source: '/api/v1/logout', destination: '/api/v1/logout' },
      {
        // proxy
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
