import { z } from 'zod';

import {
  BIRTH_FORMAT,
  BIRTH_REQUIRED,
  EMAIL_CHECK_REQUIRED,
  EMAIL_FORMAT,
  EMAIL_REQUIRED,
  LOG_CONTENT_REQUIRED,
  NAME_FORMAT,
  NAME_REQUIRED,
  NICKNAME_CHECK_REQUIRED,
  NICKNAME_REQUIRED,
  PASSWORD_CONFIRM_INVALID,
  PASSWORD_CONFIRM_REQUIRED,
  PASSWORD_FORMAT,
  PASSWORD_REQUIRED,
} from '@/constants/validation.constants';

export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
export const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]+$/i;
export const USERNAME_REGEX = /^[가-힣]+$/i;

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/;

const BIRTH_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식의 정규식
const BIRTH_VALID_REGEX = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/; // YYYY-MM-DD 각 자리에 유효한 생년월일인지 확인

// NOTE: 이메일 회원가입
export const zodEmailRegister = z
  .object({
    provider: z.string(),
    nickname: z
      .string({ message: NICKNAME_REQUIRED })
      .min(2, NICKNAME_REQUIRED)
      .max(10, NICKNAME_REQUIRED)
      .regex(NICKNAME_REGEX, { message: NICKNAME_REQUIRED }),
    email: z.string({ message: EMAIL_REQUIRED }),
    password: z.string({ message: PASSWORD_REQUIRED }),
    confirmPassword: z.string({ message: PASSWORD_CONFIRM_REQUIRED }),
    userName: z
      .string({ message: NAME_REQUIRED })
      .min(1, { message: NAME_REQUIRED })
      .regex(USERNAME_REGEX, { message: NAME_FORMAT }),
    birthday: z.optional(
      z
        .string({ message: BIRTH_REQUIRED })
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
  .refine(
    (data) => {
      if (data.provider === 'local') {
        return data.password === data.confirmPassword;
      }
      return true; // provider가 'local'이 아니면 검사하지 않음
    },
    {
      message: PASSWORD_CONFIRM_INVALID,
      path: ['confirmPassword'],
    },
  )
  // TODO: provider가 'local'일 때만 password 유효성 검사
  .refine(
    (data) => {
      if (data.provider === 'local') {
        return !!data.password;
      }
      return true;
    },
    {
      message: PASSWORD_REQUIRED,
      path: ['password'],
    },
  )
  // provider가 'local'일 때만 confirmPassword 유효성 검사
  .refine(
    (data) => {
      if (data.provider === 'local') {
        return !!data.confirmPassword;
      }
      return true;
    },
    {
      message: PASSWORD_CONFIRM_REQUIRED,
      path: ['confirmPassword'],
    },
  )
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

// NOTE: 소셜 회원가입
export const zodSocialRegister = z
  .object({
    provider: z.string(),
    nickname: z
      .string({ message: NICKNAME_REQUIRED })
      .min(2, NICKNAME_REQUIRED)
      .max(10, NICKNAME_REQUIRED)
      .regex(NICKNAME_REGEX, { message: NICKNAME_REQUIRED }),
    email: z.string({ message: EMAIL_REQUIRED }),
    userName: z
      .string({ message: NAME_REQUIRED })
      .min(1, { message: NAME_REQUIRED })
      .regex(USERNAME_REGEX, { message: NAME_FORMAT }),
    birthday: z.optional(
      z
        .string({ message: BIRTH_REQUIRED })
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
  email: z
    .string({ message: EMAIL_REQUIRED })
    .min(1, EMAIL_REQUIRED)
    .email({ message: EMAIL_FORMAT }),
  password: z
    .string({ message: PASSWORD_REQUIRED })
    .min(1, { message: PASSWORD_REQUIRED })
    .regex(PASSWORD_REGEX, {
      message: PASSWORD_FORMAT,
    }),
});

// NOTE: 이메일 회원 정보 수정
export const zodEmailUserInfo = (originalEmail: string, originalNickname: string) =>
  z
    .object({
      email: z
        .string({ message: EMAIL_REQUIRED })
        .min(1, EMAIL_REQUIRED)
        .email({ message: EMAIL_FORMAT }),
      password: z
        .string({ message: PASSWORD_REQUIRED })
        .optional()
        .refine((val) => !val || PASSWORD_REGEX.test(val), {
          message: PASSWORD_FORMAT,
        }),
      confirmPassword: z
        .string({ message: PASSWORD_CONFIRM_REQUIRED })
        .optional()
        .refine((val) => !val || PASSWORD_REGEX.test(val), {
          message: PASSWORD_FORMAT,
        }),
      nickname: z
        .string({ message: NICKNAME_REQUIRED })
        .min(2, NICKNAME_REQUIRED)
        .max(10, NICKNAME_REQUIRED)
        .regex(NICKNAME_REGEX, { message: NICKNAME_REQUIRED }),
      checkEmail: z.boolean(),
      checkNickname: z.boolean(),
      marketingOptIn: z.boolean().optional(),
    })
    .refine(
      (data) => {
        if (data.email !== originalEmail) {
          return data.checkEmail === true;
        }
        return true;
      },
      {
        message: EMAIL_CHECK_REQUIRED,
        path: ['email'],
      },
    )
    .refine(
      (data) => {
        if (data.nickname !== originalNickname) {
          return data.checkNickname === true;
        }

        return true;
      },
      {
        message: NICKNAME_CHECK_REQUIRED,
        path: ['nickname'],
      },
    )
    .refine((data) => data.password === data.confirmPassword, {
      message: PASSWORD_CONFIRM_INVALID,
      path: ['confirmPassword'],
    });

// NOTE: 소셜 회원 정보 수정
export const zodSocialUserInfo = (originalNickname: string) =>
  z
    .object({
      email: z
        .string({ message: EMAIL_REQUIRED })
        .min(1, EMAIL_REQUIRED)
        .email({ message: EMAIL_FORMAT }),
      nickname: z
        .string({ message: NICKNAME_REQUIRED })
        .min(2, NICKNAME_REQUIRED)
        .max(10, NICKNAME_REQUIRED)
        .regex(NICKNAME_REGEX, { message: NICKNAME_REQUIRED }),
      checkNickname: z.boolean(),
      marketingOptIn: z.boolean().optional(),
    })
    .refine(
      (data) => {
        if (data.nickname !== originalNickname) {
          return data.checkNickname === true;
        }

        return true;
      },
      {
        message: NICKNAME_CHECK_REQUIRED,
        path: ['nickname'],
      },
    );

// NOTE: 계정 찾기
export const zodFindAccount = z.object({
  userName: z
    .string({ message: NAME_REQUIRED })
    .min(1, { message: NAME_REQUIRED })
    .regex(USERNAME_REGEX, { message: NAME_FORMAT }),
  birthday: z.optional(
    z
      .string({ message: BIRTH_REQUIRED })
      .regex(BIRTH_FORMAT_REGEX, {
        message: BIRTH_REQUIRED,
      })
      .regex(BIRTH_VALID_REGEX, {
        message: BIRTH_FORMAT,
      }),
  ),
});

// NOTE: 비밀번호 변경하기
export const zodChangePassword = z
  .object({
    password: z
      .string({ message: PASSWORD_REQUIRED })
      .optional()
      .refine((val) => !val || PASSWORD_REGEX.test(val), {
        message: PASSWORD_FORMAT,
      }),
    confirmPassword: z
      .string({ message: PASSWORD_CONFIRM_REQUIRED })
      .optional()
      .refine((val) => !val || PASSWORD_REGEX.test(val), {
        message: PASSWORD_FORMAT,
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: PASSWORD_CONFIRM_INVALID,
    path: ['confirmPassword'],
  });

// NOTE: 일기 작성
export const zodAddLog = z.object({
  content: z.string({ message: LOG_CONTENT_REQUIRED }).min(1, { message: LOG_CONTENT_REQUIRED }),
});
