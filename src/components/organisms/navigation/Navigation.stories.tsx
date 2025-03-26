import type { Meta, StoryObj } from '@storybook/react';

import Navigation from '@/components/organisms/navigation/Navigation';

const meta: Meta<typeof Navigation> = {
  title: 'Organisms/Navigation',
  component: Navigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  args: {},
};
