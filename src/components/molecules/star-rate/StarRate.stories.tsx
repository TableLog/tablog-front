import type { Meta, StoryObj } from '@storybook/react';

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
      <StarRate />
    </div>
  ),
  args: {},
} satisfies Meta<typeof StarRate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
