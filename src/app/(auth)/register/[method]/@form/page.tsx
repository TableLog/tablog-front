'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';

import Button from '@/components/atoms/button/Button';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
import { REGISTER_URL } from '@/constants/endpoint.constants';
import { RegisterFormValues } from '@/types/api';

interface IRegisterForm {
  registerMethod: string;
  imageFile: File | null;
}
const RegisterForm = ({ registerMethod, imageFile }: IRegisterForm) => {
  const { register, handleSubmit } = useForm<RegisterFormValues>();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const formdata = new FormData();

    formdata.append('controllerRequestDto', JSON.stringify(data));

    if (imageFile) {
      formdata.append('multipartFile', imageFile);
    }

    try {
      await axios.post(`http://localhost:8080${REGISTER_URL}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-[56px] flex flex-col gap-2">
        <TextInput type="text" category="nickname" buttonText="중복 확인" register={register} />

        <TextInput type="text" category="username" register={register} />

        <TextInput type="text" category="birthday" register={register} />

        <TextInput type="email" category="email" buttonText="중복 확인" register={register} />

        {registerMethod === 'email' && (
          <>
            <TextInput type="password" category="password" register={register} />

            <TextInput type="password" category="passwordConfirm" register={register} />
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
