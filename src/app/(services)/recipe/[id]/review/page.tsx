'use client';
import { use } from 'react';
import Link from 'next/link';

import Button from '@/components/atoms/button/Button';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { useGetReviews } from '@/hooks/queries/recipe.hooks';

import Review from './review';

const ReviewPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const recipeId = parseInt(use(params).id);

  const { data, hasNextPage, fetchNextPage, isFetching } = useGetReviews({
    recipeId,
    page: 0,
  });

  const REVIEW_WRITE_PAGE_PATH = `/recipe/${recipeId}/review/write`;

  return (
    <div className="relative px-5 pb-4">
      <PageHeader className="mb-4" title="리뷰" back backUrl={`/recipe/${recipeId}`}>
        {!data?.isWriter && (
          <Button href={REVIEW_WRITE_PAGE_PATH} size="small">
            리뷰 작성
          </Button>
        )}
      </PageHeader>

      <InfiniteScroll
        className="flex flex-col gap-8"
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
      >
        {data?.reviews.length === 0 ? (
          <div className="flex flex-col items-center gap-2">
            <p>작성된 리뷰가 없습니다</p>
            {!data.isWriter && (
              <Link href={REVIEW_WRITE_PAGE_PATH} className="text-sm text-grey01 underline">
                첫 리뷰 작성하러 가기
              </Link>
            )}
          </div>
        ) : (
          data?.reviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-6">
              <Review review={review} isWriter={data.isWriter} />
              {review.reply && <Review review={review.reply} isReply isWriter={data.isWriter} />}
            </div>
          ))
        )}
      </InfiniteScroll>
    </div>
  );
};

export default ReviewPage;
