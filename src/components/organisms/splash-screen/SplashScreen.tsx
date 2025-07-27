import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-primary01 text-white01">
      <p className="font-extraLight">한 끼의 기록이 일상이 되다</p>

      <p className="font-gyeonggi text-[32px]">식탁일기</p>
    </div>
  );
};

export default SplashScreen;
