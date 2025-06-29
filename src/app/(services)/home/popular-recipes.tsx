import React from 'react';
import Link from 'next/link';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import PopularRecipeSlider from '@/components/atoms/slider/PopularRecipeSlider';
import { Text } from '@/components/atoms/text/Text';
import { useGetSortedRecipe } from '@/hooks/recipe.hooks';

const PopularRecipes = () => {
  const { data: popularRecipeList, isLoading } = useGetSortedRecipe(
    {
      isPaid: false,
      pageNumber: 0,
    },
    { sortOption: 'popular', isMine: false },
  );

  return (
    <div className="mt-8">
      <header className="mb-4 flex items-center justify-between px-5">
        <div className="font-semibold">인기 레시피</div>

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
        <div>
          <PopularRecipeSlider list={popularRecipeList?.recipes} />
        </div>
      )}
    </div>
  );
};

export default PopularRecipes;
