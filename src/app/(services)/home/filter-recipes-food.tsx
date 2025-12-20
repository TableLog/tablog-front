import { useState } from 'react';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { Text } from '@/components/atoms/text/Text';
import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { useGetRecipeByFood } from '@/hooks/queries/recipe.hooks';

import RecipeItem from '../recipe/recipe-item';

import FoodsSearch from './food-search';

const FilterRecipesFood = () => {
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);

  const {
    data: recipeList,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetRecipeByFood(selectedFoods);

  return (
    <div>
      <div className="px-5">
        <FoodsSearch selectedFoods={selectedFoods} setSelectedFoods={setSelectedFoods} />
      </div>

      <InfiniteScroll
        className="mb-4 mt-2 flex flex-wrap gap-2 px-5"
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
      >
        {selectedFoods.map((keyword) => (
          <div
            key={keyword}
            className="flex items-center justify-center gap-1.5 rounded-full bg-grey08 py-1.5 pl-3 pr-2.5"
            // 재료 선택 해제
            onClick={() => setSelectedFoods(selectedFoods.filter((k) => k !== keyword))}
          >
            <Text fontSize={14}>{keyword}</Text>
            <button type="button">
              <BoxIcon name="x-circle" size={16} color="grey04" />
            </button>
          </div>
        ))}
      </InfiniteScroll>

      <div className="flex w-full flex-col gap-4 px-5">
        {selectedFoods.length === 0 ? (
          <Text fontSize={14} className="text-center">
            재료를 선택해주세요
          </Text>
        ) : recipeList?.recipes.length === 0 ? (
          <Text fontSize={14} className="text-center">
            레시피가 존재하지 않습니다
          </Text>
        ) : (
          recipeList?.recipes.map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />)
        )}
      </div>
    </div>
  );
};

export default FilterRecipesFood;
