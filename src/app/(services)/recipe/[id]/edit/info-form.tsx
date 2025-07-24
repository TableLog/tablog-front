'use client';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import Button from '@/components/atoms/button/Button';
import ToggleButton from '@/components/atoms/button/ToggleButton';
import CategoryTag from '@/components/atoms/category-tag/CategoryTag';
import Range from '@/components/atoms/input/Range';
import RecipeImageInput from '@/components/atoms/input/RecipeImageInput';
import TextArea from '@/components/atoms/input/TextArea';
import TextInput from '@/components/atoms/input/TextInput';
import Tooltip from '@/components/atoms/tooltip/Tooltip';
import { COOK_TIME_OPTIONS, PRICE_OPTIONS } from '@/constants/options.constants';
import { RECIPE_DETAIL_QUERY_KEY } from '@/constants/query-key.constants';
import { useGetUserInfo } from '@/hooks/auth.hooks';
import { useGetRecipeDetail, useUpdateRecipe } from '@/hooks/recipe.hooks';
import { zodEditRecipeForm } from '@/lib/zod/zodValidation';
import { EUserRole } from '@/types/enum';
import { showToast } from '@/utils/functions';

type TRecipeFormValues = z.infer<typeof zodEditRecipeForm>;

interface InfoFormProps {
  recipeId: number;
}

const InfoForm = ({ recipeId }: InfoFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: updateRecipe } = useUpdateRecipe({
    onSuccess: () => {
      router.push(`/recipe/${recipeId}`);
      queryClient.invalidateQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId) });
      showToast({ message: '레시피 수정 완료!', type: 'success' });
    },
  });

  const { data: userInfo } = useGetUserInfo();
  const { data: recipe, isPending, isError } = useGetRecipeDetail({ recipeId });

  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = useForm<TRecipeFormValues>({
    resolver: zodResolver(zodEditRecipeForm),
    mode: 'onChange',
    defaultValues: {
      recipeCreateRequestDto: {
        title: '',
        intro: '',
        recipeCategoryList: [],
        price: PRICE_OPTIONS[0].name,
        cookingTime: COOK_TIME_OPTIONS[0].name,
        isPaid: false,
      },
    },
  });

  useEffect(() => {
    if (recipe) {
      reset({
        recipeCreateRequestDto: {
          title: recipe.data.title,
          intro: recipe.data.intro,
          recipeCategoryList: recipe.data.recipeCategoryList,
          price: recipe.data.price,
          cookingTime: recipe.data.cookingTime,
          isPaid: recipe.data.isPaid,
        },
        recipeImage: recipe ? [recipe.data.imageUrl] : [],
      });
    }
  }, [recipe, reset]);

  function onSubmit(data: TRecipeFormValues) {
    const { recipeImage, recipeCreateRequestDto } = data;

    const formData = new FormData();

    if (recipeImage[0]) formData.append(`multipartFile`, recipeImage[0]);
    formData.append(
      'controllerRequestDto',
      JSON.stringify({
        ...recipeCreateRequestDto,
        imageUrl: recipe?.data.imageUrl,
        recipePoint: 0,
      }),
    );

    updateRecipe({ recipeId, formData });
  }

  const defaultImages = useMemo(() => (recipe ? [recipe.data.imageUrl] : []), [recipe]);

  if (isPending || isError) return <></>;

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <RecipeImageInput
          className="mb-4"
          maxImage={1}
          label="썸네일 이미지 업로드"
          control={control}
          name="recipeImage"
          defaultImages={defaultImages}
        />
        <TextInput
          category="recipeName"
          name="recipeCreateRequestDto.title"
          register={register}
          errors={errors}
        />
        <TextArea
          category="recipeDescription"
          name="recipeCreateRequestDto.intro"
          register={register}
          errors={errors}
          maxLength={300}
        />
      </div>

      <CategoryTag name="recipeCreateRequestDto.recipeCategoryList" control={control} />

      <Range type="price" name="recipeCreateRequestDto.price" control={control} />

      <Range type="time" name="recipeCreateRequestDto.cookingTime" control={control} />

      <ToggleButton
        className="pb-28"
        title={
          <div className="flex items-center gap-2">
            <span>유료 레시피로 등록</span>
            <Tooltip>
              <p>
                등록된 레시피가 50개 이상이거나 사업장 등록증 또는 레시피 특허증을 등록하면 레시피를
                유로로 등록하실 수 있습니다.
              </p>
              <p>유료로 등록한 레시피의 재료 및 요리 과정은 유료 결제한 회원들에게만 노출됩니다.</p>
            </Tooltip>
          </div>
        }
        disabled={userInfo?.userRole !== EUserRole.EXPERT}
        {...register('recipeCreateRequestDto.isPaid')}
      />

      <Button type="submit">수정하기</Button>
    </form>
  );
};

export default InfoForm;
