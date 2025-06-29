'use client';

import React from 'react';

import { useRecipeStore } from '@/lib/zutstand/recipeStore';

import FilterRecipes from './filter-recipes';
import LatestRecipes from './latest-recipes';
import PopularRecipes from './popular-recipes';

const HomePage = () => {
  const { isFilter } = useRecipeStore();

  return (
    <div className="pb-[80px]">
      <section className="py-4">
        <FilterRecipes />
      </section>

      {!isFilter && (
        <>
          <section>
            <LatestRecipes />
          </section>

          <section>
            <PopularRecipes />
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
