'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { Text } from '@/components/atoms/text/Text';
import { useGetUserInfo } from '@/hooks/auth.hooks';
import { cn } from '@/utils/cn';

const StaticsSection = () => {
  const router = useRouter();

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

  return (
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
  );
};

export default StaticsSection;
