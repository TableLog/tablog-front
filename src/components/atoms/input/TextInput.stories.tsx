// TextInput.stories.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { Meta } from '@storybook/react';

import TextInput from './TextInput';

export default {
  title: 'Atoms/TextInput', // 스토리북 내 컴포넌트 위치
  component: TextInput,
} as Meta;

export const EmailInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: { email: string }) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px]">
      <TextInput type="email" category="email" register={register} errors={errors} />

      <button type="submit">Submit</button>
    </form>
  );
};
