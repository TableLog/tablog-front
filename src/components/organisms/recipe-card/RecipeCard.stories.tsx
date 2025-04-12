import type { Meta, StoryObj } from '@storybook/react';

import RecipeCard from './RecipeCard';

const meta = {
  title: 'organisms/RecipeCard',
  component: RecipeCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => <RecipeCard {...args} />,
} satisfies Meta<typeof RecipeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    recipe: {
      recipeName: '나만의 레몬 칵테일 레시피',
      price: 27000,
      time: 20,
      calorie: 1200,
      star: 4.9,
      comments: 1235,
      author: '작성자명',
      marked: false,
    },
  },
};

export const hasBgImg: Story = {
  args: {
    recipe: {
      recipeName: '나만의 레몬 칵테일 레시피',
      price: 27000,
      time: 20,
      calorie: 1200,
      star: 4.9,
      comments: 1235,
      author: '작성자명',
      marked: false,
      recipeImg: '/tea.png',
    },
  },
};

export const latestRecipe: Story = {
  args: {
    recipe: {
      recipeName: '나만의 레몬 칵테일 레시피',
      price: 27000,
      time: 20,
      calorie: 1200,
      star: 4.9,
      comments: 1235,
      author: '작성자명',
      marked: false,
      recipeImg: '/tea.png',
      latest: true,
    },
  },
};
