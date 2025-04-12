import type { Meta, StoryObj } from '@storybook/react';

import Range from './Range';

const meta = {
  title: 'Atoms/Range',
  component: Range,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="w-[420px]">
      <Range {...args} />
    </div>
  ),
} satisfies Meta<typeof Range>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PriceRange: Story = {
  args: {
    type: 'price',
  },
};

export const TimeRange: Story = {
  args: {
    type: 'time',
  },
};
