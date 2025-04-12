import type { Meta, StoryObj } from '@storybook/react';

import { TERMS_OPTIONS } from '@/constants/options.constants';

import CheckAll from './CheckAll';

const meta = {
  title: 'Molecules/CheckAll',
  component: CheckAll,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="w-[420px]">
      <CheckAll {...args} />
    </div>
  ),
} satisfies Meta<typeof CheckAll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckAllComponent: Story = {
  args: {
    options: TERMS_OPTIONS,
  },
};
