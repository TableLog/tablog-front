'use client';
import dynamic from 'next/dynamic';

import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { FEED_QUERY_KEY } from '@/constants/query-key.constants';
import { useGetLogList } from '@/hooks/queries/feed.hooks';
import { useFeedItemActions } from '@/hooks/useFeedItemActions';
import useScrollPosition from '@/hooks/useScrollPosition';
import { ILogResponse } from '@/types/api';

const FeedItem = dynamic(() => import('./feed-item'), {
  ssr: false,
});

const FeedList = () => {
  const { data: logList, hasNextPage, fetchNextPage, isFetching } = useGetLogList();

  const { contentRefs } = useFeedItemActions();

  // 스크롤 위치 저장 (뒤로가기시 해당 위치로 이동)
  useScrollPosition({
    storageKey: `${FEED_QUERY_KEY.LIST()}-scroll`,
    shouldRestore: !isFetching,
  });

  return (
    <div>
      <InfiniteScroll
        className="space-y-8"
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
      >
        {logList?.pages?.map((page) =>
          page.data.boards.map((log: ILogResponse) => (
            <FeedItem key={log.id} log={log} isMyPost={log.isMe} contentRefs={contentRefs} />
          )),
        )}
      </InfiniteScroll>
    </div>
  );
};

export default FeedList;
