import Link from 'next/link';

import LoginRequiredLink from '@/components/atoms/button/LoginRequiredLink';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';

import FeedList from './feed-list';

const FeedPage = () => {
  return (
    <div className="pb-16 pt-4">
      <div className="mb-4 flex justify-between gap-3">
        <Link
          href="/search/user"
          className="flex h-[40px] flex-grow items-center gap-2 rounded-full border border-grey07 px-4 text-sm"
        >
          <BoxIcon name="search" size={14} />

          <span>유저 검색</span>
        </Link>

        <LoginRequiredLink size="medium" href="/feed/add-log">
          일기 작성
        </LoginRequiredLink>
      </div>

      <FeedList />
    </div>
  );
};

export default FeedPage;
