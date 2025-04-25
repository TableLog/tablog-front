'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';

import PageHeader from '@/components/atoms/page-header/PageHeader';

const Register = () => {
  const params = useParams();

  const registerMethod = params.method as string;

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
    </div>
  );
};

export default Register;
