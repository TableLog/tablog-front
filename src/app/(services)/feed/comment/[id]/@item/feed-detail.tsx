'use client';

import dynamic from 'next/dynamic';

import LoginClickGuard from '@/components/atoms/button/LoginRequiredLink';
import ChatInput from '@/components/molecules/chat/ChatInput';
import DeleteFeedModal from '@/components/molecules/feed/DeleteFeedModal';
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

  const { setLogId, isReply, setIsReply, contentRefs, handleDelete, commentId, setCommentId } =
    useFeedDetailActions();

  const isMyPost = userData && userData?.nickname === logDetail?.user;

  return (
    logDetail && (
      <>
        <DeleteFeedModal onDelete={handleDelete} />

        <div className="relative flex h-[calc(100dvh-60px-56px-16px)] w-full flex-col">
          <div className="flex-1 overflow-y-auto pb-6">
            <FeedItem
              log={logDetail}
              isMyPost={isMyPost || false}
              setLogId={setLogId}
              contentRefs={contentRefs}
              isDetail
            />

            <FeedCommentList id={id} setIsReply={setIsReply} setCommentId={setCommentId} />
          </div>

          <LoginClickGuard>
            <ChatInput
              className="pt-3"
              logId={id}
              isReply={isReply}
              setIsReply={setIsReply}
              commentId={commentId}
            />
          </LoginClickGuard>
        </div>
      </>
    )
  );
};

export default FeedDetail;
