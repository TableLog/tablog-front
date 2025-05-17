import React from 'react';
import Image from 'next/image';

import { SocialButtons } from '@/app/(auth)/login/social/SocialButtons';
import { Text } from '@/components/atoms/text/Text';
import { TUserData } from '@/types/api';

interface ISocialLinkProps {
  userData: TUserData;
}
const SocialLink = ({ userData }: ISocialLinkProps) => {
  function setRemainProviderCase(
    accounts: Array<{
      provider: string;
      email: string;
    }>,
  ) {
    if (accounts) {
      if (accounts.length === 0) {
        // 아무것도 연동 안 되어 있을 경우
        return '';
      }

      const hasKakao = accounts.some((acc) => acc.provider === 'kakao');
      const hasGoogle = accounts.some((acc) => acc.provider === 'google');

      // 둘 다 연동 되어 있을 경우
      if (hasKakao && hasGoogle) return 'all';

      // 카카오만 연동되어 있을 경우
      if (hasKakao) return 'google';
      // 구글만 연동되어 있을 경우
      if (hasGoogle) return 'kakao';
    }
  }

  return (
    <section className="mt-12">
      <div className="divider">
        <Text fontSize={12} color="grey02">
          SNS 계정
        </Text>
      </div>

      {userData?.oAuthAccounts?.length > 0 && (
        <div className="mb-8">
          <Text fontSize={12} fontWeight="medium" className="mb-2">
            연동된 계정
          </Text>

          <div className="flex flex-col gap-3">
            {userData?.oAuthAccounts?.map((social) => {
              return (
                <div key={social.email} className="flex items-center gap-2">
                  {social?.provider === 'google' ? (
                    <Image src="/icons/google-logo.svg" alt="구글" width={20} height={20} />
                  ) : (
                    <Image src="/icons/kakao-logo.svg" alt="카카오" width={20} height={20} />
                  )}

                  <Text fontSize={14}>{social.email}</Text>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {setRemainProviderCase(userData?.oAuthAccounts) !== 'all' && (
        <div>
          <Text fontSize={12} fontWeight="medium" className="mb-4">
            계정 연동하기
          </Text>

          <SocialButtons provider={setRemainProviderCase(userData?.oAuthAccounts)} link />
        </div>
      )}
    </section>
  );
};

export default SocialLink;
