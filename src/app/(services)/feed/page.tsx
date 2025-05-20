import React from 'react';
import Link from 'next/link';

import Button from '@/components/atoms/button/Button';

import FeedList from './FeedList';

const FeedPage = () => {
  return (
    <div>
      <div className="flex justify-end">
        <Link href="/feed/add-log">
          <Button size="mini">일기 작성</Button>
        </Link>
      </div>

      <FeedList />
    </div>
  );
};

export default FeedPage;
