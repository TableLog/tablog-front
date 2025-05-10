'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Text } from '@/components/atoms/text/Text';
import { SOCIAL_LOGIN_REDIRECT_URI } from '@/constants/common.constants';
import { cn } from '@/utils/cn';

import LoginForm from './@form/page';

const Login = () => {
  const snsLoginButtonList = [
    {
      id: 1,
      type: 'google',
      name: 'Google Login',
      icon: '/icons/google-logo.svg',
      href: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${SOCIAL_LOGIN_REDIRECT_URI}/google&response_type=code&scope=openid email profile`,
    },
    {
      id: 2,
      type: 'kakao',
      name: 'Kakao Login',
      icon: '/icons/kakao-logo.svg',
      href: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${SOCIAL_LOGIN_REDIRECT_URI}/kakao`,
    },
  ];

  return (
    <div className="pt-[88px]">
      <div className="text-primary01 flex flex-col items-center justify-center gap-1">
        <p className="font-extraLight leading-none">한 끼의 기록이 일상이 되다</p>

        <p className="font-gyeonggi text-[32px] leading-none">식탁일기</p>
      </div>

      <div className="mb-[120px]">
        <LoginForm />

        <div className="flex items-center justify-between text-xs">
          <Text>이메일/비밀번호 찾기</Text>

          <Link href="/register/local">
            <Text>이메일 회원가입</Text>
          </Link>
        </div>
      </div>

      <div className="mb-[64px]">
        <div className="divider">
          <Text fontSize={12} color="grey02">
            간편 로그인
          </Text>
        </div>

        <div className="m-auto flex max-w-[112px] items-center justify-between">
          {snsLoginButtonList.map((button) => {
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
      </div>

      <div className="text-center">
        <Text fontSize={14} color="black03" className="border-b-black03 inline border-b">
          <Link href="/home">서비스 둘러보기</Link>
        </Text>
      </div>
    </div>
  );
};

export default Login;
