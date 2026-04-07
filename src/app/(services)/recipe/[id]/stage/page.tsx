'use client';
import { Suspense, use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import Carousel from '@/components/organisms/carousel/Carousel';
import { useGetRecipeProcessBySequence } from '@/hooks/queries/recipe.hooks';

const RecipeProcessContent = ({ params }: { params: Promise<{ id: string }> }) => {
  const recipeId = parseInt(use(params).id);
  const searchParams = useSearchParams();
  const sequenceParam = searchParams.get('sequence');
  const sequence = sequenceParam ? parseInt(sequenceParam) : 0;
  const {
    data: currentProcess,
    isPending,
    isError,
  } = useGetRecipeProcessBySequence(
    { recipeId, sequence },
    {
      select: (res) => ({
        ...res.data.recipeProcesses,
        hasPrev: res.data.hasPrev,
        hasNext: res.data.hasNext,
      }),
    },
  );

  if (isPending)
    return (
      <div className="flex h-[calc(100dvh-92px)] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (isError) return <div>Error</div>;

  return (
    <div className="flex min-h-[calc(100dvh-60px)] flex-col justify-between gap-8 px-5 py-4">
      <div className="flex flex-grow flex-col overflow-auto">
        <div className="mb-3 font-semibold">
          {sequence + 1}단계. {currentProcess.rpTitle}
        </div>
        <div className="mb-6">
          <Carousel
            imageList={currentProcess.recipeProcessImageUrls.map((src, idx) => ({
              src,
              alt: `${currentProcess.rpTitle} 레시피 ${sequence}단계 참고 이미지 ${idx}`,
            }))}
          />
        </div>
        <p className="flex-grow overflow-auto break-all">{currentProcess.description}</p>
      </div>
      <div className="flex justify-between">
        <Link
          href={`/recipe/${recipeId}/stages`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black01"
        >
          <BoxIcon name="list-ul" type="solid" size={24} />
        </Link>
        <div className="flex gap-1.5">
          <Button
            buttonColor="grey06"
            className="w-32"
            href={`/recipe/${recipeId}/stage?sequence=${sequence - 1}`}
            disabled={!currentProcess.hasPrev}
          >
            이전
          </Button>
          {currentProcess.hasNext ? (
            <Button className="w-32" href={`/recipe/${recipeId}/stage?sequence=${sequence + 1}`}>
              다음
            </Button>
          ) : (
            <Button className="w-32" href={`/recipe/${recipeId}`}>
              완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const RecipeProcessPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100dvh-92px)] items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <RecipeProcessContent params={params} />
    </Suspense>
  );
};

export default RecipeProcessPage;
