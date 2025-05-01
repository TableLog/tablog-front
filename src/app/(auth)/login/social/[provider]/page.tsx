'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { useSocialLogin } from '@/hooks/auth.hooks';
import { useUserStore } from '@/lib/zutstand/userStore';

const SocialLogin = () => {
  const { setSocialUserData } = useUserStore();
  const params = useSearchParams();
  const { provider } = useParams();
  const router = useRouter();

  const code = params.get('code');

  const { mutate: socialLogin } = useSocialLogin({
    onSuccess: (res) => {
      console.log(res.headers['Kakao-Access-Token'], '?');
      setSocialUserData(res.data);
      console.log(res, 'data');
      router.push('/register/kakao');
    },
  });

  useEffect(() => {
    if (code && provider) {
      socialLogin({ provider, code });
    }
  }, [socialLogin, code, provider]);

  return <div></div>;
};

export default SocialLogin;
