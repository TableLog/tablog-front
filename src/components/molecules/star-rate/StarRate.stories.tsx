import { useForm } from 'react-hook-form';
import type { Meta } from '@storybook/react';

import StarRate from './StarRate';

const meta = {
  title: 'Molecules/StarRate',
  component: StarRate,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="">
      <StarRateExample />
    </div>
  ),
  args: {},
} satisfies Meta<typeof StarRate>;

export default meta;

export const StarRateExample = () => {
  const { control } = useForm<{ star: number }>({
    mode: 'onChange',
    defaultValues: {
      star: 5,
    },
  });

  return (
    <div className="h-[420px] w-[420px]">
      <StarRate control={control} name="star" />
    </div>
  );
};
