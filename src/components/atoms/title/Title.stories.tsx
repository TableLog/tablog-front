import type { Meta, StoryObj } from '@storybook/react';

import Title from './Title';

const meta = {
  title: 'atoms/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="bg-primary01">
      <Title />
    </div>
  ),
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
