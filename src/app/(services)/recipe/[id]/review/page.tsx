import { use } from 'react';

import PageHeader from '@/components/atoms/page-header/PageHeader';

const ReviewPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: recipeId } = use(params);

  return (
    <div className="relative px-5 py-4">
      <PageHeader title="리뷰" back backUrl={`/recipe/${recipeId}`} />
    </div>
  );
};

export default ReviewPage;
