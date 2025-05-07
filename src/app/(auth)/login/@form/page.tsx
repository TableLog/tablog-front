'use client';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import { Checkbox } from '@/components/atoms/input/Checkbox';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
import { ERROR_CODE_MESSAGE_MAP } from '@/constants/error-message.constants';
import { LOCAL_REMEMBER_EMAIL } from '@/constants/storage-key.constants';
import { useEmailLogin } from '@/hooks/auth.hooks';
import { zodLogin } from '@/lib/zod/zodValidation';
import { TLoginFormValues } from '@/types/api';

const LoginForm = () => {
  const router = useRouter();

  const [rememberEmail, setRememberEmail] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(zodLogin),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: emailLogin } = useEmailLogin({
    onSuccess: async () => {
      if (rememberEmail) {
        localStorage.setItem(LOCAL_REMEMBER_EMAIL, watch('email'));
      } else {
        localStorage.removeItem(LOCAL_REMEMBER_EMAIL);
      }

      router.push('/home');
    },
    onError: (error) => {
      const errorMessage = ERROR_CODE_MESSAGE_MAP[error?.response?.data?.message];

      setError('email', { message: errorMessage });
    },
  });

  const onSubmit: SubmitHandler<TLoginFormValues> = async (data) => {
    emailLogin(data);
  };

  return (
    <div>
      <form className="mt-[64px] mb-4" onSubmit={handleSubmit(onSubmit)}>
        <section className="mb-5">
          <TextInput type="email" category="email" register={register} errors={errors} />

          <TextInput type="password" category="password" register={register} errors={errors} />
        </section>

        <div className="mb-3">
          <Checkbox
            label="이메일 기억하기"
            value={rememberEmail}
            onChange={(e) => setRememberEmail(e.target.checked)}
          />
        </div>

        <Button full type="submit">
          <Text color="white01">로그인</Text>
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
