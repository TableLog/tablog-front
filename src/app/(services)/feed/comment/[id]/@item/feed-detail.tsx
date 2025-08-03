'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import ChatInput from '@/components/molecules/chat/ChatInput';
import DeleteFeedModal from '@/components/molecules/feed/DeleteFeedModal';
import { useGetUserInfo } from '@/hooks/auth.hooks';
import { useGetLog } from '@/hooks/feed.hooks';
import { useFeedDetailActions } from '@/hooks/useFeedDetailActions';
import { useLoginStore } from '@/lib/zutstand/userStore';

import FeedCommentList from './feed-comment-list';

const FeedItem = dynamic(() => import('../../../feed-item'), {
  ssr: false,
});

const FeedDetail = ({ id }: { id: number }) => {
  const { data: userData } = useGetUserInfo();
  const { data: logDetail } = useGetLog(Number(id));

  const { setLogId, isReply, setIsReply, contentRefs, handleDelete } = useFeedDetailActions();

  const isMyPost = userData && userData?.nickname === logDetail?.user;

  const { isLoggedIn } = useLoginStore();

  return (
    logDetail && (
      <>
        <DeleteFeedModal onDelete={handleDelete} />

        <div className="relative flex h-[calc(100svh-120px)] w-full flex-col">
          <div className="flex-1 overflow-y-auto pb-6">
            <FeedItem
              log={logDetail}
              isMyPost={isMyPost || false}
              setLogId={setLogId}
              contentRefs={contentRefs}
              isDetail
            />

            <FeedCommentList id={id} setIsReply={setIsReply} />
          </div>

          {isLoggedIn && <ChatInput logId={id} isReply={isReply} setIsReply={setIsReply} />}
        </div>
      </>
    )
  );
};

export default FeedDetail;
