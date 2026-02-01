'use client';

import { Text } from '@/components/atoms/text/Text';
import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { useGetRecipeByFilter } from '@/hooks/queries/recipe.hooks';
import { useFilterStore } from '@/lib/zustand/recipeStore';

import RecipeItem from '../recipe/recipe-item';

const FilterRecipes = ({
  type,
}: {
  type: 'cookingTime' | 'calorieRange' | 'recipePrice' | 'recipeCategory';
}) => {
  const { filterCondition } = useFilterStore();

  const {
    data: recipeList,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useGetRecipeByFilter({ [type]: filterCondition?.[type] });

  if (recipeList?.recipes?.length === 0)
    return (
      <Text fontSize={14} className="mt-4 text-center">
        레시피가 존재하지 않습니다
      </Text>
    );

  if (filterCondition !== null && !filterCondition.foodId)
    return (
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
      >
        <div className="mt-9 flex w-full flex-col gap-4 px-5">
          {recipeList?.recipes.map((recipe) => <RecipeItem recipe={recipe} key={recipe.id} />)}
        </div>
      </InfiniteScroll>
    );
};

export default FilterRecipes;
