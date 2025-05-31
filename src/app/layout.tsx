import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';

import Toast from '@/components/atoms/toast/Toast';
import { Provider } from '@/lib/tanstack-query/QueryProvider';

import { pretendard } from '../../public/fonts/pretendard';

import '@/styles/global.css';
import '@/styles/common.css';

export const metadata: Metadata = {
  title: '식탁일기 | Tablog',
  description: '한 끼의 기록이 일상이 되다',
  icons: {
    icon: '/icons/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      data-theme="tablog" // daisyui custom theme - global.css
      className={`${pretendard.variable}`}
      suppressHydrationWarning
    >
      <body className="max-w-[100svw] overflow-x-hidden" suppressHydrationWarning>
        <Script
          id="scroll-restoration"
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
          strategy="beforeInteractive"
        />

        <Provider>
          <Toast />

          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
