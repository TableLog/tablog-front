'use client';

import React, { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import PageHeader from '@/components/atoms/page-header/PageHeader';
import ProfileImage from '@/components/molecules/profile-image/ProfileImage';

import RegisterForm from './@form/page';

const Register = () => {
  const params = useParams();
  const registerMethod = params.method as string;

  const [imageSrc, setImageSrc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const pageTitle = useMemo(() => {
    if (registerMethod === 'email') {
      return '이메일 회원가입';
    }

    if (registerMethod === 'google') {
      return '구글 회원가입';
    }

    if (registerMethod === 'kakao') {
      return '카카오 회원가입';
    }

    return '이메일 회원가입';
  }, [registerMethod]);

  return (
    <div>
      <PageHeader back title={pageTitle} />

      <div className="mt-8 mb-8 flex items-center justify-center">
        <ProfileImage imageSrc={imageSrc} setImageSrc={setImageSrc} setImageFile={setImageFile} />
      </div>

      <RegisterForm registerMethod={registerMethod} imageFile={imageFile} />
    </div>
  );
};

export default Register;
