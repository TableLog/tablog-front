'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import { Text } from '@/components/atoms/text/Text';
import { CHAT_ROOM_URL } from '@/constants/endpoint.constants';
import { useGetUserInfo } from '@/hooks/queries/auth.hooks';
import {
  useFollowUser,
  useGetFollowerCount,
  useGetFollowingCount,
  useGetProfileInfo,
  useUnfollowUser,
} from '@/hooks/queries/users.hooks';
import { useLoginStore } from '@/lib/zustand/userStore';
import { cn } from '@/utils/cn';

interface IProfileInfoSectionProps {
  id: number;
}
const ProfileInfoSection = ({ id }: IProfileInfoSectionProps) => {
  const router = useRouter();

  const { data: profileInfo } = useGetProfileInfo(id);

  const { isLoggedIn } = useLoginStore();
  const { data: userInfo } = useGetUserInfo();

  const { data: followingCount } = useGetFollowingCount(id);
  const { data: followerCount } = useGetFollowerCount(id);

  const { mutate: followUser } = useFollowUser();
  const { mutate: unfollowUser } = useUnfollowUser();

  const userStaticsList = useMemo(() => {
    return [
      { id: 1, title: '레시피', value: profileInfo?.recipeCount },
      { id: 2, title: '일기', value: profileInfo?.boardCount },
      { id: 3, title: '팔로워', value: followerCount?.data, href: `/profile/${id}/followers` },
      { id: 4, title: '팔로잉', value: followingCount?.data, href: `/profile/${id}/followings` },
    ];
  }, [
    profileInfo?.recipeCount,
    profileInfo?.boardCount,
    followerCount?.data,
    id,
    followingCount?.data,
  ]);

  const onClickFollowButton = useCallback(() => {
    if (!userInfo?.id) return;

    if (profileInfo?.isFollowed) unfollowUser({ userId: id, unfollowedBy: userInfo.id });
    else followUser({ userId: id, followedBy: userInfo.id });
  }, [userInfo?.id, followUser, id, profileInfo?.isFollowed, unfollowUser]);

  return (
    <div className="px-5">
      <section className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ProfileImage src={profileInfo?.profileImgUrl} size={50} />

          <Text fontSize={14}>{profileInfo?.nickname}</Text>
        </div>

        <div className="flex items-center gap-2">
          {/* 채팅 아이콘 */}
          {userInfo?.id !== id && (
            <div
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-primary01 px-1"
              onClick={() => {
                if (!userInfo) return;
                router.push(CHAT_ROOM_URL({ senderId: userInfo.id, receiverId: id }));
              }}
            >
              <BoxIcon name="message-rounded" size={16} color="primary01" />
            </div>
          )}

          {isLoggedIn && (
            <Button
              size="small"
              buttonColor={profileInfo?.isFollowed ? 'grey06' : 'primary'}
              onClick={onClickFollowButton}
            >
              {profileInfo?.isFollowed ? '팔로우 취소' : '팔로우'}
            </Button>
          )}
        </div>
      </section>

      <section className="grid grid-cols-4">
        {userStaticsList.map((statics) => {
          const textClass = statics.href ? 'underline cursor-pointer' : '';

          return (
            <div
              key={statics.id}
              className="mb-5 flex flex-col items-center justify-center gap-3 p-2.5"
              onClick={() => {
                if (statics.href) router.push(statics.href);
              }}
            >
              <Text fontSize={14}>{statics.title}</Text>

              <div className={cn(textClass)}>{statics.value}</div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ProfileInfoSection;
