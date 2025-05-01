import { z } from 'zod';

import {
  BIRTH_FORMAT,
  BIRTH_REQUIRED,
  EMAIL_CHECK_REQUIRED,
  EMAIL_FORMAT,
  EMAIL_REQUIRED,
  NAME_REQUIRED,
  NICKNAME_CHECK_REQUIRED,
  NICKNAME_FORMAT,
  NICKNAME_REQUIRED,
  PASSWORD_CONFIRM_INVALID,
  PASSWORD_CONFIRM_REQUIRED,
  PASSWORD_FORMAT,
  PASSWORD_REQUIRED,
} from '@/constants/validation.constants';

export const EMAIL_REGEX = '^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$';

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/;

const BIRTH_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식의 정규식
const BIRTH_VALID_REGEX = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/; // YYYY-MM-DD 각 자리에 유효한 생년월일인지 확인

// NOTE: 회원가입
export const zodRegister = z
  .object({
    nickname: z.string().min(1, NICKNAME_REQUIRED).max(10, NICKNAME_FORMAT),
    email: z.string().min(1, EMAIL_REQUIRED).email({ message: EMAIL_FORMAT }),
    password: z.string().min(1, { message: PASSWORD_REQUIRED }).regex(PASSWORD_REGEX, {
      message: PASSWORD_FORMAT,
    }),
    confirmPassword: z
      .string()
      .min(1, { message: PASSWORD_CONFIRM_REQUIRED })
      .regex(PASSWORD_REGEX, {
        message: PASSWORD_FORMAT,
      }),
    userName: z.string().min(1, { message: NAME_REQUIRED }),
    birthday: z.optional(
      z
        .string()
        .regex(BIRTH_FORMAT_REGEX, {
          message: BIRTH_REQUIRED,
        })
        .regex(BIRTH_VALID_REGEX, {
          message: BIRTH_FORMAT,
        }),
    ),
    checkEmail: z.boolean().refine((value) => value === true, {
      message: EMAIL_CHECK_REQUIRED,
    }),
    checkNickname: z.boolean().refine((value) => value === true, {
      message: NICKNAME_CHECK_REQUIRED,
    }),
    marketingOptIn: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: PASSWORD_CONFIRM_INVALID,
    path: ['confirmPassword'],
  })
  .refine((data) => data.checkNickname === true, {
    message: NICKNAME_CHECK_REQUIRED,
    path: ['nickname'],
  })
  .refine((data) => data.checkEmail === true, {
    message: EMAIL_CHECK_REQUIRED,
    path: ['email'],
  });

// NOTE: 로그인
export const zodLogin = z.object({
  email: z.string().min(1, EMAIL_REQUIRED).email({ message: EMAIL_FORMAT }),
  password: z.string().min(1, { message: PASSWORD_REQUIRED }).regex(PASSWORD_REGEX, {
    message: PASSWORD_FORMAT,
  }),
});
