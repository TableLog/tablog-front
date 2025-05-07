'use client';

import React, { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import PageHeader from '@/components/atoms/page-header/PageHeader';
import ProfileImage from '@/components/molecules/profile-image/ProfileImage';

import RegisterForm from './@form/page';

const Register = () => {
  const params = useParams();

  const isRegisterMethod = (method: string | undefined): method is 'google' | 'kakao' | 'local' => {
    return method === 'google' || method === 'kakao' || method === 'local';
  };

  const methodParam = typeof params.method === 'string' ? params.method : undefined;

  const registerMethod: 'google' | 'kakao' | 'local' = isRegisterMethod(methodParam)
    ? methodParam
    : 'local';

  const [imageSrc, setImageSrc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  // const [openTerms, setOpenTerms] = useState(true);

  const pageTitle = useMemo(() => {
    if (registerMethod === 'local') {
      return '이메일 회원가입';
    }

    if (registerMethod === 'google') {
      return '구글 회원가입';
    }

    if (registerMethod === 'kakao') {
      return '카카오 회원가입';
    }

    return '이메일 회원가입';
  }, [registerMethod]);

  return (
    <div>
      <PageHeader back title={pageTitle} backUrl="/login" />

      <div className="mt-8 mb-8 flex items-center justify-center">
        <ProfileImage imageSrc={imageSrc} setImageSrc={setImageSrc} setImageFile={setImageFile} />
      </div>

      <RegisterForm
        registerMethod={registerMethod}
        imageFile={imageFile}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
      />

      {/* <BottomSheet isOpen={openTerms} onClose={() => setOpenTerms(false)} title="약관 동의">
        <div className="flex h-full w-full flex-col justify-between px-5 pt-9">
          <div className="max-h-[50%] overflow-auto">
            <CheckAll options={TERMS_OPTIONS} />
          </div>

          <div className="flex w-full items-center justify-between gap-3">
            <Button buttonColor="grey06">닫기</Button>

            <Button full>동의하고 회원가입</Button>
          </div>
        </div>
      </BottomSheet> */}
    </div>
  );
};

export default Register;
