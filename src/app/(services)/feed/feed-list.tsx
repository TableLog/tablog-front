'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQueryClient } from '@tanstack/react-query';

import Button from '@/components/atoms/button/Button';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import Popup from '@/components/molecules/popup/Popup';
import { DELETE_FEED_MODAL } from '@/constants/modal.constants';
import { FEED_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useDeleteLog, useGetLogList } from '@/hooks/feed.hooks';
import { useScrollPosition } from '@/hooks/function.hooks';
import { ILogResponse } from '@/types/api';
import { showToast } from '@/utils/functions';

import FeedItem from './feed-item';

const FeedList = () => {
  const { ref, inView } = useInView();
  const [logId, setLogId] = useState(-1);

  const queryClient = useQueryClient();

  const { data: logList, hasNextPage, fetchNextPage, isFetching } = useGetLogList();

  const { mutate: deleteLog } = useDeleteLog({
    onSuccess: (res) => {
      if (res.status === 200) {
        const modal = document.getElementById(DELETE_FEED_MODAL) as HTMLDialogElement;
        modal.close();
        showToast({ message: '일기를 삭제했습니다.', type: 'success' });
        queryClient.invalidateQueries({ queryKey: [FEED_LIST_QUERY_KEY] });
      }
    },
  });

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [showMoreButton, setShowMoreButton] = useState<Record<number, boolean>>({});

  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

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
  }, [logList]);

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
      <Popup
        id={DELETE_FEED_MODAL}
        title="일기 삭제"
        activeButtonComponent={
          <Button
            buttonColor="primary"
            size="medium"
            onClick={() => {
              if (logId) {
                deleteLog(logId);
              }
            }}
          >
            삭제
          </Button>
        }
      >
        <>
          <p>일기를 삭제하시겠습니까?</p>

          <p>삭제하신 후 되돌리실 수 없습니다.</p>
        </>
      </Popup>

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
