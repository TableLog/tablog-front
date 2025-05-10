import React from 'react';

import Header from '@/components/molecules/header/Header';
import Navigation from '@/components/organisms/navigation/Navigation';

export default function AfterLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />

      <main className="bg-primary01 w-full">
        <div className="bg-white01 min-h-[calc(100svh-132px)] rounded-tl-[24px] rounded-tr-[24px]">
          {children}
        </div>
      </main>

      <Navigation />
    </div>
  );
}
