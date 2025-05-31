import React from 'react';
import Link from 'next/link';

import Button from '@/components/atoms/button/Button';

import FeedList from './feed-list';

const FeedPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 대기

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Link href="/feed/add-log">
          <Button size="mini">일기 작성</Button>
        </Link>
      </div>

      <FeedList />
    </div>
  );
};

export default FeedPage;
