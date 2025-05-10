'use client';

import React, { useEffect, useState } from 'react';

import PageHeader from '@/components/atoms/page-header/PageHeader';
import ProfileImageInput from '@/components/molecules/profile-image-input/ProfileImageInput';
import { useGetUserInfo } from '@/hooks/auth.hooks';

import UserInfoEditForm from './@form/page';

const EditPage = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: userData } = useGetUserInfo();

  console.log(userData, 'userData');

  useEffect(() => {
    if (userData) {
      setImageSrc(userData.profileImgUrl);
    }
  }, [userData]);

  return (
    <div>
      <PageHeader title="내 정보 수정" back />

      <div className="mt-4 mb-8 flex items-center justify-center">
        <ProfileImageInput
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          setImageFile={setImageFile}
        />
      </div>

      <UserInfoEditForm imageFile={imageFile} imageSrc={imageSrc} userData={userData} />
    </div>
  );
};

export default EditPage;
