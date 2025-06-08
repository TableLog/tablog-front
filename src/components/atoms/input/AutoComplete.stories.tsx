import { useForm } from 'react-hook-form';
import type { Meta } from '@storybook/react';

import AutoComplete from './AutoComplete';

const meta = {
  title: 'Atoms/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="h-[200px] w-[420px]">
      <AutoCompleteExample />
    </div>
  ),
} satisfies Meta<typeof AutoComplete>;

export default meta;

export const AutoCompleteExample = () => {
  const { control, watch } = useForm<{ foodId: number }>({
    mode: 'onChange',
  });

  const foodId = watch('foodId');

  return (
    <div className="flex h-[200px] w-[420px] flex-col gap-6">
      <AutoComplete
        list={[
          { id: 1, title: '재료 1' },
          { id: 2, title: '재료 2' },
          { id: 3, title: '재료 3' },
        ]}
        category="search"
        control={control}
        name="foodId"
      />
      <div>선택된 음식의 아이디: {foodId || '없음'}</div>
    </div>
  );
};
