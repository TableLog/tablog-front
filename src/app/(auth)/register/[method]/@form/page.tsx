'use client';

import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
import { CheckEmailInput, CheckNicknameInput } from '@/components/molecules/input/DuplicateCheck';
import { ERROR_CODE_MESSAGE_MAP } from '@/constants/error-message.constants';
import { useRegisterUser } from '@/hooks/auth.hooks';
import { zodRegister } from '@/lib/zod/zodValidation';
import { useToastStore } from '@/lib/zutstand/commonStore';
import { useUserStore } from '@/lib/zutstand/userStore';
import { TRegisterFormValues } from '@/types/api';

interface IRegisterForm {
  registerMethod: 'local' | 'kakao' | 'google';
  imageFile: File | null;
  imageSrc: string;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
}
const RegisterForm = ({ registerMethod, imageFile, imageSrc, setImageSrc }: IRegisterForm) => {
  const router = useRouter();

  const { setIsRegisterSuccess } = useToastStore();
  const { socialUserData, clearSocialUserData } = useUserStore();

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
      provider: 'local',
    },
  });

  const { mutate: registerUser } = useRegisterUser({
    onSuccess: (res) => {
      if (res.status === 201) {
        setIsRegisterSuccess(true);
        clearSocialUserData();
        setImageSrc('');

        if (registerMethod === 'local') {
          router.push('/login');
        } else {
          router.push('/home');
        }
      }
    },
    onError: (err) => {
      const errorMessage = ERROR_CODE_MESSAGE_MAP[err?.response?.data?.message];

      // 동일한 이름과 생년월일을 가진 유저가 있을 때
      if (err.response.data.message === 'EU400002') {
        setError('userName', { message: errorMessage });
      }
    },
  });

  const onSubmit: SubmitHandler<TRegisterFormValues> = async (data) => {
    const formdata = new FormData();

    if (data.provider !== 'local') {
      formdata.append(
        'controllerRequestDto',
        JSON.stringify({ ...data, provider: registerMethod, imgUrl: imageSrc }),
      );
    } else {
      formdata.append(
        'controllerRequestDto',
        JSON.stringify({ ...data, provider: registerMethod }),
      );
    }

    if (imageFile) {
      formdata.append('multipartFile', imageFile);
    }

    registerUser(formdata);
  };

  useEffect(() => {
    if (socialUserData) {
      setValue('nickname', socialUserData.nickname);
      setValue('birthday', socialUserData.birthday);
      setValue('email', socialUserData.email);
      setValue('imgUrl', socialUserData.imgUrl);
      setValue('provider', socialUserData.provider);
      setValue('userName', socialUserData.userName);
      setValue('provider', registerMethod);

      if (socialUserData.imgUrl) {
        setImageSrc(socialUserData.imgUrl);
      }
    }
  }, [registerMethod, setImageSrc, setValue, socialUserData]);

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
