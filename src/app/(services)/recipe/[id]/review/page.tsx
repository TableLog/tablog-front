'use client';
import { use, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Button from '@/components/atoms/button/Button';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import { useGetReviews } from '@/hooks/recipe.hooks';

import Review from './review';

const ReviewPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const recipeId = parseInt(use(params).id);
  const { ref, inView } = useInView();

  const { data, hasNextPage, fetchNextPage, isFetching } = useGetReviews({
    recipeId,
    pageNumber: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="relative px-5 py-4">
      <PageHeader className="mb-4" title="리뷰" back backUrl={`/recipe/${recipeId}`}>
        <Button href={`/recipe/${recipeId}/review/write`} size="small">
          리뷰 작성
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-3">
        {data?.reviews.map((review) => <Review key={review.id} review={review} />)}

        {isFetching && (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        <div ref={ref} />
      </div>
    </div>
  );
};

export default ReviewPage;
