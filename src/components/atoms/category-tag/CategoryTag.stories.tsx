import { useForm } from 'react-hook-form';
import type { Meta } from '@storybook/react';

import CategoryTag from './CategoryTag';

const meta = {
  title: 'atoms/CategoryTag',
  component: CategoryTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => <CategoryTagExample />,
} satisfies Meta<typeof CategoryTag>;

export default meta;

export const CategoryTagExample = () => {
  const { control, watch } = useForm<{ categories: string[] }>({
    mode: 'onChange',
    defaultValues: {
      categories: [],
    },
  });

  const categories = watch('categories');

  return (
    <div className="flex h-[200px] w-[420px] flex-col gap-6">
      <CategoryTag control={control} name="categories" />
      <div>선택된 카테고리: {categories.length === 0 ? '없음' : categories.join(', ')}</div>
    </div>
  );
};
