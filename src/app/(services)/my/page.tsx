import React from 'react';
import Link from 'next/link';

import PointsSection from './points-section';
import ProfileSection from './profile-section';
import StaticsSection from './statics-section';

const MyPage = () => {
  const MyMenuList = [
    { id: 1, title: '찜한 목록', href: '/my/bookmark' },
    { id: 2, title: '좋아요 목록', href: '/my/likes' },
    { id: 3, title: '남긴 리뷰', href: '/my/reviews' },
    { id: 4, title: '전문가 인증하기', href: '/my/certificate' },
    { id: 5, title: '환경 설정', href: '/my/settings' },
    { id: 6, title: '채팅 목록', href: '/my/chats' },
    { id: 7, title: '장보기 메모', href: '/my/shopping-list' },
    { id: 8, title: '관리자에게 문의하기', href: '/my/inquiry' },
  ];

  return (
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
  );
};

export default MyPage;
