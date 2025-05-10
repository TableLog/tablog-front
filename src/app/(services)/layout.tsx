import React from 'react';
import { cookies } from 'next/headers';

import Header from '@/components/molecules/header/Header';
import Navigation from '@/components/organisms/navigation/Navigation';

export default async function AfterLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();

  const accessToken = (await cookieStore).get('accessToken')?.value;

  return (
    <div>
      <Header token={accessToken} />

      <main className="bg-primary01 w-full">
        <div className="bg-white01 min-h-[calc(100svh-132px)] rounded-tl-[24px] rounded-tr-[24px]">
          {children}
        </div>
      </main>

      <Navigation />
    </div>
  );
}
