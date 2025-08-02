'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Button from '@/components/atoms/button/Button';
import LoadingScreen from '@/components/atoms/loading/LoadingScreen';
import { useLoginStore } from '@/lib/zutstand/userStore';

import PointsSection from './points-section';
import ProfileSection from './profile-section';
import StaticsSection from './statics-section';

const MyPage = () => {
  const { isLoggedIn } = useLoginStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const MyMenuList = [
    { id: 1, title: '찜한 목록', href: '/my/bookmark' },
    { id: 2, title: '좋아요 목록', href: '/my/likes' },
    { id: 3, title: '남긴 리뷰', href: '/my/reviews' },
    { id: 3, title: '포인트 이용내역', href: '/my/point-history' },
    { id: 4, title: '전문가 인증하기', href: '/my/certificate' },
    { id: 5, title: '환경 설정', href: '/my/settings' },
    { id: 6, title: '채팅 목록', href: '/my/chats' },
    { id: 7, title: '장보기 메모', href: '/my/shopping-list' },
    { id: 8, title: '관리자에게 문의하기', href: '/my/inquiry' },
  ];

  return isLoading ? (
    <div>
      <LoadingScreen />
    </div>
  ) : isLoggedIn ? (
    <div>
      <ProfileSection />

      <StaticsSection />

      <PointsSection />

      <section className="flex flex-col">
        {MyMenuList.map((menu) => {
          return (
            <Link key={menu.id} href={menu.href} className="py-2">
              {menu.title}
            </Link>
          );
        })}
      </section>
    </div>
  ) : (
    <div className="mt-[30%] flex flex-col items-center justify-center gap-6">
      <div>🙇 로그인 후 이용해주세요.</div>

      <div className="flex gap-3">
        <Button buttonColor="grey04">
          <Link href="/my/inquiry">관리자에게 문의하기</Link>
        </Button>

        <Button buttonColor="primary">
          <Link href="/login">로그인</Link>
        </Button>
      </div>
    </div>
  );
};

export default MyPage;
