import React from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

import Toast from '@/components/atoms/toast/Toast';
import { Provider } from '@/lib/tanstack-query/QueryProvider';

import { GyeonggiBatang, GyeonggiTitle, pretendard } from '../../public/fonts/local-fonts';

import GoogleAnalytics from './analytics';

import '@/styles/global.css';
import '@/styles/common.css';

export const metadata: Metadata = {
  title: '식탁일기 | Tablog',
  description: '한 끼의 기록이 일상이 되다',
  icons: {
    icon: '/icons/favicon.ico',
  },
};

export const viewport: Viewport = {
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      data-theme="tablog"
      className={`${pretendard.variable} ${GyeonggiBatang.variable} ${GyeonggiTitle.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>

      <body className="max-w-[100svw] overflow-x-hidden" suppressHydrationWarning>
        <Script
          id="scroll-restoration"
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
          strategy="beforeInteractive"
        />

        <GoogleAnalytics />

        <Provider>
          <Toast />

          <div className="min-h-[100dvh] w-full">
            <div className="mx-auto h-full min-h-[100dvh] max-w-lg bg-white01 shadow-2xl">
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
