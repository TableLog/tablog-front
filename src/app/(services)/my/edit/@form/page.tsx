import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/atoms/button/Button';
import { Checkbox } from '@/components/atoms/input/Checkbox';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
import { CheckEmailInput, CheckNicknameInput } from '@/components/molecules/input/DuplicateCheck';
import { zodUserInfo } from '@/lib/zod/zodValidation';
import { TUserData, TUserInfoEditFormValues } from '@/types/api';

interface IUserInfoEditForm {
  imageFile: File | null;
  userData: TUserData;
  imageSrc: string;
}
const UserInfoEditForm = ({ imageSrc, imageFile, userData }: IUserInfoEditForm) => {
  const [termValue, setTermValue] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TUserInfoEditFormValues>({
    resolver: zodResolver(zodUserInfo),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      imgUrl: '',
      marketingOptIn: false,
      checkNickname: false,
      checkEmail: false,
      provider: 'local',
    },
  });

  const onSubmit: SubmitHandler<TUserInfoEditFormValues> = async (data) => {
    const formdata = new FormData();

    formdata.append(
      'controllerRequestDto',
      JSON.stringify({
        ...data,
        imgUrl: imageSrc,
        marketingOptIn: termValue,
      }),
    );

    if (imageFile) {
      formdata.append('multipartFile', imageFile);
    }
  };

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

          <TextInput<TUserInfoEditFormValues>
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

          <CheckEmailInput<TUserInfoEditFormValues>
            register={register}
            errors={errors}
            watch={watch}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue}
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
        </div>

        <Checkbox
          label="마케팅 수신 동의 (선택)"
          value={termValue}
          onChange={(prev) => setTermValue(!prev)}
        />

        <Button full type="submit">
          <Text color="white01">회원가입</Text>
        </Button>
      </form>
    </div>
  );
};

export default UserInfoEditForm;
