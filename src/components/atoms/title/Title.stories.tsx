import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Title from './Title';

const meta = {
  title: 'atoms/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="bg-primary01">
      <Title {...args} />
    </div>
  ),
  args: { onClick: fn() },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
