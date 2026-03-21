import { useState } from 'react';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import { Text } from '@/components/atoms/text/Text';
import ChatInput from '@/components/molecules/chat/ChatInput';
import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { useGetCommentList, useGetCommentReplyList } from '@/hooks/queries/feed.hooks';
import { ICommentResponse } from '@/types/api';
import { convertDateFormat } from '@/utils/functions';

interface IFeedCommentListProps {
  logId: number;
  commentCount: number;
}

const FeedCommentList = ({ logId, commentCount }: IFeedCommentListProps) => {
  const [openedReplyCommentId, setOpenedReplyCommentId] = useState<number | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  const {
    data: commentList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetCommentList(logId);

  return (
    <div>
      <div className="mb-5">
        <Text fontSize={16} fontWeight="medium" className="mb-4">
          댓글 {commentCount}개
        </Text>
      </div>
      <InfiniteScroll
        className="flex flex-col gap-4"
        hasNextPage={hasNextPage}
        isFetching={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      >
        {commentList?.pages.map((page) =>
          page.data.boardComments.map((comment: ICommentResponse) => (
            <div key={comment.createdAt} className="flex items-start justify-between gap-2">
              <div>
                <ProfileImage src={comment?.profileImgUrl || ''} size={32} />
              </div>

              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <Text fontSize={12} fontWeight="medium">
                      {comment.user}
                    </Text>
                    <Text fontSize={12} color="grey04">
                      {convertDateFormat(comment.createdAt)}
                    </Text>
                  </div>
                  <Text fontSize={14} className="max-w-full text-wrap break-all">
                    {comment.content}
                  </Text>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        if (comment?.comment_count > 0) {
                          setOpenedReplyCommentId(
                            openedReplyCommentId === comment.id ? null : comment.id,
                          );
                        }
                      }}
                    >
                      <Text fontSize={12} color="grey04" fontWeight="medium">
                        답글 {comment?.comment_count}개
                      </Text>
                    </button>

                    <BoxIcon name="circle" type="solid" size={3} color="grey04" />

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCommentId(selectedCommentId === comment.id ? null : comment.id);
                      }}
                    >
                      <Text fontSize={12} color="grey04" fontWeight="medium">
                        답글 달기
                      </Text>
                    </button>
                  </div>

                  {selectedCommentId === comment.id && (
                    <ChatInput
                      className="pt-3"
                      logId={logId}
                      onCancelReply={() => {
                        setSelectedCommentId(null);
                      }}
                      onAddReplySuccess={() => {
                        setOpenedReplyCommentId(comment.id);
                      }}
                      commentId={comment.id}
                      isReply
                    />
                  )}

                  {openedReplyCommentId === comment.id && (
                    <ReplyList boardId={logId} commentId={comment.id} />
                  )}
                </div>
              </div>
            </div>
          )),
        )}
      </InfiniteScroll>
    </div>
  );
};

const ReplyList = ({ boardId, commentId }: { boardId: number; commentId: number }) => {
  const {
    data: replyList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetCommentReplyList(boardId, commentId, true);

  if (!replyList) {
    return <LoadingSpinner />;
  }

  return (
    <section className="mt-3 flex flex-col gap-2">
      {replyList.pages.map((page) =>
        page.data.boardComments?.map((reply: ICommentResponse) => (
          <div key={reply.createdAt} className="flex items-start justify-between gap-2">
            <div>
              <ProfileImage src={reply.profileImgUrl} size={32} />
            </div>

            <div className="flex flex-1 flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Text fontSize={12} fontWeight="medium">
                  {reply.user}
                </Text>

                <Text fontSize={12} color="grey04">
                  {convertDateFormat(reply.createdAt)}
                </Text>
              </div>

              <Text fontSize={14} className="max-w-full text-wrap break-all">
                {reply.content}
              </Text>
            </div>
          </div>
        )),
      )}

      {isFetchingNextPage && <LoadingSpinner />}

      {hasNextPage && (
        <div className="flex items-center justify-center py-2">
          <Button size="mini" buttonColor="grey04" onClick={() => fetchNextPage()}>
            답글 더 보기
          </Button>
        </div>
      )}
    </section>
  );
};

export default FeedCommentList;
