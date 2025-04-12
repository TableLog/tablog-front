import type { Meta, StoryObj } from '@storybook/react';

import RecipeInfo from './RecipeInfo';

const meta = {
  title: 'molecules/Recipeinfo',
  component: RecipeInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => <RecipeInfo {...args} />,
} satisfies Meta<typeof RecipeInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    recipeName: '나만의 레몬 칵테일 레시피',
    price: 27000,
    time: 20,
    calorie: 1200,
    star: 4.9,
    comments: 1235,
    author: '작성자명',
  },
};
