'use client';
import React, { useState } from 'react';

import PageHeader from '@/components/atoms/page-header/PageHeader';
import Tab from '@/components/atoms/tab/Tab';
import { useGetPointHistory } from '@/hooks/my.hooks';

import PointsHistoryList from './PointsHistoryList';

const PointHistoryPage = () => {
  const [type, setType] = useState<'EARN' | 'USE'>('EARN');

  const { data, isFetching, hasNextPage, fetchNextPage } = useGetPointHistory(type);

  return (
    <div>
      <PageHeader title="포인트 이용내역" back />

      <div>
        <Tab
          handleTabChange={(index) => {
            setType(index === 0 ? 'EARN' : 'USE');
          }}
        >
          <div className="mb-8">
            <Tab.Buttons tabs={['적립', '사용']} />
          </div>

          <Tab.Panel index={0}>
            <PointsHistoryList
              type={'EARN'}
              pointHistory={data?.pointHistory || []}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
              fetchNextPage={fetchNextPage}
            />
          </Tab.Panel>

          <Tab.Panel index={1}>
            <PointsHistoryList
              type={'USE'}
              pointHistory={data?.pointHistory || []}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
              fetchNextPage={fetchNextPage}
            />
          </Tab.Panel>
        </Tab>
      </div>
    </div>
  );
};

export default PointHistoryPage;
