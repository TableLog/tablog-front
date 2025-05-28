'use client';

import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { Text } from '@/components/atoms/text/Text';
import { USER_INFO_QUERY_KEY } from '@/constants/query-key.constants';
import { useSocialLink } from '@/hooks/auth.hooks';
import { showErrorToast } from '@/utils/functions';

const SocialRegister = () => {
  const queryClient = useQueryClient();

  const params = useSearchParams();
  const { provider } = useParams();
  const router = useRouter();

  const code = params.get('code');

  const { mutate: socialLink } = useSocialLink({
    onSuccess: (res) => {
      if (res.status === 200) {
        queryClient.removeQueries({ queryKey: [USER_INFO_QUERY_KEY] });

        router.push(`/my/edit`);
      }
    },
    onError: (err) => {
      showErrorToast(err);

      router.replace('/my/edit');
    },
  });

  useEffect(() => {
    if (code && provider) {
      socialLink({ provider, code });
    }
  }, [code, provider, socialLink]);

  return (
    <div className="absolute inset-0 flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Text fontSize={14}>소셜 연동 진행중입니다</Text>

      <LoadingSpinner />
    </div>
  );
};

export default SocialRegister;
