import { useState } from 'react';

import Button from '@/components/atoms/button/Button';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import { Text } from '@/components/atoms/text/Text';
import { useGetCommentList, useGetCommentReplyList } from '@/hooks/queries/feed.hooks';
import { ICommentResponse } from '@/types/api';
import { convertDateFormat } from '@/utils/functions';

const FeedCommentList = ({
  id,
  setIsReply,
  setCommentId,
}: {
  id: number;
  setIsReply: (isReply: boolean) => void;
  setCommentId: (commentId: number) => void;
}) => {
  const [openedReplyCommentId, setOpenedReplyCommentId] = useState<number | null>(null);

  const {
    data: commentList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetCommentList(Number(id));

  return (
    <div>
      <div className="flex flex-col gap-4">
        {commentList?.pages.map((page) =>
          page.data.boardComments.map((comment: ICommentResponse) => (
            <div key={comment.createdAt} className="flex items-start justify-between gap-1.5">
              <div>
                <ProfileImage src={comment?.profileImgUrl || ''} size={36} />
              </div>

              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <Text fontSize={14}>{comment.user}</Text>

                  <Text fontSize={12} color="grey04">
                    {convertDateFormat(comment.createdAt)}
                  </Text>
                </div>

                <Text fontSize={14} className="max-w-full text-wrap break-all">
                  {comment.content}
                </Text>

                <div>
                  <div className="flex items-center justify-between">
                    <Text
                      fontSize={12}
                      color="grey04"
                      onClick={() => {
                        if (openedReplyCommentId === comment.id) {
                          setOpenedReplyCommentId(null);
                        } else {
                          setOpenedReplyCommentId(comment.id);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      답글 {comment?.comment_count}개
                    </Text>

                    <Text
                      fontSize={12}
                      color="grey04"
                      onClick={() => {
                        setIsReply(true);
                        setCommentId(comment.id);
                      }}
                      className="cursor-pointer"
                    >
                      답글 달기
                    </Text>
                  </div>

                  {openedReplyCommentId === comment.id && (
                    <ReplyList boardId={id} commentId={comment.id} />
                  )}
                </div>
              </div>
            </div>
          )),
        )}

        {isFetchingNextPage && <LoadingSpinner />}
      </div>

      {hasNextPage && (
        <div className="flex items-center justify-center py-6">
          <Button size="mini" buttonColor="grey04" onClick={() => fetchNextPage()}>
            댓글 더 보기
          </Button>
        </div>
      )}
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
    <section className="my-3 flex flex-col gap-3 border-l border-grey08 pl-4">
      {replyList.pages.map((page) =>
        page.data.boardComments?.map((reply: ICommentResponse) => (
          <div key={reply.createdAt} className="flex items-start justify-between gap-1.5">
            <div>
              <ProfileImage src={reply?.profileImgUrl || ''} size={32} />
            </div>

            <div className="flex flex-1 flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Text fontSize={14}>{reply.user}</Text>

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
