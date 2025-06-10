'use client';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import DeleteFeedModal from '@/components/molecules/feed/DeleteFeedModal';
import { FEED_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useGetLogList } from '@/hooks/feed.hooks';
import { useScrollPosition } from '@/hooks/function.hooks';
import { useFeedItemActions } from '@/hooks/useFeedItemActions';
import { ILogResponse } from '@/types/api';

const FeedItem = dynamic(() => import('./feed-item'), {
  ssr: false,
});

const FeedList = () => {
  const { ref, inView } = useInView();
  const { data: logList, hasNextPage, fetchNextPage, isFetching } = useGetLogList();

  const {
    setLogId,
    expandedItems,
    showMoreButton,
    setShowMoreButton,
    contentRefs,
    toggleExpand,
    handleDelete,
  } = useFeedItemActions();

  useEffect(() => {
    // 더보기 버튼 표시 여부
    const newState: Record<number, boolean> = {};

    for (const key in contentRefs.current) {
      const el = contentRefs.current[key];

      if (el) {
        newState[+key] = el.scrollHeight > 40;
      }
    }
    setShowMoreButton(newState);
  }, [contentRefs, logList, setShowMoreButton]);

  useEffect(() => {
    // 무한 스크롤
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 스크롤 위치 저장 (뒤로가기시 해당 위치로 이동)
  useScrollPosition({
    storageKey: `${FEED_LIST_QUERY_KEY}-scroll`,
    shouldRestore: !isFetching,
  });

  return (
    <div>
      <DeleteFeedModal onDelete={handleDelete} />

      <div>
        {logList?.pages?.map((page) =>
          page.data.boards.map((log: ILogResponse) => {
            const isExpanded = expandedItems[log.id];
            const showMore = showMoreButton[log.id];

            return (
              <FeedItem
                key={log.id}
                log={log}
                setLogId={setLogId}
                showMore={showMore}
                isMyPost={log.isMe}
                isExpanded={isExpanded}
                toggleExpand={toggleExpand}
                contentRefs={contentRefs}
              />
            );
          }),
        )}
      </div>

      {isFetching && (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      <div ref={ref as React.RefCallback<HTMLDivElement>} />
    </div>
  );
};

export default FeedList;
