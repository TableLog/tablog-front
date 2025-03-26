import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Icon from './Icon';

const meta = {
  title: 'atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="bg-primary01">
      <Icon {...args} className="text-white01" />
    </div>
  ),
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const bell: Story = {
  args: {
    iconName: 'bx bx-bell',
    onClick: fn(),
  },
};

export const search: Story = {
  args: {
    iconName: 'bx bx-search-alt',
    onClick: fn(),
  },
};
