import { useForm } from 'react-hook-form';
import type { Meta } from '@storybook/react';

import { UNIT_OPTIONS } from '@/constants/options.constants';

import SelectBox from './SelectBox';

const meta = {
  title: 'Atoms/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="h-[200px] w-[420px]">
      <SelectBoxExample />
    </div>
  ),
} satisfies Meta<typeof SelectBox>;

export default meta;

export const SelectBoxExample = () => {
  const { control, watch } = useForm<{ unit: string }>({
    mode: 'onChange',
    defaultValues: {
      unit: UNIT_OPTIONS[0].name,
    },
  });

  const unit = watch('unit');

  return (
    <div className="flex h-[200px] w-[420px] flex-col gap-6">
      <SelectBox control={control} category="unit" list={UNIT_OPTIONS} />
      <div>선택된 단위: {unit || '없음'}</div>
    </div>
  );
};
