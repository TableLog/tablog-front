import React from 'react';

import PageHeader from '@/components/atoms/page-header/PageHeader';

import FeedDetail from './@item/feed-detail';

const FeedDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      <PageHeader back backUrl="/feed" title="댓글" />

      <FeedDetail id={Number(id)} />
    </div>
  );
};

export default FeedDetailPage;
