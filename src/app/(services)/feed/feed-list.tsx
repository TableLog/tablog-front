'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import MoreOptions from '@/components/atoms/more-options/MoreOptions';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import FeedSlider from '@/components/atoms/slider/FeedSlider';
import { Text } from '@/components/atoms/text/Text';
import { FEED_MY_OPTIONS, FEED_OPTIONS } from '@/constants/options.constants';
import { useGetUserInfo } from '@/hooks/auth.hooks';
import { useGetLogList } from '@/hooks/feed.hooks';
import { ILogResponse } from '@/types/api';
import { cn } from '@/utils/cn';

interface IFeedItemProps {
  log: ILogResponse;
  showMore: boolean;
  isMyPost: boolean;
  isExpanded: boolean;
  toggleExpand: (id: number) => void;
  contentRefs: React.RefObject<Record<number, HTMLDivElement | null>>;
}
export const FeedItem = ({
  log,
  showMore,
  isMyPost,
  isExpanded,
  toggleExpand,
  contentRefs,
}: IFeedItemProps) => {
  const clampClass = isExpanded ? '' : 'line-clamp-2';

  return (
    <div key={log.id} className="mb-6">
      <div className="flex justify-between">
        <div className="mb-1.5 flex gap-1.5">
          <ProfileImage src={log?.profileImgUrl} size={42} />

          <div className="flex flex-col gap-1.5">
            <Text fontSize={14}>{log.user}</Text>

            <div>{log.created_at}</div>
          </div>
        </div>

        <MoreOptions options={isMyPost ? FEED_MY_OPTIONS : FEED_OPTIONS} />
      </div>

      <FeedSlider imageList={log.image_urls} />

      <ul className="mb-2 flex items-center gap-4">
        <li className="flex items-center gap-0.5">
          <BoxIcon name="heart" size={24} />

          <Text fontSize={14}>{log.like_count || 0}</Text>
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

      <div>
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

const FeedList = () => {
  const { data: logList } = useGetLogList();
  const { data: userData } = useGetUserInfo();

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [showMoreButton, setShowMoreButton] = useState<Record<number, boolean>>({});

  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const newState: Record<number, boolean> = {};

    for (const key in contentRefs.current) {
      const el = contentRefs.current[key];
      if (el) {
        newState[+key] = el.scrollHeight > 40;
      }
    }
    setShowMoreButton(newState);
  }, [logList]);

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      {logList?.pages?.map((page) =>
        page.data.boards.map((log: ILogResponse) => {
          const isExpanded = expandedItems[log.id];
          const showMore = showMoreButton[log.id];

          const isMyPost = userData && userData.nickname === log.user;

          return (
            <FeedItem
              key={log.id}
              log={log}
              showMore={showMore}
              isMyPost={isMyPost}
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
              contentRefs={contentRefs}
            />
          );
        }),
      )}
    </div>
  );
};

export default FeedList;
