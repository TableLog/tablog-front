import React from 'react';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { useGetRecipeIngredient } from '@/hooks/recipe.hooks';

interface IngredientProps {
  recipeId: number;
}

const Ingredient = ({ recipeId }: IngredientProps) => {
  const { data } = useGetRecipeIngredient({
    recipeId,
  });

  const recipeIngredient = data?.data;

  return (
    <div className="bg-white01/20 text-white01 flex flex-col items-center gap-4 rounded-[20px] px-4 py-6 backdrop-blur-2xl">
      <p className="text-lg font-medium">{recipeIngredient?.title}</p>
      <div className="flex w-full flex-col gap-4">
        {recipeIngredient?.recipeFoods.map((ingredient) => (
          <div key={ingredient.id} className="flex justify-between">
            <div>
              {ingredient.foodName} | {ingredient.amount}
              {ingredient.recipeFoodUnit} ({ingredient.cal})kcal
            </div>
            <button>
              <BoxIcon class="bxr bx-cart" size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredient;
