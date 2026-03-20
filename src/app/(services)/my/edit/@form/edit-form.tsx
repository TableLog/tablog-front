'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import Button from '@/components/atoms/button/Button';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
import { CheckEmailInput, CheckNicknameInput } from '@/components/molecules/input/DuplicateCheck';
import Popup from '@/components/molecules/popup/Popup';
import { ERROR_CODE_MESSAGE_MAP } from '@/constants/error-message.constants';
import { UNREGISTER_MODAL } from '@/constants/modal.constants';
import { USER_QUERY_KEY } from '@/constants/query-key.constants';
import { useUnregister, useUpdateUserInfo } from '@/hooks/queries/auth.hooks';
import { zodEmailUserInfo, zodSocialUserInfo } from '@/lib/zod/zodValidation';
import { TUserData, TUserInfoEditFormValues } from '@/types/api';
import { getErrorCode, showToast } from '@/utils/functions';

import LogoutSignout from './logout-signout';

interface IUserInfoEditForm {
  imageFile: File | string | null;
  userData: TUserData;
}
const UserInfoEditForm = ({ imageFile, userData }: IUserInfoEditForm) => {
  const [termValue, setTermValue] = useState<boolean>(false);

  const { mutate: unregister } = useUnregister();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<TUserInfoEditFormValues>({
    resolver: zodResolver(
      userData?.provider === 'local'
        ? zodEmailUserInfo(userData?.email, userData?.nickname)
        : zodSocialUserInfo(userData?.nickname),
    ),
    mode: 'onChange',
    defaultValues: {
      provider: userData?.provider || 'local',
      nickname: userData?.nickname || '',
      userName: userData?.userName || '',
      birthday: userData?.birthday || '',
      email: userData?.email || '',
      password: '',
      confirmPassword: '',
      imgUrl: '',
      marketingOptIn: userData?.marketingOptIn || false,
      checkNickname: false,
      checkEmail: false,
    },
  });

  const { mutate: updateUserInfo } = useUpdateUserInfo({
    onSuccess: (res) => {
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.INFO() });
        setValue('password', '');
        setValue('confirmPassword', '');

        showToast({
          message: '정보 수정이 완료되었습니다.',
          type: 'success',
        });
      }
    },
    onError: (err) => {
      const errorCode = getErrorCode(err);

      // 현재 패스워드로 변경 시도할 때
      if (errorCode === 'EU400005') {
        setError('password', { message: ERROR_CODE_MESSAGE_MAP[errorCode] });
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
          typeof imageFile === 'string'
            ? imageFile
            : (imageFile as { imgUrl?: string })?.imgUrl || '',
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
      reset({
        provider: userData.provider || 'local',
        nickname: userData.nickname || '',
        userName: userData.userName || '',
        birthday: userData.birthday || '',
        email: userData.email || '',
        password: '',
        confirmPassword: '',
        imgUrl: '',
        marketingOptIn: userData.marketingOptIn || false,
        checkNickname: false,
        checkEmail: false,
      });
      setTermValue(userData.marketingOptIn || false);
    }
  }, [userData, reset]);

  return (
    <div>
      <Popup
        id={UNREGISTER_MODAL}
        title="회원 탈퇴"
        activeButtonComponent={
          <Button buttonColor="primary" size="medium" onClick={() => unregister()}>
            회원 탈퇴
          </Button>
        }
      >
        <>
          <p>
            회원 탈퇴 시 같은 정보로 30일간 재가입할 수 없습니다. 이후 모든 데이터는 삭제됩니다.
          </p>

          <p>탈퇴하시겠습니까?</p>
        </>
      </Popup>

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

          {userData?.provider === 'local' && (
            <CheckEmailInput
              register={register}
              errors={errors}
              watch={watch}
              setError={setError}
              clearErrors={clearErrors}
              setValue={setValue}
            />
          )}

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

          {/* <Checkbox
            label="마케팅 수신 동의 (선택)"
            value={termValue}
            onChange={(e) => {
              setTermValue(e.target.checked);
            }}
          /> */}
        </div>

        <Button full type="submit">
          <Text color="white01">수정하기</Text>
        </Button>

        {/* <SocialLink userData={userData} /> */}

        <LogoutSignout />
      </form>
    </div>
  );
};

export default UserInfoEditForm;
