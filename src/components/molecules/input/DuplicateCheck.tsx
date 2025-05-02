import React, { useState } from 'react';
import {
  FieldErrors,
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
  NICKNAME_REQUIRED,
} from '@/constants/validation.constants';
import { useCheckEmail, useCheckNickname } from '@/hooks/auth.hooks';
import { EMAIL_REGEX } from '@/lib/zod/zodValidation';
import { TRegisterFormValues } from '@/types/api';

interface IDuplicateCheck {
  register: UseFormRegister<TRegisterFormValues>;
  errors: FieldErrors<TRegisterFormValues>;
  watch: UseFormWatch<TRegisterFormValues>;
  setError: UseFormSetError<TRegisterFormValues>;
  clearErrors: UseFormClearErrors<TRegisterFormValues>;
  setValue: UseFormSetValue<TRegisterFormValues>;
}

export const CheckEmailInput = ({
  register,
  errors,
  watch,
  setError,
  clearErrors,
  setValue,
}: IDuplicateCheck) => {
  const [isChecked, setIsChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const { mutate: checkEmail } = useCheckEmail({
    onSuccess: (res) => {
      if (res.status === 200) {
        setIsChecked(true);
        clearErrors();
        setValue('checkEmail', true);
        setSuccessMessage(true);
      }
    },
    onError: (error) => {
      const errorMessage = ERROR_CODE_MESSAGE_MAP[error?.response?.data?.message];

      setError('email', { message: errorMessage });
    },
  });

  const handleCheckEmail = () => {
    const email = watch('email');

    if (email === '') {
      setError('email', { message: EMAIL_REQUIRED });
      return;
    }

    if (!email.match(EMAIL_REGEX)) {
      setError('email', { message: EMAIL_FORMAT });
      return undefined;
    }

    checkEmail(email);
  };

  return (
    <TextInput
      type="email"
      category="email"
      buttonText="중복 확인"
      register={register}
      errors={errors}
      buttonEvent={handleCheckEmail}
      disabled={isChecked}
      successMessage={successMessage ? EMAIL_CHECK_SUCCESS : undefined}
    />
  );
};

export const CheckNicknameInput = ({
  register,
  errors,
  watch,
  setError,
  clearErrors,
  setValue,
}: IDuplicateCheck) => {
  const [isChecked, setIsChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const { mutate: checkNickname } = useCheckNickname({
    onSuccess: (res) => {
      if (res.status === 200) {
        setIsChecked(true);
        clearErrors();
        setValue('checkNickname', true);
        setSuccessMessage(true);
      }
    },
    onError: (error) => {
      const errorMessage = ERROR_CODE_MESSAGE_MAP[error?.response?.data?.message];

      setError('nickname', { message: errorMessage });
    },
  });

  const handleCheckNickname = () => {
    const nickname = watch('nickname');

    if (nickname === '') {
      setError('nickname', { message: NICKNAME_REQUIRED });
      return;
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
