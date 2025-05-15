import React, { useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import TextInput from '@/components/atoms/input/TextInput';
import { ERROR_CODE_MESSAGE_MAP } from '@/constants/error-message.constants';
import {
  EMAIL_CHECK_SUCCESS,
  EMAIL_FORMAT,
  EMAIL_REQUIRED,
  NICKNAME_CHECK_SUCCESS,
  NICKNAME_FORMAT,
  NICKNAME_REQUIRED,
} from '@/constants/validation.constants';
import { useCheckEmail, useCheckNickname } from '@/hooks/auth.hooks';
import { EMAIL_REGEX, NICKNAME_REGEX } from '@/lib/zod/zodValidation';

interface IDuplicateCheck<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  setValue: UseFormSetValue<T>;
  disabled?: boolean;
}

export const CheckEmailInput = <T extends FieldValues>({
  register,
  errors,
  watch,
  setError,
  clearErrors,
  setValue,
  disabled,
}: IDuplicateCheck<T>) => {
  const [isChecked, setIsChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const { mutate: checkEmail } = useCheckEmail({
    onSuccess: (res) => {
      if (res.status === 200) {
        setIsChecked(true);
        clearErrors('email' as Path<T>);
        setValue('checkEmail' as Path<T>, true as PathValue<T, Path<T>>);
        setSuccessMessage(true);
      }
    },
    onError: (error) => {
      const errorMessage = ERROR_CODE_MESSAGE_MAP[error?.response?.data?.message];

      setError('email' as Path<T>, { message: errorMessage });
    },
  });

  const handleCheckEmail = () => {
    const email = watch('email' as Path<T>) as string;

    if (typeof email !== 'string' || email === '') {
      setError('email' as Path<T>, { message: EMAIL_REQUIRED });
      return;
    }

    if (!email.match(EMAIL_REGEX)) {
      setError('email' as Path<T>, { message: EMAIL_FORMAT });
      return undefined;
    }

    checkEmail(email);
  };

  return (
    <TextInput
      type="email"
      category="email"
      inputMode="email"
      buttonText="중복 확인"
      register={register}
      errors={errors}
      buttonEvent={handleCheckEmail}
      disabled={disabled || isChecked}
      successMessage={successMessage ? EMAIL_CHECK_SUCCESS : undefined}
    />
  );
};

export const CheckNicknameInput = <T extends FieldValues>({
  register,
  errors,
  watch,
  setError,
  clearErrors,
  setValue,
}: IDuplicateCheck<T>) => {
  const [isChecked, setIsChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const { mutate: checkNickname } = useCheckNickname({
    onSuccess: (res) => {
      if (res.status === 200) {
        setIsChecked(true);
        clearErrors('nickname' as Path<T>);
        setValue('checkNickname' as Path<T>, true as PathValue<T, Path<T>>);
        setSuccessMessage(true);
      }
    },
    onError: (error) => {
      const errorMessage = ERROR_CODE_MESSAGE_MAP[error?.response?.data?.message];

      setError('nickname' as Path<T>, { message: errorMessage });
    },
  });

  const handleCheckNickname = () => {
    const nickname = watch('nickname' as Path<T>) as string;

    if (typeof nickname !== 'string' || nickname === '') {
      setError('nickname' as Path<T>, { message: NICKNAME_REQUIRED });
      return;
    }

    if (!nickname.match(NICKNAME_REGEX)) {
      setError('nickname' as Path<T>, { message: NICKNAME_FORMAT });
      return undefined;
    }

    checkNickname(nickname);
  };

  return (
    <TextInput
      type="text"
      category="nickname"
      buttonText="중복 확인"
      register={register}
      maxLength={10}
      errors={errors}
      buttonEvent={handleCheckNickname}
      disabled={isChecked}
      successMessage={successMessage ? NICKNAME_CHECK_SUCCESS : undefined}
    />
  );
};
