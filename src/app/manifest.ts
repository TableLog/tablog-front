import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '식탁일기',
    short_name: 'Tablog',
    description: '한 끼의 기록이 일상이 되다',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#D66060',
    icons: [
      {
        src: '/icons/192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
