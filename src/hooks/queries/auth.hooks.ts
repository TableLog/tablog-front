'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  changePassword,
  checkEmail,
  checkNickname,
  deleteUser,
  findAccount,
  getUserInfo,
  loginWithEmail,
  loginWithSocialAccount,
  logout,
  registerUser,
  socialLink,
  updateUserInfo,
} from '@/apis/auth.api';
import { USER_QUERY_KEY } from '@/constants/query-key.constants';
import { useLoginStore } from '@/lib/zustand/userStore';
import { IMutationOptions, TChangePasswordFormData, TFindAccountFormValues } from '@/types/api';
import { showErrorToast, showToast } from '@/utils/functions';

// NOTE: 유저 정보 관련
// 로그인: 이메일
export function useEmailLogin(options?: IMutationOptions) {
  return useMutation({
    mutationFn: loginWithEmail,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 로그인: 소셜 로그인
export function useSocialLogin(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ provider, code }: { provider: string | string[]; code: string }) =>
      loginWithSocialAccount(provider, code),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 계정 찾기
export function useFindAccount(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (data: TFindAccountFormValues) => findAccount(data),
    onSuccess: options?.onSuccess,
    onError: (err) => {
      showErrorToast(err);
    },
  });
}

// 패스워드 변경하기
export function useChangePassword(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (data: TChangePasswordFormData) => changePassword(data),
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
      socialLink(provider, code),
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
    mutationFn: () => logout(),
    onSuccess: (res) => {
      if (res.status === 200) {
        setIsLoggedIn(false);
        queryClient.removeQueries({ queryKey: USER_QUERY_KEY.INFO() });
        router.push('/login');
      }
    },
  });
}

// 회원가입
export function useRegisterUser(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (formData: FormData) => registerUser(formData),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 닉네임 중복 확인
export function useCheckNickname(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (nickname: string) => checkNickname(nickname),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 이메일 중복 확인
export function useCheckEmail(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (email: string) => checkEmail(email),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 유저 정보
export function useGetUserInfo() {
  const { isLoggedIn } = useLoginStore();

  return useQuery({
    queryKey: USER_QUERY_KEY.INFO(),
    queryFn: () => getUserInfo(),
    enabled: isLoggedIn,
    select: (res) => res.data,
  });
}

// 유저 정보 수정
export function useUpdateUserInfo(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (formData: FormData) => updateUserInfo(formData),
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
    mutationFn: () => deleteUser(),
    onSuccess: (res) => {
      if (res.status === 200) {
        setIsLoggedIn(false);

        router.push('/login');
        showToast({ message: '회원 탈퇴가 완료되었습니다.', type: 'success' });

        queryClient.removeQueries({ queryKey: USER_QUERY_KEY.INFO() });
      }
    },
  });
}
