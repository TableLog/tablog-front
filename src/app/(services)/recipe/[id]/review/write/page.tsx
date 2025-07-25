'use client';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import Button from '@/components/atoms/button/Button';
import TextArea from '@/components/atoms/input/TextArea';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import StarRate from '@/components/molecules/star-rate/StarRate';
import { RECIPE_REVIEW_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddReview } from '@/hooks/recipe.hooks';
import { zodReviewForm } from '@/lib/zod/zodValidation';
import { showToast } from '@/utils/functions';

const RecipeReviewWritePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const recipeId = parseInt(use(params).id);
  const queryClient = useQueryClient();
  const router = useRouter();

  type TReviewFormValues = z.infer<typeof zodReviewForm>;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TReviewFormValues>({
    resolver: zodResolver(zodReviewForm),
    mode: 'onChange',
    defaultValues: {
      star: 5,
    },
  });

  const { mutate: addReview } = useAddReview({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RECIPE_REVIEW_LIST_QUERY_KEY(recipeId),
      });
      router.push(`/recipe/${recipeId}/review`);
      showToast({ message: '리뷰 등록에 성공했어요', type: 'success' });
    },
  });

  function onSubmit(data: TReviewFormValues) {
    addReview({ recipeId, prrId: 0, ...data });
  }

  return (
    <div className="relative px-5 py-4">
      <PageHeader className="mb-4" title="리뷰 작성" back backUrl={`/recipe/${recipeId}/review`} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <StarRate control={control} name="star" />
        <TextArea
          category="review"
          register={register}
          errors={errors}
          maxLength={300}
          name="content"
        />
        <Button type="submit">리뷰 등록</Button>
      </form>
    </div>
  );
};

export default RecipeReviewWritePage;
