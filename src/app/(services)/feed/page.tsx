'use client';

import React from 'react';
import Link from 'next/link';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';

import FeedList from './feed-list';

const FeedPage = () => {
  return (
    <div className="pb-16">
      <div className="mb-4 flex justify-between">
        <Link href="/search/user" className="flex items-center gap-1 text-sm">
          <span>유저 검색</span>

          <BoxIcon name="search" size={14} />
        </Link>

        <Link href="/feed/add-log">
          <Button size="mini">일기 작성</Button>
        </Link>
      </div>

      <FeedList />
    </div>
  );
};

export default FeedPage;
