'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { Text } from '@/components/atoms/text/Text';
import { useSocialLogin } from '@/hooks/auth.hooks';
import { useUserStore } from '@/lib/zutstand/userStore';
import { showToast } from '@/utils/functions';

const SocialRegister = () => {
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
    onError: (err) => {
      if (err.response.status === 400) {
        showToast({
          message: (
            <div>
              <p>소셜 로그인/가입에 실패했습니다.</p>

              <p>관리자에게 문의해주세요.</p>
            </div>
          ),
          type: 'error',
        });

        router.push(`/login`);
      }
    },
  });

  useEffect(() => {
    if (code && provider) {
      socialLogin({ provider, code });
    }
  }, [socialLogin, code, provider]);

  return (
    <div className="absolute inset-0 flex h-screen w-screen flex-col items-center justify-center gap-4">
      <LoadingSpinner />

      <Text fontSize={14}>소셜 로그인 진행중입니다</Text>
    </div>
  );
};

export default SocialRegister;
