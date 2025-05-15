'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { BoxIcon } from '../icon/BoxIcon';

interface IPageHeader {
  backUrl?: string;
  back?: boolean;
  title: string;
  children?: React.ReactNode;
}
const PageHeader = ({ backUrl, back, title, children }: IPageHeader) => {
  const router = useRouter();

  return (
    <div className="sticky top-[16px] z-50 flex items-center justify-between pb-4">
      {back && (
        <div
          onClick={() => {
            if (backUrl) {
              router.push(backUrl);
            } else {
              router.back();
            }
          }}
        >
          <BoxIcon name="arrow-back" size={24} />
        </div>
      )}

      <div className="absolute left-1/2 -translate-x-1/2">{title}</div>

      {children && <div>{children}</div>}
    </div>
  );
};

export default PageHeader;
