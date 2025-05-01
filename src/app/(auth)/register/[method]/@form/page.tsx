'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
import { CheckEmailInput, CheckNicknameInput } from '@/components/molecules/input/DuplicateCheck';
import { useRegisterUser } from '@/hooks/auth.hooks';
import { zodRegister } from '@/lib/zod/zodValidation';
import { useToastStore } from '@/lib/zutstand/userStore';
import { TRegisterFormValues } from '@/types/api';

interface IRegisterForm {
  registerMethod: string;
  imageFile: File | null;
}
const RegisterForm = ({ registerMethod, imageFile }: IRegisterForm) => {
  const router = useRouter();
  const { setIsRegisterSuccess } = useToastStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(zodRegister),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
      birthday: '',
      imgUrl: '',
      marketingOptIn: false,
      checkNickname: false,
      checkEmail: false,
    },
  });

  const { mutate: registerUser } = useRegisterUser({
    onSuccess: (res) => {
      if (res.status === 201) {
        setIsRegisterSuccess(true);
        router.push('/login');
      }
    },
  });

  const onSubmit: SubmitHandler<TRegisterFormValues> = async (data) => {
    const formdata = new FormData();

    formdata.append('controllerRequestDto', JSON.stringify({ ...data, provider: registerMethod }));

    if (imageFile) {
      formdata.append('multipartFile', imageFile);
    }

    registerUser(formdata);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-[56px] flex flex-col gap-2">
        <CheckNicknameInput
          register={register}
          errors={errors}
          watch={watch}
          setError={setError}
          clearErrors={clearErrors}
          setValue={setValue}
        />

        <TextInput
          type="text"
          category="userName"
          register={register}
          errors={errors}
          setValue={setValue}
        />

        <TextInput
          type="text"
          category="birthday"
          register={register}
          maxLength={10}
          inputMode="numeric"
          errors={errors}
          setValue={setValue}
        />

        <CheckEmailInput
          register={register}
          errors={errors}
          watch={watch}
          setError={setError}
          clearErrors={clearErrors}
          setValue={setValue}
        />

        {registerMethod === 'local' && (
          <>
            <TextInput type="password" category="password" register={register} errors={errors} />

            <TextInput
              type="password"
              category="confirmPassword"
              register={register}
              errors={errors}
            />
          </>
        )}
      </div>

      <Button type="submit" full>
        <Text color="white01">회원가입</Text>
      </Button>
    </form>
  );
};

export default RegisterForm;
