import type { Meta, StoryObj } from '@storybook/react';

import { ECookTime, EPrice } from '@/types/enum';

import RecipeCard from './RecipeCard';

const meta = {
  title: 'organisms/RecipeCard',
  component: RecipeCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <RecipeCard.RecipeInfo
        recipeName="나만의 레몬 칵테일 레시피"
        price={EPrice.p10000}
        time={ECookTime.minute_10}
        calorie={1200}
        star={4.9}
        comments={1235}
        author="작성자명"
      />
    ),
  },
  render: (args) => {
    return <RecipeCard recipeImg="/tea.png">{args.children}</RecipeCard>;
  },
};

export const NoneInfo: Story = {
  args: {},
  render: () => {
    return <RecipeCard recipeImg="/tea.png" />;
  },
};

export const Latest: Story = {
  args: {
    children: (
      <RecipeCard.RecipeInfo
        recipeName="나만의 레몬 칵테일 레시피"
        price={EPrice.p10000}
        time={ECookTime.minute_10}
        calorie={1200}
        star={4.9}
        comments={1235}
        author="작성자명"
        latest={true}
      />
    ),
  },
  render: (args) => {
    return (
      <RecipeCard recipeImg="/tea.png" latest={true}>
        {args.children}
      </RecipeCard>
    );
  },
};
