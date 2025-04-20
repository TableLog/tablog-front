import type { Meta, StoryObj } from '@storybook/react';

import Bookmark from './Bookmark';

const meta = {
  title: 'molecules/Bookmark',
  component: Bookmark,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => <Bookmark {...args} />,
} satisfies Meta<typeof Bookmark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const isNotMarked: Story = {
  args: {
    isMarked: false,
  },
};

export const isMarked: Story = {
  args: {
    isMarked: true,
  },
};
