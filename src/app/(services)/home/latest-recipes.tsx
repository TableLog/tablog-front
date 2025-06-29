import React from 'react';
import Link from 'next/link';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import LatestRecipeSlider from '@/components/atoms/slider/LatestRecipeSlider';
import { Text } from '@/components/atoms/text/Text';
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
        <div className="flex h-[280px] flex-col items-center justify-center gap-2">
          <Text fontSize={14}>불러오는 중...</Text>

          <LoadingSpinner />
        </div>
      ) : (
        <div className="pl-5">
          <LatestRecipeSlider list={latestRecipeList?.recipes} />
        </div>
      )}
    </div>
  );
};

export default LatestRecipes;
