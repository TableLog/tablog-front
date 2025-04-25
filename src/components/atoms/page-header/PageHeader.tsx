import React from 'react';
import { useRouter } from 'next/navigation';

import { BoxIcon } from '../icon/BoxIcon';

interface IPageHeader {
  back?: boolean;
  title: string;
  children?: React.ReactNode;
}
const PageHeader = ({ back, title, children }: IPageHeader) => {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-between py-4">
      {back && (
        <div onClick={() => router.back()}>
          <BoxIcon name="arrow-back" size={24} />
        </div>
      )}

      <div className="absolute left-1/2 -translate-x-1/2">{title}</div>

      {children && <div>{children}</div>}
    </div>
  );
};

export default PageHeader;
