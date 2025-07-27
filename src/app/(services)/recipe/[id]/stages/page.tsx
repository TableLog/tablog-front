'use client';
import { use, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { useGetRecipeProcesses } from '@/hooks/recipe.hooks';

import Sequence from './sequence';

const StagesPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const recipeId = parseInt(use(params).id);
  const router = useRouter();
  const { ref, inView } = useInView();

  const {
    data: recipeProcesses,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useGetRecipeProcesses({
    recipeId,
    page: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  function handleBackButtonClick() {
    router.back();
  }

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col px-5 py-4">
      <div className="mb-3 font-semibold">단계 목록</div>
      <div className="flex flex-grow flex-col gap-5 overflow-auto">
        {recipeProcesses?.data.map((recipeProcess) => (
          <Sequence key={recipeProcess.id} recipe={recipeProcess} />
        ))}

        {isFetching && (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}

        <div ref={ref} />
      </div>
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
