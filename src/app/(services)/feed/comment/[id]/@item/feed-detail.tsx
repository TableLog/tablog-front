'use client';

import dynamic from 'next/dynamic';

import ChatInput from '@/components/molecules/chat/ChatInput';
import { useGetUserInfo } from '@/hooks/queries/auth.hooks';
import { useGetLog } from '@/hooks/queries/feed.hooks';
import { useFeedDetailActions } from '@/hooks/useFeedDetailActions';

import FeedCommentList from './feed-comment-list';

const FeedItem = dynamic(() => import('../../../feed-item'), {
  ssr: false,
});

const FeedDetail = ({ id }: { id: number }) => {
  const { data: userData } = useGetUserInfo();
  const { data: logDetail } = useGetLog(id);

  const { contentRefs, commentId } = useFeedDetailActions();

  const isMyPost = userData && userData?.nickname === logDetail?.user;

  return (
    logDetail && (
      <>
        <div className="relative flex h-[calc(100dvh-60px-56px-16px)] w-full flex-col">
          <div className="flex-1 overflow-y-auto pb-6">
            <FeedItem
              log={logDetail}
              isMyPost={isMyPost || false}
              contentRefs={contentRefs}
              isDetail
            />

            <div className="mb-6 mt-10 h-px w-full bg-grey07" />

            <FeedCommentList logId={id} commentCount={logDetail.comment_count} />
          </div>

          <ChatInput className="pt-3" logId={id} commentId={commentId} />
        </div>
      </>
    )
  );
};

export default FeedDetail;
