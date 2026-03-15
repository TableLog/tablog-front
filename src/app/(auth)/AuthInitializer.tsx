'use client';

import { useEffect } from 'react';

import { useLoginStore } from '@/lib/zustand/userStore';

interface IAuthInitializerProps {
  isToken: boolean;
}
export default function AuthInitializer({ isToken }: IAuthInitializerProps) {
  const { isLoggedIn, setIsLoggedIn } = useLoginStore();

  useEffect(() => {
    console.log({ isToken });
    setIsLoggedIn(isToken);
  }, [isToken, setIsLoggedIn]);

  useEffect(() => {
    console.log({ isLoggedIn });
  }, [isLoggedIn]);

  return null;
}
