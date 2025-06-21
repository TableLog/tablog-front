import React from 'react';
import Image from 'next/image';

import Button from '@/components/atoms/button/Button';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { Text } from '@/components/atoms/text/Text';
import { useGetCommentList } from '@/hooks/feed.hooks';
import { ICommentResponse } from '@/types/api';
import { convertDateFormat } from '@/utils/functions';

const FeedCommentList = ({
  id,
  setIsReply,
}: {
  id: number;
  setIsReply: (isReply: boolean) => void;
}) => {
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
                <Image
                  src={comment.profileImgUrl}
                  alt="profile"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </div>

              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <Text fontSize={14}>{comment.user}</Text>

                  <Text fontSize={12} color="grey04">
                    {convertDateFormat(comment.createdAt)}
                  </Text>
                </div>

                <Text fontSize={14}>{comment.content}</Text>

                <div className="flex items-center justify-between">
                  <Text fontSize={12} color="grey04">
                    답글 3개
                  </Text>

                  <Text fontSize={12} color="grey04" onClick={() => setIsReply(true)}>
                    답글 달기
                  </Text>
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

export default FeedCommentList;
