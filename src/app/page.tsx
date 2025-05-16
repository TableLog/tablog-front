'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import SplashScreen from '@/components/organisms/splash-screen/SplashScreen';
import { useLoginStore } from '@/lib/zutstand/userStore';

const Page = () => {
  const { isLoggedIn } = useLoginStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/home');
    }
  }, [isLoggedIn, router]);

  return <SplashScreen />;
};

export default Page;
