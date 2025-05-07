import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['img.daisyui.com', 'k.kakaocdn.net', 'lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
