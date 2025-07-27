import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { Text } from '@/components/atoms/text/Text';
import { useGetRecipeByFood } from '@/hooks/recipe.hooks';

import RecipeItem from '../recipe/recipe-item';

import FoodsSearch from './food-search';

const FilterRecipesFood = () => {
  const { ref, inView } = useInView();
  const [keywords, setKeywords] = useState<string[]>([]);

  const { data: recipeList, isFetching, hasNextPage, fetchNextPage } = useGetRecipeByFood(keywords);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div>
      <div className="px-5">
        <FoodsSearch keywords={keywords} setKeywords={setKeywords} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 px-5">
        {keywords.map((keyword) => {
          return (
            <div
              key={keyword}
              className="flex items-center justify-center gap-2 rounded-full border border-grey05 pl-2.5 pr-1.5"
              onClick={() => setKeywords(keywords.filter((k) => k !== keyword))}
            >
              <Text fontSize={14}>{keyword}</Text>

              <BoxIcon name="x-circle" size={14} color="grey05" />
            </div>
          );
        })}
      </div>

      <div>
        {isFetching ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="mt-9 flex w-full flex-col gap-4 px-5">
            {recipeList?.recipes?.length === 0 ? (
              <div className="flex items-center justify-center">
                <Text fontSize={14} className="text-center">
                  레시피가 존재하지 않습니다
                </Text>
              </div>
            ) : (
              recipeList?.recipes.map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />)
            )}
          </div>
        )}

        <div ref={ref} />
      </div>
    </div>
  );
};

export default FilterRecipesFood;
