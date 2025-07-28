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

      <main className="w-full bg-primary01">
        <div className="rounded-tl-[24px] rounded-tr-[24px] bg-white01">{children}</div>
      </main>

      <Navigation />
    </div>
  );
}
