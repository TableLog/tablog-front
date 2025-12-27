'use client';

import { useCallback } from 'react';

import Button from '@/components/atoms/button/Button';
import { Text } from '@/components/atoms/text/Text';
import { useGetUserInfo } from '@/hooks/queries/auth.hooks';
import { addComma, showToast } from '@/utils/functions';

const PointsSection = () => {
  const { data: userData } = useGetUserInfo();

  const handleClickConvertPoints = useCallback(() => {
    showToast({ message: '상품권으로 전환하기 기능은 준비 중입니다.', type: 'info' });
  }, []);

  return (
    <section className="mb-6 flex items-center justify-between rounded-xl bg-grey08 px-4 py-3">
      <div>
        <Text fontSize={14}>포인트</Text>

        <Text fontSize={16} fontWeight="semiBold">
          {addComma(userData?.pointBalance)}
        </Text>
      </div>

      <Button size="small" onClick={handleClickConvertPoints}>
        <Text color="white01" fontSize={14}>
          상품권으로 전환하기
        </Text>
      </Button>
    </section>
  );
};

export default PointsSection;
