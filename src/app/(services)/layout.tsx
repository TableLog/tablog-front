import React from 'react';
import { cookies } from 'next/headers';

import Header from '@/components/molecules/header/Header';
import Navigation from '@/components/organisms/navigation/Navigation';

import AuthInitializer from '../(auth)/AuthInitializer';

export default async function AfterLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();

  const accessToken = (await cookieStore).get('accessToken')?.value;

  const isToken = !!accessToken;

  return (
    <div>
      <AuthInitializer isToken={isToken} />

      <Header />

      <main className="bg-primary01 w-full">
        <div className="bg-white01 scrollable-content relative max-h-[calc(100svh-132px)] overflow-y-auto rounded-tl-[24px] rounded-tr-[24px]">
          {children}
        </div>
      </main>

      <Navigation />
    </div>
  );
}
