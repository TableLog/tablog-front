'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  ChangePassword,
  CheckEmail,
  CheckNickname,
  EmailLogin,
  FindAccount,
  Logout,
  RegisterUser,
  SocialLink,
  SocialLogin,
  UnregisterUser,
  UserInfo,
  UserInfoUpdate,
} from '@/apis/auth.api';
import { USER_INFO_QUERY_KEY } from '@/constants/query-key.constants';
import { useLoginStore } from '@/lib/zutstand/userStore';
import { IMutationOptions, TChangePasswordFormData, TFindAccountFormValues } from '@/types/api';
import { showErrorToast } from '@/utils/functions';

// NOTE: 유저 정보 관련
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

// 계정 찾기
export function useFindAccount(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (data: TFindAccountFormValues) => FindAccount(data),
    onSuccess: options?.onSuccess,
    onError: (err) => {
      showErrorToast(err);
    },
  });
}

// 비밀번호 변경하기
export function useChangePassword(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (data: TChangePasswordFormData) => ChangePassword(data),
    onSuccess: options?.onSuccess,
    onError: (err) => {
      showErrorToast(err);
    },
  });
}

// 소셜 연동
export function useSocialLink(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ provider, code }: { provider: string | string[]; code: string }) =>
      SocialLink(provider, code),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 로그아웃
export function useLogout() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { setIsLoggedIn } = useLoginStore();

  return useMutation({
    mutationFn: () => Logout(),
    onSuccess: (res) => {
      if (res.status === 200) {
        setIsLoggedIn(false);

        router.push('/login');

        queryClient.removeQueries({ queryKey: [USER_INFO_QUERY_KEY] });
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
  const { isLoggedIn } = useLoginStore();

  return useQuery({
    queryKey: [USER_INFO_QUERY_KEY],
    queryFn: () => UserInfo(),
    enabled: isLoggedIn,
    select: (res) => res.data,
  });
}

// 유저 정보 수정
export function useUpdateUserInfo(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (formData: FormData) => UserInfoUpdate(formData),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 회원 탈퇴
export function useUnregister() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { setIsLoggedIn } = useLoginStore();

  return useMutation({
    mutationFn: () => UnregisterUser(),
    onSuccess: (res) => {
      if (res.status === 200) {
        setIsLoggedIn(false);

        router.push('/login');

        queryClient.removeQueries({ queryKey: [USER_INFO_QUERY_KEY] });
      }
    },
  });
}
