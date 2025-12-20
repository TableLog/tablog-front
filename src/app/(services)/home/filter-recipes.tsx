'use client';

import { useEffect } from 'react';

import CategoryTab from '@/components/atoms/category-tab/CategoryTab';
import RecipeCategory from '@/components/atoms/recipe-category/RecipeCategory';
import Tab from '@/components/atoms/tab/Tab';
import { Text } from '@/components/atoms/text/Text';
import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { CALORIE_OPTIONS, COOK_TIME_OPTIONS, PRICE_OPTIONS } from '@/constants/options.constants';
import { useGetRecipeByFilter } from '@/hooks/queries/recipe.hooks';
import { useFilterStore, useRecipeStore } from '@/lib/zustand/recipeStore';

import RecipeItem from '../recipe/recipe-item';

import FilterRecipesFood from './filter-recipes-food';
import LatestRecipes from './latest-recipes';
import PopularRecipes from './popular-recipes';

const FilterRecipes = () => {
  const { setIsFilter } = useRecipeStore();

  const { filterCondition } = useFilterStore();

  const {
    data: recipeList,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useGetRecipeByFilter(filterCondition);

  useEffect(() => {
    setIsFilter(filterCondition !== null);
  }, [filterCondition, setIsFilter]);

  return (
    <div>
      <Tab>
        <div className="px-5">
          <Tab.Buttons tabs={['카테고리', '요리시간', '칼로리', '가격', '재료']} className="mb-4" />
        </div>

        <Tab.Panel index={0}>
          <RecipeCategory />
          <section>
            <LatestRecipes />
          </section>

          <section>
            <PopularRecipes />
          </section>
        </Tab.Panel>

        <Tab.Panel index={1}>
          <CategoryTab list={COOK_TIME_OPTIONS} type="cookingTime" />
        </Tab.Panel>

        <Tab.Panel index={2}>
          <CategoryTab list={CALORIE_OPTIONS} type="calorieRange" />
        </Tab.Panel>

        <Tab.Panel index={3}>
          <CategoryTab list={PRICE_OPTIONS} type="recipePrice" />
        </Tab.Panel>

        <Tab.Panel index={4}>
          <FilterRecipesFood />
        </Tab.Panel>
      </Tab>

      {filterCondition !== null && !filterCondition.foodId && (
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          fetchNextPage={fetchNextPage}
        >
          {recipeList?.recipes?.length === 0 ? (
            <Text fontSize={14} className="mt-4 text-center">
              레시피가 존재하지 않습니다
            </Text>
          ) : (
            <div className="mt-9 flex w-full flex-col gap-4 px-5">
              {recipeList?.recipes.map((recipe) => <RecipeItem recipe={recipe} key={recipe.id} />)}
            </div>
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default FilterRecipes;
