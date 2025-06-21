'use client';

import React, { SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/atoms/button/Button';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
import { useFindAccount } from '@/hooks/auth.hooks';
import { zodFindAccount } from '@/lib/zod/zodValidation';
import { TFindAccountFormValues } from '@/types/api';

interface IFindAccountForm {
  setStep: React.Dispatch<SetStateAction<number>>;
  setAccountInfo: React.Dispatch<SetStateAction<{ provider: string; email: string }>>;
}
const FindAccountForm = ({ setStep, setAccountInfo }: IFindAccountForm) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TFindAccountFormValues>({
    resolver: zodResolver(zodFindAccount),
    mode: 'onChange',
    defaultValues: {
      userName: '',
      birthday: '',
    },
  });

  const { mutate: findAccount } = useFindAccount({
    onSuccess: (res) => {
      if (res.status === 200) {
        setStep(1);

        setAccountInfo(res.data);
      }
    },
  });

  const onSubmit: SubmitHandler<TFindAccountFormValues> = async (data) => {
    findAccount(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex-1">
      <div>
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
      </div>

      <div className="absolute bottom-10 flex w-full">
        <Button full type="submit">
          <Text color="white01">이메일 찾기</Text>
        </Button>
      </div>
    </form>
  );
};

export default FindAccountForm;
