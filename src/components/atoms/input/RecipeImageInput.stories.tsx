import type { Meta, StoryObj } from '@storybook/react';

import RecipeImageInput from './RecipeImageInput';

const meta = {
  title: 'Atoms/RecipeImageInput',
  component: RecipeImageInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="h-[500px] max-h-[500px] w-[500px] max-w-[500px]">
      <RecipeImageInput />
    </div>
  ),
  args: {},
} satisfies Meta<typeof RecipeImageInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
