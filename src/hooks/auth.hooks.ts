'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  CheckEmail,
  CheckNickname,
  EmailLogin,
  Logout,
  RegisterUser,
  SocialLogin,
  UserInfo,
} from '@/apis/auth.api';
import { USER_INFO_QUERY_KEY } from '@/constants/query-key.constants';
import { IMutationOptions } from '@/types/api';

// 로그인: 이메일
export function useEmailLogin(options?: IMutationOptions) {
  return useMutation({
    mutationFn: EmailLogin,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 로그인: 소셜 로그인
export function useSocialLogin(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ provider, code }: { provider: string | string[]; code: string }) =>
      SocialLogin(provider, code),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 로그아웃
export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: () => Logout(),
    onSuccess: (res) => {
      if (res.status === 200) {
        router.push('/login');
      }
    },
  });
}

// 회원가입
export function useRegisterUser(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (formData: FormData) => RegisterUser(formData),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 닉네임 중복 확인
export function useCheckNickname(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (nickname: string) => CheckNickname(nickname),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 이메일 중복 확인
export function useCheckEmail(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (email: string) => CheckEmail(email),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 유저 정보
export function useGetUserInfo() {
  return useQuery({
    queryKey: [USER_INFO_QUERY_KEY],
    queryFn: () => UserInfo(),
    select: (res) => res.data,
  });
}
