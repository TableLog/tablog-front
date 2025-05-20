'use client';
import React from 'react';

import { useGetLog } from '@/hooks/feed.hooks';

const FeedList = () => {
  const { data: logList } = useGetLog(0);

  console.log(logList, 'v');
  return <div></div>;
};

export default FeedList;
