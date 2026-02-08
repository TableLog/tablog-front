'use client';

import { use, useCallback } from 'react';
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
} from '@/hooks/queries/users.hooks';
import { useLoginStore } from '@/lib/zustand/userStore';

const FollowPage = ({ params }: { params: Promise<{ id: string; follow: string }> }) => {
  const { id, follow } = use(params);

  const isFollower = follow === 'followers';

  const { isLoggedIn } = useLoginStore();

  const { data: followerList } = useGetFollowerList(Number(id), isFollower);
  const { data: followingList } = useGetFollowingList(Number(id), isFollower);
  console.log(followerList, followingList);

  const { mutate: followUser } = useFollowUser(Number(id));
  const { mutate: unfollowUser } = useUnfollowUser(Number(id));

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

  const name = isFollower ? '팔로워' : '팔로잉';
  return (
    <div className="px-5 pb-4">
      <PageHeader title={`${name}`} back />

      <div>
        {followerList?.length === 0 || followingList?.length === 0 ? (
          <div className="mt-4 text-center">
            <Text fontSize={14} color="grey02">
              {name} 유저가 없습니다.
            </Text>
          </div>
        ) : (
          (isFollower ? followerList : followingList)?.map((users) => (
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
                  onClick={() => onClickFollowButton(users?.isFollowed, users?.userId)}
                >
                  {users?.isFollowed ? '팔로우 취소' : '팔로우'}
                </Button>
              )}
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default FollowPage;
