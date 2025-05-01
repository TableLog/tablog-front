'use client';

import { useMutation } from '@tanstack/react-query';

import { CheckEmail, CheckNickname, EmailLogin, RegisterUser, SocialLogin } from '@/apis/auth.api';
import { IMutationOptions } from '@/types/api';

export function useEmailLogin(options?: IMutationOptions) {
  return useMutation({
    mutationFn: EmailLogin,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useSocialLogin(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ provider, code }: { provider: string | string[]; code: string }) =>
      SocialLogin(provider, code),
    onSuccess: options?.onSuccess,
    onError: (error) => {
      console.error('Social Login Error:', error);
      return error;
    },
  });
}

export function useRegisterUser(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (formData: FormData) => RegisterUser(formData),
    onSuccess: options?.onSuccess,
    onError: (error) => {
      console.error('Register Error:', error);
      return error;
    },
  });
}

export function useCheckNickname(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (nickname: string) => CheckNickname(nickname),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useCheckEmail(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (email: string) => CheckEmail(email),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
