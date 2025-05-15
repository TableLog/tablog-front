'use client';

import React from 'react';
import Link from 'next/link';

import { Text } from '@/components/atoms/text/Text';

import LoginForm from './@form/login-form';
import { SocialButtons } from './social/SocialButtons';

const Login = () => {
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

        <SocialButtons />
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
