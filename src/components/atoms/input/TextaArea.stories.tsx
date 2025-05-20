// TextInput.stories.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { Meta } from '@storybook/react';

import TextArea from './TextArea';

export default {
  title: 'Atoms/TextArea',
  component: TextArea,
} as Meta;

export const EmailInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = (data: { content: string }) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px]">
      <TextArea category="email" register={register} errors={errors} maxLength={500} />

      <button type="submit">Submit</button>
    </form>
  );
};
