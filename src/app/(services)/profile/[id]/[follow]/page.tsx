'use client';

import React, { use, useCallback } from 'react';
import Link from 'next/link';

import Button from '@/components/atoms/button/Button';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import { Text } from '@/components/atoms/text/Text';
import {
  useFollowUser,
  useGetFollowerList,
  useGetFollowingList,
  useUnfollowUser,
} from '@/hooks/users.hooks';
import { useLoginStore } from '@/lib/zutstand/userStore';
import { IFollowerListResponse } from '@/types/api';

const FollowPage = ({ params }: { params: Promise<{ id: string; follow: string }> }) => {
  const { id, follow } = use(params);

  const isFollower = follow === 'followers';

  const { isLoggedIn } = useLoginStore();

  const { data: followerList } = useGetFollowerList(Number(id), isFollower);
  const { data: followingList } = useGetFollowingList(Number(id), isFollower);

  const { mutate: followUser } = useFollowUser(Number(id));
  const { mutate: unfollowUser } = useUnfollowUser(Number(id));

  const onClickFollowButton = useCallback(
    (isFollowed: boolean) => {
      if (isFollowed) {
        unfollowUser(Number(id));
      } else {
        followUser(Number(id));
      }
    },
    [followUser, id, unfollowUser],
  );

  return (
    <div className="px-5 py-4">
      <PageHeader title={`${isFollower ? '팔로워' : '팔로잉'}`} back />

      <div>
        {(isFollower ? followerList : followingList)?.pages?.map((page) =>
          page.data.users.map((users: IFollowerListResponse) => {
            return (
              <section key={users.userId} className="mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Link href={`/profile/${users.userId}`} className="cursor-pointer">
                    <ProfileImage src={users?.profileImgUrl} size={50} />
                  </Link>

                  <Text fontSize={14}>{users?.nickname}</Text>
                </div>

                {isLoggedIn && (
                  <Button
                    size="small"
                    buttonColor={users?.isFollowed ? 'grey06' : 'primary'}
                    onClick={() => onClickFollowButton(users?.isFollowed)}
                  >
                    {users?.isFollowed ? '팔로우 취소' : '팔로우'}
                  </Button>
                )}
              </section>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default FollowPage;
