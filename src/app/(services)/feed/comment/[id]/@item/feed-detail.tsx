'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import ChatInput from '@/components/molecules/chat/ChatInput';
import DeleteFeedModal from '@/components/molecules/feed/DeleteFeedModal';
import { useGetUserInfo } from '@/hooks/auth.hooks';
import { useGetLog } from '@/hooks/feed.hooks';
import { useFeedDetailActions } from '@/hooks/useFeedDetailActions';

import FeedCommentList from './feed-comment-list';

const FeedItem = dynamic(() => import('../../../feed-item'), {
  ssr: false,
});

const FeedDetail = ({ id }: { id: number }) => {
  const { data: userData } = useGetUserInfo();
  const { data: logDetail } = useGetLog(Number(id));

  console.log('logDetail', logDetail);

  const {
    setLogId,
    expandedItems,
    showMoreButton,
    setShowMoreButton,
    isReply,
    setIsReply,
    contentRefs,
    toggleExpand,
    handleDelete,
  } = useFeedDetailActions();

  const isMyPost = userData && userData?.nickname === logDetail?.user;

  useEffect(() => {
    setShowMoreButton(true);
  }, [setShowMoreButton]);

  return (
    logDetail && (
      <>
        <DeleteFeedModal onDelete={handleDelete} />

        <div className="relative flex h-[calc(100svh-160px)] w-full flex-col">
          <div className="flex-1 overflow-y-auto pb-6">
            <FeedItem
              log={logDetail}
              showMore={showMoreButton}
              isMyPost={isMyPost || false}
              setLogId={setLogId}
              isExpanded={expandedItems}
              toggleExpand={toggleExpand}
              contentRefs={contentRefs}
            />

            <FeedCommentList id={id} setIsReply={setIsReply} />
          </div>

          <ChatInput logId={id} isReply={isReply} setIsReply={setIsReply} />
        </div>
      </>
    )
  );
};

export default FeedDetail;
