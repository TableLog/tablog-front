'use client';

import React from 'react';

import RecipeCategory from '@/components/atoms/recipe-category/RecipeCategory';
import Tab from '@/components/atoms/tab/Tab';

import LatestRecipes from './latest-recipes';
import PopularRecipes from './popular-recipes';

const HomePage = () => {
  return (
    <div className="pb-[80px]">
      <section className="px-5 py-4">
        <Tab>
          <Tab.Buttons tabs={['카테고리', '요리시간', '칼로리', '가격', '재료']} className="mb-4" />

          <Tab.Panel index={0}>
            <RecipeCategory />
          </Tab.Panel>

          <Tab.Panel index={1}>요리시간</Tab.Panel>

          <Tab.Panel index={2}>칼로리</Tab.Panel>

          <Tab.Panel index={3}>가격</Tab.Panel>

          <Tab.Panel index={4}>재료</Tab.Panel>
        </Tab>
      </section>

      <section>
        <LatestRecipes />
      </section>

      <section>
        <PopularRecipes />
      </section>
    </div>
  );
};

export default HomePage;
