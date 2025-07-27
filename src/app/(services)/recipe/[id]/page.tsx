'use client';

import { use } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import Popup from '@/components/molecules/popup/Popup';
import { ERecipeDetailSection } from '@/constants/common.constants';
import { PAY_RECIPE_MODAL } from '@/constants/modal.constants';
import { RECIPE_DETAIL_QUERY_KEY } from '@/constants/query-key.constants';
import { useGetRecipeDetail, usePayRecipe } from '@/hooks/recipe.hooks';
import { HandleOpenModal } from '@/utils/functions';

import Description from './description';
import Ingredient from './ingredient';
import RecipeHeader from './recipe-header';

const RecipeDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const queryClient = useQueryClient();
  const recipeId = parseInt(use(params).id);
  const { data: recipeInfo } = useGetRecipeDetail({
    recipeId,
  });
  const { mutate: payRecipe } = usePayRecipe({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId) });
    },
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode') ?? ERecipeDetailSection.INGREDIENT;
  const recipe = recipeInfo?.data;
  const canAccess = !recipe?.isWriter && recipe?.isPaid && !recipe?.hasPurchased;

  function openPaymentModal() {
    HandleOpenModal(PAY_RECIPE_MODAL);
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
    <div className="relative h-[calc(100vh-60px)] w-full">
      <RecipeHeader recipeId={recipeId} authorId={recipe?.writerId} isMyRecipe={recipe?.isWriter} />

      {recipe && (
        <Image
          src={recipe.imageUrl}
          alt={`${recipe.title} 레시피`}
          fill
          className="object-cover object-center brightness-[0.6]"
        />
      )}
      <div className="absolute bottom-8 flex w-full flex-col gap-8 px-5">
        {recipe && mode === ERecipeDetailSection.INGREDIENT ? (
          <Description recipe={recipe} />
        ) : (
          <Ingredient recipeId={recipeId} />
        )}
        <Button full onClick={handleRecipeStartButtonClick}>
          요리 시작
        </Button>
      </div>
      <Popup
        id={PAY_RECIPE_MODAL}
        title="해당 레시피는 유료레시피입니다."
        closeButtonName="취소"
        activeButtonComponent={
          <Button buttonColor="primary" size="medium" onClick={confirmRecipePayment}>
            확인
          </Button>
        }
      >
        <p>포인트 200p를 차감하여 레시피를 열람하시겠습니까?.</p>
      </Popup>
    </div>
  );
};

export default RecipeDetailPage;
