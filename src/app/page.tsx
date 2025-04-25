'use client';

import React from 'react';

import Navigation from '@/components/organisms/navigation/Navigation';
import SplashScreen from '@/components/organisms/splash-screen/SplashScreen';
import useUserStore from '@/lib/zutstand/userStore';
import { Header } from '@/stories/Header';

const Page = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useUserStore((state) => state);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Header />

          <main>{children}</main>

          <Navigation />
        </>
      ) : (
        <SplashScreen />
      )}
    </div>
  );
};

export default Page;
