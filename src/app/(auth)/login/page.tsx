'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/atoms/button/Button';
import { Checkbox } from '@/components/atoms/input/Checkbox';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
import { LoginFormValues } from '@/types/api';
import { cn } from '@/utils/cn';

const Login = () => {
  const { register } = useForm<LoginFormValues>();

  const [rememberEmail, setRememberEmail] = useState(false);

  const snsLoginButtonList = [
    { id: 1, name: 'Google Login', icon: '/icons/google-logo.svg', href: '/google' },
    { id: 2, name: 'Kakao Login', icon: '/icons/kakao-logo.svg', href: '/kakao' },
  ];

  return (
    <div className="pt-[88px]">
      <div className="text-primary01 flex flex-col items-center justify-center gap-1">
        <p className="font-extraLight leading-none">한 끼의 기록이 일상이 되다</p>

        <p className="font-gyeonggi text-[32px] leading-none">식탁일기</p>
      </div>

      <div className="mb-[120px]">
        <form className="mt-[64px] mb-4">
          <section className="mb-5">
            <TextInput type="email" category="email" register={register} />

            <TextInput type="password" category="password" register={register} />
          </section>

          <div className="mb-3">
            <Checkbox
              label="이메일 기억하기"
              value={rememberEmail}
              onChange={(e) => setRememberEmail(e.target.checked)}
            />
          </div>

          <Button full>
            <Text color="white01">로그인</Text>
          </Button>
        </form>

        <div className="flex items-center justify-between text-xs">
          <Text>이메일/비밀번호 찾기</Text>

          <Link href="/register/email">
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
                href={`/register/${button.href}`}
              >
                <Image src={button.icon} alt={button.name} width={20} height={20} />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <Text fontSize={14} color="black03" className="border-b-black03 inline border-b">
          서비스 둘러보기
        </Text>
      </div>
    </div>
  );
};

export default Login;
