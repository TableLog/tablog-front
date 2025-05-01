'use client';

import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import { useSocialLogin } from '@/hooks/auth.hooks';

const SocialLogin = () => {
  const params = useSearchParams();
  const { provider } = useParams();

  const code = params.get('code');

  const { mutate: socialLogin } = useSocialLogin();

  useEffect(() => {
    if (code && provider) {
      socialLogin({ provider, code });
    }
  }, [socialLogin, code, provider]);

  return <div></div>;
};

export default SocialLogin;
