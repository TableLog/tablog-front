'use client';

import React from 'react';
import Link from 'next/link';

import Button from '@/components/atoms/button/Button';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import { Text } from '@/components/atoms/text/Text';
import { useGetUserInfo } from '@/hooks/auth.hooks';

const ProfileSection = () => {
  const { data: userData } = useGetUserInfo();

  return (
    <section className="mb-2.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <ProfileImage src={userData?.profileImgUrl} size={50} />

        <Text fontSize={14}>{userData?.nickname}</Text>
      </div>

      <Link href="/my/edit">
        <Button size="mini" buttonColor="grey06">
          계정 관리
        </Button>
      </Link>
    </section>
  );
};

export default ProfileSection;
