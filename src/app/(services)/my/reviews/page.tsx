'use client';

import PageHeader from '@/components/atoms/page-header/PageHeader';
import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { useGetUserInfo } from '@/hooks/queries/auth.hooks';
import { useGetMyRecipeReview } from '@/hooks/queries/my.hooks';

import ReviewItem from './review-item';

const ReviewsPage = () => {
  const { data: userData } = useGetUserInfo();
  const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyRecipeReview({
    userId: userData?.id,
  });

  return (
    <div className="relative px-5 pb-4">
      <PageHeader title="남긴 리뷰" back />

      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
      >
        {data?.reviews?.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div>작성된 리뷰가 없습니다.</div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {data?.reviews?.map((review) => {
              return <ReviewItem key={review.id} review={review} />;
            })}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default ReviewsPage;
