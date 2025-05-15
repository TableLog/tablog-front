'use client';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

import { SocialButtons } from '@/app/(auth)/login/social/SocialButtons';
import Button from '@/components/atoms/button/Button';
import { Checkbox } from '@/components/atoms/input/Checkbox';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
import { CheckEmailInput, CheckNicknameInput } from '@/components/molecules/input/DuplicateCheck';
import { ERROR_CODE_MESSAGE_MAP } from '@/constants/error-message.constants';
import { USER_INFO_QUERY_KEY } from '@/constants/query-key.constants';
import { useUpdateUserInfo } from '@/hooks/auth.hooks';
import { zodEmailUserInfo, zodSocialUserInfo } from '@/lib/zod/zodValidation';
import { TUserData, TUserInfoEditFormValues } from '@/types/api';
import { showToast } from '@/utils/functions';

interface IUserInfoEditForm {
  imageFile: File | null;
  userData: TUserData;
}
const UserInfoEditForm = ({ imageFile, userData }: IUserInfoEditForm) => {
  const [termValue, setTermValue] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TUserInfoEditFormValues>({
    resolver: zodResolver(
      userData?.provider === 'local'
        ? zodEmailUserInfo(userData?.email, userData?.nickname)
        : zodSocialUserInfo(userData?.nickname),
    ),
    mode: 'onChange',
    defaultValues: {
      provider: 'local',
      nickname: '',
      userName: '',
      birthday: '',
      email: '',
      password: '',
      confirmPassword: '',
      imgUrl: '',
      marketingOptIn: false,
      checkNickname: false,
      checkEmail: false,
    },
  });

  const { mutate: updateUserInfo } = useUpdateUserInfo({
    onSuccess: (res) => {
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: [USER_INFO_QUERY_KEY] });
        setValue('password', '');
        setValue('confirmPassword', '');

        showToast({
          message: '정보 수정이 완료되었습니다.',
          type: 'success',
        });
      }
    },
    onError: (err) => {
      const errorMessage = ERROR_CODE_MESSAGE_MAP[err?.response?.data?.message];

      // 현재 비밀번호로 변경 시도할 때
      if (err.response.data.message === 'EU400005') {
        setError('password', { message: errorMessage });
      }
    },
  });

  const onSubmit: SubmitHandler<TUserInfoEditFormValues> = async (data) => {
    const formdata = new FormData();

    formdata.append(
      'controllerRequestDto',
      JSON.stringify({
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        profileImgUrl:
          !imageFile || imageFile instanceof File
            ? ''
            : ((imageFile as { imgUrl?: string }).imgUrl ?? ''),
        marketingOptIn: termValue,
      }),
    );

    if (imageFile instanceof File) {
      formdata.append('multipartFile', imageFile);
    } else {
      formdata.append('multipartFile', '');
    }

    updateUserInfo(formdata);
  };

  useEffect(() => {
    if (userData) {
      setValue('nickname', userData.nickname);
      setValue('userName', userData.userName);
      setValue('birthday', userData.birthday);
      setValue('email', userData.email);
      setTermValue(userData?.marketingOptIn);
    }
  }, [userData, setValue]);

  return (
    <div>
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
            disabled
          />

          <TextInput
            type="text"
            category="birthday"
            register={register}
            maxLength={10}
            inputMode="numeric"
            errors={errors}
            setValue={setValue}
            disabled
          />

          <CheckEmailInput
            register={register}
            errors={errors}
            watch={watch}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue}
            disabled={userData?.provider !== 'local'}
          />

          {userData?.provider === 'local' && (
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

          <Checkbox
            label="마케팅 수신 동의 (선택)"
            value={termValue}
            onChange={(e) => {
              setTermValue(e.target.checked);
            }}
          />
        </div>

        <Button full type="submit">
          <Text color="white01">수정하기</Text>
        </Button>

        <div className="my-12">
          <div className="divider">
            <Text fontSize={12} color="grey02">
              {userData?.oAuthAccounts ? 'SNS 계정' : 'SNS 계정 연동하기'}
            </Text>
          </div>

          {userData?.oAuthAccounts?.length > 0 ? (
            <div>
              {userData?.oAuthAccounts?.map((social) => {
                return (
                  <div key={social.email} className="flex items-center gap-2">
                    {social?.provider === 'google' ? (
                      <Image src="/icons/google-logo.svg" alt="구글" width={20} height={20} />
                    ) : (
                      <Image src="/icons/kakao-logo.svg" alt="카카오" width={20} height={20} />
                    )}

                    <Text fontSize={14}>{social.email}</Text>
                  </div>
                );
              })}
            </div>
          ) : (
            <SocialButtons />
          )}
        </div>
      </form>
    </div>
  );
};

export default UserInfoEditForm;
