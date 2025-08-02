import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { useGetFeedListByUserId } from '@/hooks/users.hooks';
import { ILogResponse } from '@/types/api';

const FeedListByUser = () => {
  const { id } = useParams();

  const { ref, inView } = useInView();

  const {
    data: feedList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetFeedListByUserId(Number(id));

  useEffect(() => {
    // 무한 스크롤
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="mt-4 text-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : feedList?.pages?.[0]?.data.boards.length === 0 ? (
        <div>작성된 일기가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {feedList?.pages?.map((page) => {
            return page?.data?.boards?.map((feed: ILogResponse) => (
              <Link
                key={feed.id}
                href={`/feed/comment/${feed.id}`}
                className="border border-grey08"
              >
                <figure className="image-figure aspect-square" style={{ width: 120, height: 120 }}>
                  <Image
                    src={feed.image_urls[0]}
                    alt={feed.content}
                    width={120}
                    height={120}
                    className="image-cover"
                    priority
                  />
                </figure>
              </Link>
            ));
          })}

          {isFetching && (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}

          <div ref={ref as React.RefCallback<HTMLDivElement>} />
        </div>
      )}

      {isFetching && (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      <div ref={ref as React.RefCallback<HTMLDivElement>} />
    </div>
  );
};

export default FeedListByUser;
