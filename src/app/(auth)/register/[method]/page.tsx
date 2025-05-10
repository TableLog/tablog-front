'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import PageHeader from '@/components/atoms/page-header/PageHeader';
import ProfileImage from '@/components/molecules/profile-image/ProfileImage';

import RegisterForm from './@form/page';

const Register = () => {
  const params = useParams();
  const router = useRouter();

  const isRegisterMethod = (method: string | undefined): method is 'google' | 'kakao' | 'local' => {
    return method === 'google' || method === 'kakao' || method === 'local';
  };

  const methodParam = typeof params.method === 'string' ? params.method : undefined;

  const registerMethod: 'google' | 'kakao' | 'local' = isRegisterMethod(methodParam)
    ? methodParam
    : 'local';

  const [imageSrc, setImageSrc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const pageTitle = useMemo(() => {
    if (registerMethod === 'local') {
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

  useEffect(() => {
    if (registerMethod !== 'local') {
      const navigationType = performance.getEntriesByType(
        'navigation',
      )[0] as PerformanceNavigationTiming;

      if (navigationType?.type === 'reload') {
        router.replace('/login');
      }
    }
  }, [registerMethod, router]);

  return (
    <div>
      <PageHeader back title={pageTitle} backUrl="/login" />

      <div className="mt-8 mb-8 flex items-center justify-center">
        <ProfileImage imageSrc={imageSrc} setImageSrc={setImageSrc} setImageFile={setImageFile} />
      </div>

      <RegisterForm
        registerMethod={registerMethod}
        imageFile={imageFile}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
      />
    </div>
  );
};

export default Register;
