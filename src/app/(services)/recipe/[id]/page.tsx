'use client';

import { use } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import { useGetRecipeDetail } from '@/hooks/recipe.hooks';

import Description from './description';
import Ingredient from './ingredient';
import RecipeHeader from './recipe-header';

export enum ERecipeDetailSection {
  INGREDIENT = '재료 보기',
  DESCRIPTION = '설명 보기',
}

const RecipeDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const recipeId = parseInt(use(params).id);
  const { data: recipeInfo } = useGetRecipeDetail({
    recipeId,
  });
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') ?? ERecipeDetailSection.INGREDIENT;
  const recipe = recipeInfo?.data;

  return (
    <div className="relative h-[calc(100vh-60px)] w-full">
      <RecipeHeader recipeId={recipeId} isMyRecipe={recipe?.isWriter} />
      {recipe && (
        <Image
          src={recipe.imageUrl}
          alt={`${recipe.title} 레시피`}
          fill
          className="object-cover object-center brightness-[0.6]"
        />
      )}
      <div className="absolute bottom-8 flex w-full flex-col gap-8 px-5">
        {recipe && mode === ERecipeDetailSection.INGREDIENT ? (
          <Description recipe={recipe} />
        ) : (
          <Ingredient recipeId={recipeId} />
        )}
        <Button full>요리 시작</Button>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
