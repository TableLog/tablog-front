import React from 'react';

import PageHeader from '@/components/atoms/page-header/PageHeader';

import LogForm from './@form/log-form';

const page = () => {
  return (
    <div>
      <PageHeader title="일기 작성" back backUrl="/feed" />

      <LogForm />
    </div>
  );
};

export default page;
