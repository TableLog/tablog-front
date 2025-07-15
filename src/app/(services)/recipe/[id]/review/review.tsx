import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import TextArea from '@/components/atoms/input/TextArea';
import { Text } from '@/components/atoms/text/Text';
import BottomSheet from '@/components/organisms/bottom-sheet/BottomSheet';
import { RECIPE_REVIEW_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddReviewReply } from '@/hooks/recipe.hooks';
import { zodReviewReplyForm } from '@/lib/zod/zodValidation';
import { IReview } from '@/types/api';
import { cn } from '@/utils/cn';
import { convertDateFormat } from '@/utils/functions';

interface ReviewProps {
  review: IReview;
  isReply?: boolean;
  isWriter?: boolean;
}

const Review = ({ review, isReply, isWriter }: ReviewProps) => {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const [activePrrId, setActivePrrId] = useState<IReview['id']>(-1);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: addReviewReply } = useAddReviewReply({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RECIPE_REVIEW_LIST_QUERY_KEY(review.recipeId),
      });
      router.push(`/recipe/${review.recipeId}/review`);
      setBottomSheetOpen(false);
    },
  });

  type TReviewFormValues = z.infer<typeof zodReviewReplyForm>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReviewFormValues>({
    resolver: zodResolver(zodReviewReplyForm),
    mode: 'onChange',
  });

  function onSubmit(data: TReviewFormValues) {
    addReviewReply({ recipeId: review.recipeId, prrId: activePrrId, ...data });
  }

  const hasReply = !!review.reply;

  return (
    <>
      <div className={cn('flex gap-4', isReply && 'ml-auto w-[calc(100%-28px)]')}>
        <div className="relative h-[50px] w-[50px] overflow-hidden rounded-full">
          {review.profileImgUrl ? (
            <Image src={review.profileImgUrl} alt={`${review.user} 프로필`} fill />
          ) : (
            <div className="h-full w-full bg-grey08"></div>
          )}
        </div>
        <div key={review.id} className="flex flex-1 flex-col gap-1.5">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{review.user}</div>
                  {isReply && (
                    <div className="flex items-center rounded-sm bg-primary01/10 px-1.5 py-0.5 text-xs text-primary01">
                      작성자
                    </div>
                  )}
                </div>
                {!isReply && (
                  <div className="flex items-center gap-1">
                    <BoxIcon name="star" type="solid" color="yellow01" />
                    <span>{review.star.toFixed(1)}</span>
                  </div>
                )}
              </div>
              <Text fontSize={14} color="grey04">
                {convertDateFormat(review.modifiedAt)}
              </Text>
            </div>
            <div className={cn('line-clamp-3', isReply && 'rounded-md bg-grey08 px-4 py-2.5')}>
              {review.content}
            </div>
          </div>
          {isWriter && !isReply && !hasReply && (
            <button
              className="self-start pt-1 text-sm font-medium text-grey03"
              onClick={() => {
                setBottomSheetOpen(true);
                setActivePrrId(review.id);
              }}
            >
              답글 달기
            </button>
          )}
        </div>
      </div>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        title="답글 달기"
        buttons={
          <div className="grid grid-cols-2 gap-1.5">
            <Button buttonColor="grey06" onClick={() => setBottomSheetOpen(false)}>
              닫기
            </Button>
            <Button full type="submit" form="reply-form">
              제출
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="px-5" id="reply-form">
          <TextArea
            register={register}
            category="reviewReply"
            name="content"
            errors={errors}
            maxLength={300}
          />
        </form>
      </BottomSheet>
    </>
  );
};

export default Review;
