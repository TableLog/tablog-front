'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { useGetRecipeProcesses } from '@/hooks/queries/recipe.hooks';

import Sequence from './sequence';

const StagesPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const recipeId = parseInt(use(params).id);
  const router = useRouter();

  const {
    data: recipeProcesses,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useGetRecipeProcesses({
    recipeId,
    page: 0,
  });

  function handleBackButtonClick() {
    router.back();
  }

  return (
    <div className="flex min-h-[calc(100dvh-60px)] flex-col px-5 py-4">
      <div className="mb-2 font-semibold">레시피 순서</div>
      <InfiniteScroll
        className="flex flex-grow flex-col gap-5 overflow-auto"
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
      >
        {recipeProcesses?.data.map((recipeProcess) => (
          <Sequence key={recipeProcess.id} recipe={recipeProcess} />
        ))}
      </InfiniteScroll>
      <button
        type="button"
        className="fixed bottom-4 left-5 flex h-10 w-10 items-center justify-center rounded-full border border-black01 bg-white01"
        onClick={handleBackButtonClick}
      >
        <BoxIcon name="x" type="solid" size={24} />
      </button>
    </div>
  );
};

export default StagesPage;
