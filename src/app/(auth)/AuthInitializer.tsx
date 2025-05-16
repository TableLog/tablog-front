'use client';

import { useEffect } from 'react';

import { useLoginStore } from '@/lib/zutstand/userStore';

interface IAuthInitializerProps {
  isToken: boolean;
}
export default function AuthInitializer({ isToken }: IAuthInitializerProps) {
  const { setIsLoggedIn } = useLoginStore();

  useEffect(() => {
    setIsLoggedIn(isToken);
  }, [isToken, setIsLoggedIn]);

  return null;
}
