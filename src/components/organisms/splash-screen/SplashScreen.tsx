import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {}, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 클린업
  }, [router]);

  return (
    <div className="bg-primary01 text-white01 flex h-screen w-screen flex-col items-center justify-center">
      <p className="font-extraLight">한 끼의 기록이 일상이 되다</p>

      <p className="font-gyeonggi text-[32px]">식탁일기</p>
    </div>
  );
};

export default SplashScreen;
