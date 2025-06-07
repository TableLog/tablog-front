'use client';

import React, { use } from 'react';

import PageHeader from '@/components/atoms/page-header/PageHeader';

import ProfileInfoSection from './profile-info-section';

const ProfilePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return (
    <div>
      <div className="px-5 py-4">
        <PageHeader title="프로필 상세" back />

        <ProfileInfoSection id={Number(id)} />
      </div>
    </div>
  );
};

export default ProfilePage;
