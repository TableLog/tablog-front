import React from 'react';

import PageHeader from '@/components/atoms/page-header/PageHeader';

import LogForm from '../../add-log/@form/log-form';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      <PageHeader title="일기 작성" back backUrl="/feed" />

      <LogForm id={Number(id)} />
    </div>
  );
};

export default page;
