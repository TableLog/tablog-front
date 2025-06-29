'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import CategoryTab from '@/components/atoms/category-tab/CategoryTab';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import RecipeCategory from '@/components/atoms/recipe-category/RecipeCategory';
import Tab from '@/components/atoms/tab/Tab';
import { Text } from '@/components/atoms/text/Text';
import { CALORIE_OPTIONS, COOK_TIME_OPTIONS, PRICE_OPTIONS } from '@/constants/options.constants';
import { useGetRecipeByFilter } from '@/hooks/recipe.hooks';
import { useRecipeStore } from '@/lib/zutstand/recipeStore';
import { IRecipeFilterParams } from '@/types/api';

import RecipeItem from '../recipe/recipe-item';

import FilterRecipesFood from './filter-recipes-food';

const FilterRecipes = () => {
  const { ref, inView } = useInView();
  const { setIsFilter } = useRecipeStore();

  const [activeTab, setActiveTab] = useState(0);
  const [condition, setCondition] = useState<Partial<IRecipeFilterParams> | null>(null);

  const {
    data: recipeList,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useGetRecipeByFilter(condition);

  useEffect(() => {
    if (condition === null) {
      setIsFilter(false);
    } else {
      setIsFilter(true);
    }
  }, [condition, setIsFilter]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <Tab handleTabChange={handleTabChange}>
        <div className="px-5">
          <Tab.Buttons tabs={['카테고리', '요리시간', '칼로리', '가격', '재료']} className="mb-4" />
        </div>

        <Tab.Panel index={0}>
          <RecipeCategory setCondition={setCondition} />
        </Tab.Panel>

        <Tab.Panel index={1}>
          <CategoryTab list={COOK_TIME_OPTIONS} setCondition={setCondition} type="cookingTime" />
        </Tab.Panel>

        <Tab.Panel index={2}>
          <CategoryTab list={CALORIE_OPTIONS} setCondition={setCondition} type="cal" />
        </Tab.Panel>

        <Tab.Panel index={3}>
          <CategoryTab list={PRICE_OPTIONS} setCondition={setCondition} type="recipePrice" />
        </Tab.Panel>

        <Tab.Panel index={4}>
          <FilterRecipesFood />
        </Tab.Panel>
      </Tab>

      {condition !== null && (
        <div className="mt-9 flex w-full flex-col gap-4 px-5">
          {recipeList?.recipes?.length === 0 ? (
            <Text fontSize={14} className="text-center">
              레시피가 존재하지 않습니다
            </Text>
          ) : (
            recipeList?.recipes.map((recipe) => {
              return <RecipeItem recipe={recipe} key={recipe.id} />;
            })
          )}

          {isFetching && (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}

          <div ref={ref} />
        </div>
      )}
    </div>
  );
};

export default FilterRecipes;
