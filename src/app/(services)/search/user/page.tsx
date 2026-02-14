'use client';
import { useCallback, useState } from 'react';
import Link from 'next/link';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import { Text } from '@/components/atoms/text/Text';
import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { useGetUserInfo } from '@/hooks/queries/auth.hooks';
import { useFollowUser, useSearchUserList, useUnfollowUser } from '@/hooks/queries/users.hooks';
import { useLoginStore } from '@/lib/zustand/userStore';
import { IUser } from '@/types/api';

const SearchUserPage = () => {
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const { isLoggedIn } = useLoginStore((state) => state);

  const { data: userData } = useGetUserInfo();
  const {
    data: userList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useSearchUserList(keyword, isLoggedIn);

  const { mutate: followUser } = useFollowUser();
  const { mutate: unfollowUser } = useUnfollowUser();

  const onClickFollowButton = useCallback(
    (isFollowed: boolean, userId: number) => {
      if (!userData?.id) return;

      if (isFollowed) unfollowUser({ userId, unfollowedBy: userData.id });
      else followUser({ userId, followedBy: userData.id });
    },
    [followUser, unfollowUser, userData?.id],
  );

  const onSearch = useCallback(() => {
    setKeyword(search);
  }, [search]);

  return (
    <div>
      <PageHeader title="유저 검색" back />

      <div>
        <div className="mb-8 mt-2 flex items-center justify-between gap-2 rounded-full border border-grey07 px-4 py-2">
          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 placeholder-grey02 placeholder:text-sm"
          />

          <BoxIcon name="search" size={20} color="grey02" onClick={onSearch} />
        </div>

        <div>
          {isLoading ? (
            <LoadingSpinner />
          ) : userList?.pages?.[0]?.data.users.length === 0 ? (
            <div>일치하는 유저가 없습니다.</div>
          ) : (
            <InfiniteScroll
              className="flex flex-col gap-2.5"
              hasNextPage={hasNextPage}
              isFetching={isFetching}
              fetchNextPage={fetchNextPage}
            >
              {userList?.pages?.map((page) => {
                return page.data.users.map((user: IUser) => (
                  <section key={user.userId} className="mb-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Link href={`/profile/${user.userId}`} className="cursor-pointer">
                        <ProfileImage src={user?.profileImgUrl} size={50} />
                      </Link>

                      <Text fontSize={14}>{user?.nickname}</Text>
                    </div>

                    {isLoggedIn && (
                      <Button
                        size="small"
                        buttonColor={user?.isFollowed ? 'grey06' : 'primary'}
                        onClick={() => {
                          onClickFollowButton(user?.isFollowed, user?.userId);
                        }}
                      >
                        {user?.isFollowed ? '팔로우 취소' : '팔로우'}
                      </Button>
                    )}
                  </section>
                ));
              })}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUserPage;
