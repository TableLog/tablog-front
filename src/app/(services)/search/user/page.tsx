'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import { Text } from '@/components/atoms/text/Text';
import { useFollowUser, useGetUserList, useUnfollowUser } from '@/hooks/users.hooks';
import { useLoginStore } from '@/lib/zutstand/userStore';
import { IUser } from '@/types/api';

const SearchUserPage = () => {
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const [id, setId] = useState(0);

  const { ref, inView } = useInView();
  const { isLoggedIn } = useLoginStore((state) => state);

  const {
    data: userList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetUserList(keyword, isLoggedIn);

  const { mutate: followUser } = useFollowUser(id);
  const { mutate: unfollowUser } = useUnfollowUser(id);

  const onClickFollowButton = useCallback(
    (isFollowed: boolean, userId: number) => {
      if (isFollowed) {
        unfollowUser(userId);
      } else {
        followUser(userId);
      }
    },
    [followUser, unfollowUser],
  );

  const onSearch = useCallback(() => {
    setKeyword(search);
  }, [search]);

  useEffect(() => {
    // 무한 스크롤
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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
            <div className="flex flex-col gap-2.5">
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
                          setId(user?.userId);
                          onClickFollowButton(user?.isFollowed, user?.userId);
                        }}
                      >
                        {user?.isFollowed ? '팔로우 취소' : '팔로우'}
                      </Button>
                    )}
                  </section>
                ));
              })}

              {isFetching && (
                <div className="flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              )}

              <div ref={ref as React.RefCallback<HTMLDivElement>} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUserPage;
