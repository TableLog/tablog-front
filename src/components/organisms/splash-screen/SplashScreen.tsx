import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useLoginStore } from '@/lib/zustand/userStore';

const SplashScreen = () => {
  const router = useRouter();

  const { isLoggedIn } = useLoginStore((state) => state);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(isLoggedIn ? '/home' : '/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-primary01 text-white01">
      <p className="font-extraLight">한 끼의 기록이 일상이 되다</p>

      <p className="font-gyeonggi text-[32px]">식탁일기</p>
    </div>
  );
};

export default SplashScreen;
