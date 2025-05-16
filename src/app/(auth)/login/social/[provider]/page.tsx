'use client';

import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { USER_INFO_QUERY_KEY } from '@/constants/query-key.constants';
import { useSocialLink, useSocialLogin } from '@/hooks/auth.hooks';
import { useLoginStore, useUserStore } from '@/lib/zutstand/userStore';

const SocialRegister = () => {
  const queryClient = useQueryClient();

  const { isLoggedIn } = useLoginStore();

  console.log(isLoggedIn, 'isLoggedIn');

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
        router.push(`/my/edit`);
      }
    },
  });

  useEffect(() => {
    if (code && provider) {
      if (isLoggedIn) {
        queryClient.removeQueries({ queryKey: [USER_INFO_QUERY_KEY] });

        socialLink({ provider, code });
      } else {
        socialLogin({ provider, code });
      }
    }
  }, [socialLogin, code, provider, isLoggedIn, socialLink, queryClient]);

  return <div>소셜 연동 진행중입니다...</div>;
};

export default SocialRegister;
