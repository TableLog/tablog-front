// app/fonts/pretendard.ts
import localFont from 'next/font/local';

export const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export const GyeonggiTitle = localFont({
  src: '../../public/fonts/Title_Medium.woff',
  variable: '--font-gyeonggi-title',
  display: 'swap',
});

export const GyeonggiBatang = localFont({
  src: '../../public/fonts/Batang_Regular.woff',
  variable: '--font-gyeonggi-batang',
  display: 'swap',
});
