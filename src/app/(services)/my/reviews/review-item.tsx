'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import ClampedTexts from '@/components/atoms/text/ClampedTexts';
import { IReview } from '@/types/api';
import { convertDateFormat } from '@/utils/functions';

interface IReviewItemProps {
  review: IReview;
  isDetail?: boolean;
}

const ReviewItem = ({ review, isDetail }: IReviewItemProps) => {
  const router = useRouter();
  const replyData = review.reply;

  const goToReviewDetail = (recipeId: number, reviewId: number) => {
    router.push(`/recipe/${recipeId}/review/${reviewId}`);
  };

  const clampClass = isDetail ? '' : 'line-clamp-2';

  return (
    <div key={review.id}>
      <section className="flex gap-3" onClick={() => goToReviewDetail(review.recipeId, review.id)}>
        {!isDetail && (
          <Image
            src={review.profileImgUrl}
            alt={review.content}
            width={90}
            height={90}
            className="aspect-square"
          />
        )}

        <ul className="flex w-full flex-col gap-2">
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <BoxIcon name="star" type="solid" size={10} />

              <span className="text-sm">{review.star}</span>
            </div>

            <div className="text-sm text-grey02">{convertDateFormat(review.modifiedAt)}</div>
          </li>

          <li>
            <div className={clampClass}>{review.content}</div>
          </li>
        </ul>
      </section>

      {replyData && (
        <section className="mb-1 mt-4 flex gap-3">
          <Image
            src={replyData.profileImgUrl}
            alt={replyData.user}
            width={50}
            height={50}
            className="aspect-square max-h-[50px] max-w-[50px] rounded-full"
          />

          <div className="flex flex-col gap-1">
            <div className="flex items-end justify-between text-sm">
              <div className="text-sm">{replyData.user}</div>

              <div className="text-sm text-grey02">{convertDateFormat(replyData.modifiedAt)}</div>
            </div>

            <div className="rounded-bl-xl rounded-br-xl rounded-tr-xl bg-grey08 p-2.5 text-sm">
              <ClampedTexts>{replyData.content}</ClampedTexts>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ReviewItem;
