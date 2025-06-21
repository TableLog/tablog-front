'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import SplashScreen from '@/components/organisms/splash-screen/SplashScreen';
import { useLoginStore } from '@/lib/zutstand/userStore';

const Page = () => {
  const router = useRouter();

  const { isLoggedIn } = useLoginStore((state) => state);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/home');
    }
  }, [isLoggedIn, router]);

  return <SplashScreen />;
};

export default Page;
