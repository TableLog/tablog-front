'use client';

import React, { useEffect, useState } from 'react';

import PageHeader from '@/components/atoms/page-header/PageHeader';
import ProfileImageInput from '@/components/molecules/profile-image-input/ProfileImageInput';
import { useGetUserInfo } from '@/hooks/auth.hooks';

import UserInfoEditForm from './@form/edit-form';

const EditPage = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: userData } = useGetUserInfo();

  useEffect(() => {
    if (userData && userData?.profileImgUrl) {
      setImageSrc(userData.profileImgUrl);
      setImageFile(userData.profileImgUrl);
    }
  }, [userData]);

  return (
    <div>
      <PageHeader title="계정 관리" back backUrl="/my" />

      <div className="mt-4 mb-8 flex items-center justify-center">
        <ProfileImageInput
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          setImageFile={setImageFile}
        />
      </div>

      <UserInfoEditForm imageFile={imageFile} userData={userData} />
    </div>
  );
};

export default EditPage;
