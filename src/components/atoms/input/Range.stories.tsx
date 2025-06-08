import { useForm } from 'react-hook-form';
import type { Meta } from '@storybook/react';

import Range from './Range';

const meta = {
  title: 'Atoms/Range',
  component: Range,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => <RangeExample />,
} satisfies Meta<typeof Range>;

export default meta;

export const RangeExample = () => {
  const { control } = useForm<{ price: number }>({
    mode: 'onChange',
  });

  return (
    <div className="w-[420px]">
      <Range name="price" type="price" control={control} />
    </div>
  );
};
