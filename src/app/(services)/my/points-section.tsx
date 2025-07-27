'use client';

import React from 'react';

import Button from '@/components/atoms/button/Button';
import { Text } from '@/components/atoms/text/Text';
import { useGetUserInfo } from '@/hooks/auth.hooks';

const PointsSection = () => {
  const { data: userData } = useGetUserInfo();

  return (
    <section className="mb-6 flex items-center justify-between rounded-[8px] bg-grey08 px-3 py-2.5">
      <div>
        <Text fontSize={14}>포인트</Text>

        <Text fontSize={16} fontWeight="semiBold">
          {userData?.pointBalance}
        </Text>
      </div>

      <Button size="small">
        <Text color="white01" fontSize={14}>
          상품권으로 전환하기
        </Text>
      </Button>
    </section>
  );
};

export default PointsSection;
