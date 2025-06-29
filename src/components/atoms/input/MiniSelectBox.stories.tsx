import type { Meta, StoryObj } from '@storybook/react';

import { RECIPE_FILTER_OPTIONS } from '@/constants/options.constants';

import MiniSelectBox from './MiniSelectBox';

const meta = {
  title: 'Atoms/MiniSelectBox',
  component: MiniSelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="h-[100px] w-[400px]">
      <MiniSelectBox {...args} />
    </div>
  ),
} satisfies Meta<typeof MiniSelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmailInput: Story = {
  args: {
    list: RECIPE_FILTER_OPTIONS,
    value: RECIPE_FILTER_OPTIONS[0],
    onChange: () => {},
  },
};
