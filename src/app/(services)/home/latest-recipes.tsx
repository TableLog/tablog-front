import React from 'react';
import Link from 'next/link';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import LatestRecipeSlider from '@/components/atoms/slider/LatestRecipeSlider';
import { useGetSortedRecipe } from '@/hooks/recipe.hooks';

const LatestRecipes = () => {
  const { data: latestRecipeList, isLoading } = useGetSortedRecipe(
    {
      isPaid: false,
      pageNumber: 0,
    },
    { sortOption: 'latest', isMine: false },
  );

  return (
    <div className="mt-8">
      <header className="mb-4 flex items-center justify-between px-5">
        <div className="font-semibold">최신 레시피</div>

        <Link href="/recipes" className="text-grey01 border-b-grey01 border-b text-sm">
          더보기
        </Link>
      </header>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="pl-5">
          <LatestRecipeSlider list={latestRecipeList?.recipes} />
        </div>
      )}
    </div>
  );
};

export default LatestRecipes;
