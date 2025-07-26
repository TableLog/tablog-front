'use client';

import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

import ReviewItem from '@/app/(services)/my/reviews/review-item';
import Button from '@/components/atoms/button/Button';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import Popup from '@/components/molecules/popup/Popup';
import { DELETE_REVIEW_MODAL } from '@/constants/modal.constants';
import { MY_RECIPE_REVIEW_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useDeleteRecipeReview, useGetRecipeReviewDetail } from '@/hooks/recipe.hooks';
import { showToast } from '@/utils/functions';

const ReviewDetailPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id, reviewId } = useParams<{ id: string; reviewId: string }>();

  const { data } = useGetRecipeReviewDetail({
    recipeId: Number(id),
    reviewId: Number(reviewId),
  });

  const { mutate: deleteReview } = useDeleteRecipeReview({
    onSuccess: (res) => {
      if (res.status === 200) {
        const modal = document.getElementById(DELETE_REVIEW_MODAL) as HTMLDialogElement;
        modal.close();
        showToast({ message: '리뷰를 삭제했습니다.', type: 'success' });
        queryClient.invalidateQueries({ queryKey: [MY_RECIPE_REVIEW_LIST_QUERY_KEY] });
        router.back();
      }
    },
  });

  const handleDeleteReview = () => {
    deleteReview({ recipeId: Number(id), reviewId: Number(reviewId) });
  };

  const openDeleteReviewModal = () => {
    const modal = document.getElementById(DELETE_REVIEW_MODAL) as HTMLDialogElement;
    modal.showModal();
  };

  return (
    <div className="relative px-5 py-4">
      <Popup
        id={DELETE_REVIEW_MODAL}
        title="리뷰 삭제"
        activeButtonComponent={
          <Button buttonColor="primary" size="medium" onClick={handleDeleteReview}>
            삭제
          </Button>
        }
      >
        <>
          <p>리뷰를 삭제하시겠습니까?</p>
          <p>삭제하신 후 되돌리실 수 없습니다.</p>
        </>
      </Popup>

      <PageHeader title="리뷰 상세" back>
        {data?.isReviewer && (
          <Button size="mini" buttonColor="grey04" onClick={openDeleteReviewModal}>
            리뷰 삭제
          </Button>
        )}
      </PageHeader>

      <div>
        <section></section>

        {data && (
          <section>
            <ReviewItem review={data} isDetail />
          </section>
        )}
      </div>
    </div>
  );
};

export default ReviewDetailPage;
