import React from 'react';
import type { Metadata } from 'next';

import { Provider } from '@/lib/tanstack-query/QueryProvider';

import { pretendard } from '../../public/fonts/pretendard';

import '@/styles/global.css';
import '@/styles/common.css';

export const metadata: Metadata = {
  title: '식탁일기 | Tablog',
  description: '한 끼의 기록이 일상이 되다',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`} suppressHydrationWarning={true}>
      <body className="max-w-[100svw] overflow-x-hidden">
        <Provider>
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
