'use client';

import React, { SetStateAction, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import MoreOptions from '@/components/atoms/more-options/MoreOptions';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import ClampedTexts from '@/components/atoms/text/ClampedTexts';
import { Text } from '@/components/atoms/text/Text';
import Carousel from '@/components/organisms/carousel/Carousel';
import { DELETE_FEED_MODAL } from '@/constants/modal.constants';
import { FEED_MY_OPTIONS, FEED_OPTIONS } from '@/constants/options.constants';
import { useGetUserInfo } from '@/hooks/queries/auth.hooks';
import { useAddLike, useRemoveLike } from '@/hooks/queries/feed.hooks';
import { ToggleLikeSuccess } from '@/services/feed.services';
import { ILogResponse } from '@/types/api';
import { cn } from '@/utils/cn';
import { convertDateFormat, handleOpenModal } from '@/utils/functions';

interface IFeedItemProps {
  log: ILogResponse;
  isMyPost: boolean;
  setLogId: React.Dispatch<SetStateAction<number>>;
  contentRefs: React.RefObject<Record<number, HTMLDivElement | null>>;
  isDetail?: boolean;
}

const FeedItem = ({ log, isMyPost, contentRefs, setLogId, isDetail }: IFeedItemProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: userInfo } = useGetUserInfo();

  const { mutate: addLike } = useAddLike({
    onSuccess: (res) => {
      if (res.status === 200) {
        try {
          ToggleLikeSuccess(log, queryClient);
        } catch (error) {
          console.error('ToggleLikeSuccess error:', error);
        }
      }
    },
  });

  const { mutate: removeLike } = useRemoveLike({
    onSuccess: (res) => {
      if (res.status === 200) {
        try {
          ToggleLikeSuccess(log, queryClient);
        } catch (error) {
          console.error('ToggleLikeSuccess error:', error);
        }
      }
    },
  });

  const handleOptionClick = useCallback(
    (type: string) => {
      switch (type) {
        case '삭제하기':
          handleOpenModal(DELETE_FEED_MODAL);
          setLogId(Number(log.id));
          break;
        case '수정하기':
          router.push(`/feed/edit-log/${log.id}`);
          break;
        case '채팅하기':
          router.push(`/chat/${log.user_id}--${userInfo?.id}`);
          break;
      }
    },
    [log.id, log.user_id, router, setLogId, userInfo?.id],
  );

  return (
    <div className="mb-6">
      <div className="mb-1 flex justify-between">
        <div className="mb-1.5 flex gap-1.5" onClick={() => router.push(`/profile/${log.user_id}`)}>
          <ProfileImage src={log?.profileImgUrl} size={42} />

          <div className="flex flex-col justify-center">
            <Text fontSize={14}>{log.user}</Text>

            <Text fontSize={14} color="grey04">
              {convertDateFormat(log.createdAt)}
            </Text>
          </div>
        </div>

        <MoreOptions
          options={isMyPost ? FEED_MY_OPTIONS : FEED_OPTIONS}
          buttonEvent={handleOptionClick}
        />
      </div>

      {log.image_urls && (
        <Carousel
          imageList={log.image_urls.map((image, idx) => ({
            src: image,
            alt: `${log.title}-이미지-${idx}`,
          }))}
          half
        />
      )}

      <ul className="mb-2 mt-1 flex items-center gap-4">
        <li className="flex items-center gap-0.5">
          {log.isLike ? (
            <BoxIcon
              name="heart"
              type="solid"
              color="primary01"
              size={24}
              onClick={() => {
                removeLike(log.id);
              }}
            />
          ) : (
            <BoxIcon
              name="heart"
              size={24}
              onClick={() => {
                addLike(log.id);
              }}
            />
          )}

          <Text fontSize={14} className="min-w-[10px]">
            {log.like_count || 0}
          </Text>
        </li>

        {!isDetail && (
          <li>
            <Link href={`/feed/comment/${log.id}`} className="flex items-center gap-0.5">
              <BoxIcon name="chat" size={24} />

              <Text fontSize={14}>{log.comment_count || 0}</Text>
            </Link>
          </li>
        )}

        <li className="h-[25px]">
          <BoxIcon name="share" size={24} flip="horizontal" />
        </li>
      </ul>

      <div className="max-h-[360px] overflow-y-auto">
        <div
          ref={(el) => {
            contentRefs.current[log.id] = el;
          }}
          className={cn('whitespace-pre-line text-sm text-black transition-all')}
        >
          <ClampedTexts>{log.content}</ClampedTexts>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
