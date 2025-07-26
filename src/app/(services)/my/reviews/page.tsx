'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import { useGetUserInfo } from '@/hooks/auth.hooks';
import { useGetMyRecipeReview } from '@/hooks/my.hooks';

import ReviewItem from './review-item';

const ReviewsPage = () => {
  const { ref, inView } = useInView();

  const { data: userData } = useGetUserInfo();
  const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyRecipeReview({
    userId: userData?.id,
  });

  useEffect(() => {
    // 무한 스크롤
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div>
      <PageHeader title="남긴 리뷰" back />

      <div>
        {data?.reviews?.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div>작성된 리뷰가 없습니다.</div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {data?.reviews?.map((review) => {
              return <ReviewItem key={review.id} review={review} />;
            })}
          </div>
        )}

        {isFetching && (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}

        <div ref={ref as React.RefCallback<HTMLDivElement>} />
      </div>
    </div>
  );
};

export default ReviewsPage;
