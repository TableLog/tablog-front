import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
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
}

const Review = ({ review }: ReviewProps) => {
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

  const isReply = review.prrId !== 0;

  return (
    <>
      <div className={cn('flex gap-4', isReply && 'ml-auto w-11/12')}>
        {/* // ! 프로필 사진 */}
        <div className="h-[50px] w-[50px]">
          <div className="bg-grey07 h-full w-full rounded-full"></div>
        </div>
        <div key={review.id} className="flex flex-1 flex-col gap-1.5">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div>{review.user}</div>
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
            <div className="line-clamp-3">{review.content}</div>
          </div>
          {/* // ! 작성자일 떄만 */}
          {!isReply && (
            <button
              className="text-grey03 self-start pt-1 text-sm font-medium"
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
