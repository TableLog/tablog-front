import type { Meta, StoryObj } from '@storybook/react';

import { UNIT_LIST } from '@/constants/list.constants';
import { UNIT_VALIDATION } from '@/constants/validation.constants';

import SelectBox from './SelectBox';

const meta = {
  title: 'Atoms/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="w-[420px]">
      <SelectBox {...args} />
    </div>
  ),
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicSelectBox: Story = {
  args: {
    category: 'unit',
    list: UNIT_LIST,
  },
};

export const SelectBoxWithError: Story = {
  args: {
    category: 'unit',
    list: UNIT_LIST,
    isError: true,
    errorMessage: UNIT_VALIDATION,
  },
};
