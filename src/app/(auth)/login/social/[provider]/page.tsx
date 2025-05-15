'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { useSocialLink, useSocialLogin } from '@/hooks/auth.hooks';
import { useLoginStore, useUserStore } from '@/lib/zutstand/userStore';

const SocialRegister = () => {
  const { isLoggedIn } = useLoginStore();
  const params = useSearchParams();
  const { provider } = useParams();
  const router = useRouter();

  const { setSocialUserData } = useUserStore();

  const code = params.get('code');

  const { mutate: socialLogin } = useSocialLogin({
    onSuccess: (res) => {
      if (res.status === 200) {
        if (res.data.id) {
          router.push(`/home`);
        } else {
          setSocialUserData(res.data);
          router.push(`/register/${provider}`);
        }
      }
    },
  });

  const { mutate: socialLink } = useSocialLink({
    onSuccess: (res) => {
      if (res.status === 200) {
        if (res.data.id) {
          router.push(`/my/edit`);
        }
      }
    },
  });

  useEffect(() => {
    if (code && provider) {
      if (isLoggedIn) {
        socialLink({ provider, code });
      } else {
        socialLogin({ provider, code });
      }
    }
  }, [socialLogin, code, provider, isLoggedIn, socialLink]);

  return <div></div>;
};

export default SocialRegister;
