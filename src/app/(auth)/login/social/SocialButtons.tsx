import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { SOCIAL_LINK_REDIRECT_URI, SOCIAL_LOGIN_REDIRECT_URI } from '@/constants/common.constants';
import { cn } from '@/utils/cn';

export const SocialButtons = ({ provider, link }: { provider?: string; link?: boolean }) => {
  const buttons = useMemo(() => {
    const snsLoginButtonList = [
      {
        id: 1,
        type: 'google',
        name: 'Google Login',
        icon: '/icons/google-logo.svg',
        href: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${link ? SOCIAL_LINK_REDIRECT_URI : SOCIAL_LOGIN_REDIRECT_URI}/google&response_type=code&scope=openid email profile`,
      },
      {
        id: 2,
        type: 'kakao',
        name: 'Kakao Login',
        icon: '/icons/kakao-logo.svg',
        href: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${link ? SOCIAL_LINK_REDIRECT_URI : SOCIAL_LOGIN_REDIRECT_URI}/kakao`,
      },
    ];

    if (provider) {
      return snsLoginButtonList.filter((el) => el.type === provider);
    } else {
      return snsLoginButtonList;
    }
  }, [link, provider]);

  const flexClass = link ? '' : 'm-auto';

  return (
    <div className={cn(flexClass, 'flex max-w-[112px] items-center justify-between')}>
      {buttons.map((button) => {
        const kakaoClass =
          button.name === 'Kakao Login' ? 'bg-[#FDDC3F] border-[#FDDC3F]' : 'border-grey07';

        return (
          <Link
            key={button.id}
            className={cn(
              kakaoClass,
              'flex h-10 w-10 items-center justify-center rounded-full border',
            )}
            href={button.href}
            passHref
          >
            <Image src={button.icon} alt={button.name} width={20} height={20} />
          </Link>
        );
      })}
    </div>
  );
};
