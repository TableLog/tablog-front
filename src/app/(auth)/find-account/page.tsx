'use client';

import React, { useState } from 'react';

import PageHeader from '@/components/atoms/page-header/PageHeader';

import ChangePasswordForm from './@form/change-password-form';
import FindAccountForm from './@form/find-account-form';

const FindAccountPage = () => {
  const [step, setStep] = useState(0);
  const [accountInfo, setAccountInfo] = useState({ provider: '', email: '' });

  return (
    <div className="h-[calc(100svh-32px)] py-4">
      <PageHeader back title="이메일/비밀번호 찾기" />

      <div className="flex h-full flex-col pt-8">
        {step === 0 && <FindAccountForm setStep={setStep} setAccountInfo={setAccountInfo} />}

        {step === 1 && <ChangePasswordForm accountInfo={accountInfo} />}
      </div>
    </div>
  );
};

export default FindAccountPage;
