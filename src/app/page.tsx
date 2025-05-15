'use client';

import Header from '@/components/molecules/header/Header';
import Navigation from '@/components/organisms/navigation/Navigation';
import SplashScreen from '@/components/organisms/splash-screen/SplashScreen';
import { useLoginStore } from '@/lib/zutstand/userStore';

import HomePage from './(services)/home/page';

const Page = () => {
  const { isLoggedIn } = useLoginStore((state) => state);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Header />

          <main>
            <HomePage />
          </main>

          <Navigation />
        </>
      ) : (
        <SplashScreen />
      )}
    </div>
  );
};

export default Page;
