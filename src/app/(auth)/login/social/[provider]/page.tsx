'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { useSocialLogin } from '@/hooks/auth.hooks';
import { useUserStore } from '@/lib/zutstand/userStore';

const SocialRegister = () => {
  const { setSocialUserData } = useUserStore();
  const params = useSearchParams();
  const { provider } = useParams();
  const router = useRouter();

  const code = params.get('code');

  const { mutate: socialLogin } = useSocialLogin({
    onSuccess: (res) => {
      if (res.status === 200) {
        if (res.data.id) {
          console.log('res: ', res);
          router.push(`/home`);
        } else {
          setSocialUserData(res.data);
          router.push(`/register/${provider}`);
        }
      }
    },
    onError: (res) => {
      // 카카오 계정이 없을 때,
      if (res.response.data.message === 'EU404001') {
        if (code && provider) {
          // socialLogin({ provider, code });
        }
      }
    },
  });

  useEffect(() => {
    if (code && provider) {
      socialLogin({ provider, code });
    }
  }, [socialLogin, code, provider]);

  return <div></div>;
};

export default SocialRegister;
