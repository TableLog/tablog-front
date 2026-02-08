'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Rating from '@/components/atoms/rating/Rating';
import ClampedTexts from '@/components/atoms/text/ClampedTexts';
import { Text } from '@/components/atoms/text/Text';
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
      <section className="flex gap-4" onClick={() => goToReviewDetail(review.recipeId, review.id)}>
        {!isDetail && (
          <Image
            src={review.recipeImageUrl}
            alt={review.content}
            width={80}
            height={80}
            className="aspect-square rounded-md border border-grey08 object-cover"
            unoptimized
          />
        )}

        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex flex-col">
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Text fontSize={14} fontWeight="medium">
                  {review.recipeTitle}
                </Text>
              </div>
            </div>
            <div className="mb-1 flex items-center gap-2">
              <Rating rating={review.star} />
              <Text fontSize={12} color="grey04">
                {convertDateFormat(review.modifiedAt)}
              </Text>
            </div>
            <Text fontSize={14} color="grey02" className={clampClass}>
              {review.content}
            </Text>
          </div>
        </div>
      </section>

      {replyData && (
        <section className="mb-1 ml-3 mt-4 flex gap-3">
          <Image
            src={replyData.profileImgUrl}
            alt={replyData.user}
            width={50}
            height={50}
            className="aspect-square max-h-[50px] max-w-[50px] rounded-full object-cover"
            unoptimized
          />

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="text-sm">{replyData.user}</div>
              <Text fontSize={12} color="grey04">
                {convertDateFormat(replyData.modifiedAt)}
              </Text>
            </div>

            <div className="rounded-bl-lg rounded-br-lg rounded-tr-lg bg-grey08 p-2.5 text-sm">
              <ClampedTexts>{replyData.content}</ClampedTexts>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ReviewItem;
