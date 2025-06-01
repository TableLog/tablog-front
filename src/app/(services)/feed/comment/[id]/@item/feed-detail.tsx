'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import ChatInput from '@/components/molecules/chat/ChatInput';
import Popup from '@/components/molecules/popup/Popup';
import { DELETE_FEED_MODAL } from '@/constants/modal.constants';
import { FEED_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useGetUserInfo } from '@/hooks/auth.hooks';
import { useDeleteLog, useGetLog } from '@/hooks/feed.hooks';
import { showToast } from '@/utils/functions';

import { FeedItem } from '../../../feed-list';

const FeedDetail = ({ id }: { id: number }) => {
  const [logId, setLogId] = useState(-1);

  const queryClient = useQueryClient();
  const route = useRouter();

  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const [expandedItems, setExpandedItems] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const { data: userData } = useGetUserInfo();
  const { data: logDetail } = useGetLog(Number(id));

  const { mutate: deleteLog } = useDeleteLog({
    onSuccess: (res) => {
      if (res.status === 200) {
        const modal = document.getElementById(DELETE_FEED_MODAL) as HTMLDialogElement;
        modal.close();
        showToast({ message: '일기를 삭제했습니다.', type: 'success' });
        queryClient.invalidateQueries({ queryKey: [FEED_LIST_QUERY_KEY] });
        route.push('/feed');
      }
    },
  });

  const toggleExpand = () => {
    setExpandedItems((prev) => !prev);
  };

  const isMyPost = userData && userData?.nickname === logDetail?.user;

  useEffect(() => {
    setShowMoreButton(true);
  }, []);

  return (
    logDetail && (
      <>
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

        <div className="relative flex h-[calc(100svh-160px)] w-full flex-col">
          <div className="flex-1">
            <FeedItem
              log={logDetail}
              showMore={showMoreButton}
              isMyPost={isMyPost}
              setLogId={setLogId}
              isExpanded={expandedItems}
              toggleExpand={toggleExpand}
              contentRefs={contentRefs}
            />
          </div>

          <ChatInput />
        </div>
      </>
    )
  );
};

export default FeedDetail;
