'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useGetUserInfo } from '@/hooks/auth.hooks';
import { useGetLog } from '@/hooks/feed.hooks';

import { FeedItem } from '../../../feed-list';

const FeedDetail = ({ id }: { id: number }) => {
  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const [expandedItems, setExpandedItems] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const { data: userData } = useGetUserInfo();
  const { data: logDetail } = useGetLog(Number(id));

  const toggleExpand = () => {
    setExpandedItems((prev) => !prev);
  };

  const isMyPost = userData && userData?.nickname === logDetail?.user;

  useEffect(() => {
    setShowMoreButton(true);
  }, []);

  return (
    logDetail && (
      <FeedItem
        log={logDetail}
        showMore={showMoreButton}
        isMyPost={isMyPost}
        isExpanded={expandedItems}
        toggleExpand={toggleExpand}
        contentRefs={contentRefs}
      />
    )
  );
};

export default FeedDetail;
