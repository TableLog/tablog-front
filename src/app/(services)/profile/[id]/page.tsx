'use client';

import React, { use } from 'react';

import PageHeader from '@/components/atoms/page-header/PageHeader';

import PostLists from './post-lists';
import ProfileInfoSection from './profile-info-section';

const ProfilePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return (
    <div>
      <div className="py-4">
        <div className="px-5">
          <PageHeader title="프로필 상세" back />
        </div>

        <ProfileInfoSection id={Number(id)} />

        <PostLists />
      </div>
    </div>
  );
};

export default ProfilePage;
