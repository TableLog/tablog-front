import RecipeInfo from '@/components/molecules/recipe-info/RecipeInfo';
import { ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface IRecipeCardProps {
  children?: ReactNode;
  recipeImg?: string;
  latest?: boolean;
}

const RecipeCard = ({ children, recipeImg }: IRecipeCardProps) => {
  const bgImg = recipeImg ? `url(${recipeImg})` : 'bg-grey04';

  return (
    <div
      style={{ backgroundImage: recipeImg && bgImg }}
      className={cn(
        recipeImg || bgImg,
        'relative flex h-[256px] w-[335px] flex-col rounded-[20px] bg-cover',
      )}
    >
      {children}
    </div>
  );
};

RecipeCard.RecipeInfo = RecipeInfo;

export default RecipeCard;
