'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import { Text } from '@/components/atoms/text/Text';
import { useGetUserInfo, useLogout } from '@/hooks/auth.hooks';
import { cn } from '@/utils/cn';

const MyPage = () => {
  const router = useRouter();

  const { mutate: logout } = useLogout();
  const { data: userData } = useGetUserInfo();

  const userStaticsList = useMemo(() => {
    return [
      { id: 1, title: '레시피', value: userData?.recipeCount },
      { id: 2, title: '일기', value: userData?.boardCount },
      { id: 3, title: '팔로워', value: userData?.followerCount, href: '/my/followers' },
      { id: 4, title: '팔로잉', value: userData?.followingCount, href: '/my/followings' },
    ];
  }, [
    userData?.boardCount,
    userData?.followerCount,
    userData?.followingCount,
    userData?.recipeCount,
  ]);

  const MyMenuList = [
    { id: 1, title: '찜한 목록', href: '/my/bookmark' },
    { id: 2, title: '좋아요 목록', href: '/my/likes' },
    { id: 3, title: '남긴 리뷰', href: '/my/reviews' },
    { id: 4, title: '전문가 인증하기', href: '/my/certificate' },
    { id: 5, title: '환경 설정', href: '/my/settings' },
    { id: 6, title: '채팅 목록', href: '/my/chats' },
    { id: 7, title: '장보기 메모', href: '/my/shopping-list' },
    { id: 8, title: '관리자에게 문의하기', href: '/my/inquiry' },
    {
      id: 9,
      title: '로그아웃',
      href: '/login',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
      },
    },
  ];

  return (
    <div>
      {userData && (
        <div>
          <section className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ProfileImage
                src={userData?.profileImgUrl || '/images/tablog-512x512.png'}
                size={50}
              />

              <Text fontSize={14}>{userData.nickname}</Text>
            </div>

            <Link href="/my/edit">
              <Button size="mini" buttonColor="grey06">
                내 정보 수정
              </Button>
            </Link>
          </section>

          <section className="grid grid-cols-4">
            {userStaticsList.map((statics) => {
              const textClass = statics.href ? 'underline' : '';

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

          <section className="bg-grey08 mb-6 flex items-center justify-between rounded-[8px] px-3 py-2.5">
            <div>
              <Text fontSize={14}>포인트</Text>

              <Text fontSize={16} fontWeight="semiBold">
                {userData.pointBalance}
              </Text>
            </div>

            <Button size="small">
              <Text color="white01" fontSize={14}>
                상품권으로 전환하기
              </Text>
            </Button>
          </section>

          <section className="flex flex-col">
            {MyMenuList.map((menu) => {
              return (
                <Link
                  key={menu.id}
                  href={menu.href}
                  className="py-2"
                  onClick={(e) => {
                    if (menu.onClick) menu.onClick(e);
                  }}
                >
                  {menu.title}
                </Link>
              );
            })}
          </section>
        </div>
      )}
    </div>
  );
};

export default MyPage;
