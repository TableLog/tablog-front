'use client';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
import CheckAll from '@/components/molecules/input/CheckAll';
import { CheckEmailInput, CheckNicknameInput } from '@/components/molecules/input/DuplicateCheck';
import BottomSheet from '@/components/organisms/bottom-sheet/BottomSheet';
import { ERROR_CODE_MESSAGE_MAP } from '@/constants/error-message.constants';
import { TERMS_OPTIONS } from '@/constants/options.constants';
import { TERM_REQUIRED } from '@/constants/validation.constants';
import { useRegisterUser } from '@/hooks/auth.hooks';
import { zodEmailRegister, zodSocialRegister } from '@/lib/zod/zodValidation';
import { useUserStore } from '@/lib/zutstand/userStore';
import { TRegisterFormValues } from '@/types/api';
import { getErrorCode, showToast } from '@/utils/functions';

interface IRegisterForm {
  registerMethod: 'local' | 'kakao' | 'google';
  imageFile: File | string | null;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
}
const RegisterForm = ({ registerMethod, imageFile, setImageSrc }: IRegisterForm) => {
  const router = useRouter();

  const { socialUserData, clearSocialUserData } = useUserStore();

  const [openTerms, setOpenTerms] = useState(false);
  const [termValues, setTermsValues] = useState<Record<string, boolean>>();
  const [termRequired, setTermRequired] = useState(false);

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    trigger,
    reset,
    formState: { errors },
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerMethod === 'local' ? zodEmailRegister : zodSocialRegister),
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

  console.log(process.env.NEXT_PUBLIC_SERVER_URL, 'env');

  const { mutate: registerUser } = useRegisterUser({
    onSuccess: (res) => {
      if (res.status === 201) {
        reset();

        if (registerMethod === 'local') {
          router.push('/login');

          clearSocialUserData();
          setImageSrc('');

          showToast({
            message: (
              <div>
                <p>회원가입이 완료되었습니다.</p>

                <p>로그인을 진행해주세요.</p>
              </div>
            ),
            type: 'success',
          });
        } else {
          router.push('/home');
        }
      }
    },
    onError: (err) => {
      setOpenTerms(false);

      const errorCode = getErrorCode(err);

      if (errorCode === 'EU400002') {
        // 동일한 이름과 생년월일을 가진 유저가 있을 때
        setError('userName', { message: ERROR_CODE_MESSAGE_MAP[errorCode] });
      }
    },
  });

  const handleValidateFormdata = async () => {
    let allValid = false;

    if (registerMethod === 'local') {
      allValid = await trigger(
        [
          'nickname',
          'userName',
          'birthday',
          'email',
          'password',
          'confirmPassword',
          'checkNickname',
          'checkEmail',
        ],
        { shouldFocus: true },
      );
    } else {
      allValid = await trigger(
        ['nickname', 'userName', 'birthday', 'email', 'checkNickname', 'checkEmail'],
        { shouldFocus: true },
      );
    }

    if (allValid) {
      setOpenTerms(true);
    }
  };

  const onSubmit: SubmitHandler<TRegisterFormValues> = async (data) => {
    if (!termValues?.useterm || !termValues?.privacy) {
      setTermRequired(true);

      return;
    }

    const formdata = new FormData();

    if (data.provider !== 'local') {
      formdata.append(
        'controllerRequestDto',
        JSON.stringify({
          ...data,
          imgUrl: imageFile === null && socialUserData?.imgUrl ? socialUserData?.imgUrl : '',
          provider: registerMethod,
          marketingOptIn: termValues?.marketing,
        }),
      );
    } else {
      formdata.append(
        'controllerRequestDto',
        JSON.stringify({
          ...data,
          provider: registerMethod,
          marketingOptIn: termValues?.marketing,
        }),
      );
    }

    if (imageFile) {
      formdata.append('multipartFile', imageFile);
    }

    registerUser(formdata);
  };

  useEffect(() => {
    if (socialUserData) {
      unregister('password');
      unregister('confirmPassword');

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
  }, [registerMethod, setImageSrc, setValue, socialUserData, unregister]);

  useEffect(() => {
    if (!openTerms) {
      // 약관 동의 창이 닫혔을 때 약관 오류 리셋
      setTermRequired(false);
    }
  }, [openTerms]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="register-form">
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

      <Button full onClick={handleValidateFormdata}>
        <Text color="white01">회원가입</Text>
      </Button>

      <BottomSheet
        isOpen={openTerms}
        onClose={() => setOpenTerms(false)}
        title="약관 동의"
        buttons={
          <div>
            <div className="mb-2 min-h-6">
              {termRequired && openTerms && (
                <Text fontSize={14} color="red01" className="text-center">
                  {TERM_REQUIRED}
                </Text>
              )}
            </div>

            <div className="flex w-full items-center justify-between gap-3">
              <Button buttonColor="grey06" onClick={() => setOpenTerms(false)}>
                닫기
              </Button>

              <Button full type="submit" form="register-form">
                동의하고 회원가입
              </Button>
            </div>
          </div>
        }
      >
        <div className="gap-18 relative flex w-full flex-col justify-between px-5">
          <div className="overflow-y-auto overflow-x-hidden">
            <CheckAll options={TERMS_OPTIONS} values={termValues} setValues={setTermsValues} />
          </div>
        </div>
      </BottomSheet>
    </form>
  );
};

export default RegisterForm;
