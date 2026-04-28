'use client';

import { Suspense, use } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { usePopupContext } from '@/components/molecules/popup/PopupProvider';
import { ERecipeDetailSection } from '@/constants/common.constants';
import { RECIPE_QUERY_KEY } from '@/constants/query-key.constants';
import { useGetRecipeDetail, usePayRecipe } from '@/hooks/queries/recipe.hooks';

import Description from './description';
import Ingredient from './ingredient';
import RecipeHeader from './recipe-header';

const RecipeDetailContent = ({ params }: { params: Promise<{ id: string }> }) => {
  const queryClient = useQueryClient();
  const recipeId = parseInt(use(params).id);
  const { data: recipeInfo } = useGetRecipeDetail({
    recipeId,
  });
  const { mutate: payRecipe } = usePayRecipe({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY.DETAIL(recipeId) });
    },
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openModal } = usePopupContext();
  const mode = searchParams.get('mode') ?? ERecipeDetailSection.INGREDIENT;
  const recipe = recipeInfo?.data;
  const canAccess = !recipe?.isWriter && recipe?.isPaid && !recipe?.hasPurchased;

  function openPaymentModal() {
    openModal({
      title: '해당 레시피는 유료레시피입니다.',
      closeButtonName: '취소',
      activeButtonComponent: ({ closeModal }) => (
        <Button
          buttonColor="primary"
          size="medium"
          onClick={() => {
            confirmRecipePayment();
            closeModal();
          }}
        >
          확인
        </Button>
      ),
      children: <p>포인트 200p를 차감하여 레시피를 열람하시겠습니까?.</p>,
    });
  }

  function moveToStagePage() {
    router.push(`/recipe/${recipeId}/stage?sequence=0`);
  }

  function confirmRecipePayment() {
    payRecipe({ recipeId }, { onSuccess: () => moveToStagePage() });
  }

  function handleRecipeStartButtonClick() {
    if (canAccess) openPaymentModal();
    else moveToStagePage();
  }

  return (
    <div className="relative h-[calc(100dvh-60px)] w-full">
      <RecipeHeader recipeId={recipeId} authorId={recipe?.writerId} isMyRecipe={recipe?.isWriter} />

      {recipe && (
        <Image
          src={recipe.imageUrl}
          alt={`${recipe.title} 레시피`}
          fill
          className="object-cover object-center brightness-[0.6]"
          unoptimized
        />
      )}
      <div className="absolute bottom-8 flex w-full flex-col gap-4 px-5">
        {recipe && mode === ERecipeDetailSection.INGREDIENT ? (
          <Description recipe={recipe} />
        ) : (
          <Ingredient recipeId={recipeId} />
        )}
        <Button full onClick={handleRecipeStartButtonClick}>
          요리 시작
        </Button>
      </div>
    </div>
  );
};

const RecipeDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100dvh-92px)] items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <RecipeDetailContent params={params} />
    </Suspense>
  );
};

export default RecipeDetailPage;
