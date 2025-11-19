import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { useGetFeedListByUserId } from '@/hooks/queries/users.hooks';
import { ILogResponse } from '@/types/api';

const FeedListByUser = () => {
  const { id } = useParams();

  const {
    data: feedList,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetFeedListByUserId(Number(id));

  return (
    <InfiniteScroll
      className="mt-4 px-5 text-center"
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
    >
      {feedList?.pages?.[0]?.data.boards.length === 0 ? (
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
        </div>
      )}
    </InfiniteScroll>
  );
};

export default FeedListByUser;
