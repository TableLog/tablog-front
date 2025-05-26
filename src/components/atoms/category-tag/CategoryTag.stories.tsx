import type { Meta, StoryObj } from '@storybook/react';

import CategoryTag from './CategoryTag';

const meta = {
  title: 'molecules/CategoryTag',
  component: CategoryTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => <CategoryTag />,
} satisfies Meta<typeof CategoryTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
