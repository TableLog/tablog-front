import React from 'react';
import { useParams } from 'next/navigation';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { useGetRecipeListByUserId } from '@/hooks/users.hooks';
import { IRecipe } from '@/types/api';

const RecipeListByUser = () => {
  const { id } = useParams();

  const { data: recipeList, isLoading } = useGetRecipeListByUserId(Number(id));

  console.log(recipeList);

  return (
    <div className="mt-4 text-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : recipeList?.pages?.[0]?.data.contents.length === 0 ? (
        <div>작성된 레시피가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {recipeList?.pages?.map((page) => {
            return page.data.contents.map((recipe: IRecipe) => (
              <div key={recipe.id}>
                <h1>{recipe.title}</h1>
              </div>
            ));
          })}
        </div>
      )}
    </div>
  );
};

export default RecipeListByUser;
