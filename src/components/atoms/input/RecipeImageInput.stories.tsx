import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Meta } from '@storybook/react';

import Button from '../button/Button';

import RecipeImageInput from './RecipeImageInput';

const meta = {
  title: 'Atoms/RecipeImageInput',
  component: RecipeImageInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => <RecipeImageInputExample />,
} satisfies Meta<typeof RecipeImageInput>;

export default meta;

export const RecipeImageInputExample = () => {
  const [imageRequired, setImageRequired] = useState(false);

  const { control } = useForm<{ images: (File | string)[] }>({
    mode: 'onChange',
    defaultValues: {
      images: [],
    },
  });

  return (
    <div className="flex h-100 w-100 flex-col gap-6">
      <RecipeImageInput half error={imageRequired} control={control} name="images" />
      <Button buttonColor="grey04" onClick={() => setImageRequired((prev) => !prev)}>
        에러 토글 버튼
      </Button>
    </div>
  );
};
