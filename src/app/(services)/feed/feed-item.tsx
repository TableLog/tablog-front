'use client';

import React, { SetStateAction, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import MoreOptions from '@/components/atoms/more-options/MoreOptions';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import FeedSlider from '@/components/atoms/slider/FeedSlider';
import { Text } from '@/components/atoms/text/Text';
import { DELETE_FEED_MODAL } from '@/constants/modal.constants';
import { FEED_MY_OPTIONS, FEED_OPTIONS } from '@/constants/options.constants';
import { useAddLike, useRemoveLike } from '@/hooks/feed.hooks';
import { ToggleLikeSuccess } from '@/services/feed.services';
import { ILogResponse } from '@/types/api';
import { cn } from '@/utils/cn';
import { convertDateFormat, HandleOpenModal } from '@/utils/functions';

interface IFeedItemProps {
  log: ILogResponse;
  showMore: boolean;
  isMyPost: boolean;
  isExpanded: boolean;
  toggleExpand: (id: number) => void;
  setLogId: React.Dispatch<SetStateAction<number>>;
  contentRefs: React.RefObject<Record<number, HTMLDivElement | null>>;
}
const FeedItem = ({
  log,
  showMore,
  isMyPost,
  isExpanded,
  toggleExpand,
  contentRefs,
  setLogId,
}: IFeedItemProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

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

  const deleteMyFeed = useCallback(
    (type: string) => {
      if (type === '삭제하기') {
        HandleOpenModal(DELETE_FEED_MODAL);
        setLogId(Number(log.id));
      }

      if (type === '수정하기') {
        router.push(`/feed/edit-log/${log.id}`);
      }
    },
    [log.id, router, setLogId],
  );

  const clampClass = isExpanded ? '' : 'line-clamp-2';

  return (
    <div className="mb-6">
      <div className="flex justify-between">
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
          buttonEvent={deleteMyFeed}
        />
      </div>

      <FeedSlider imageList={log.image_urls} />

      <ul className="mb-2 flex items-center gap-4">
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

        <li>
          <Link href={`/feed/comment/${log.id}`} className="flex items-center gap-0.5">
            <BoxIcon name="chat" size={24} />

            <Text fontSize={14}>{log.comment_count || 0}</Text>
          </Link>
        </li>

        <li>
          <BoxIcon name="share" size={24} flip="horizontal" />
        </li>
      </ul>

      <div className="max-h-[360px] overflow-y-auto">
        <div
          ref={(el) => {
            contentRefs.current[log.id] = el;
          }}
          className={cn(clampClass, 'text-sm whitespace-pre-line text-black transition-all')}
        >
          {log.content}
        </div>

        {showMore && (
          <button
            onClick={() => toggleExpand(log.id)}
            className="text-grey02 mt-1 text-sm font-medium"
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedItem;
