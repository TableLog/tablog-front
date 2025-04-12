import type { Meta, StoryObj } from '@storybook/react';

import ProfileImage from './ProfileImage';

const meta = {
  title: 'molecules/ProfileImage',
  component: ProfileImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => <ProfileImage {...args} />,
} satisfies Meta<typeof ProfileImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const hasImg: Story = {
  args: {
    url: '/tea.png',
  },
};
