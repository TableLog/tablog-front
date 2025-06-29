'use client';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import ToggleModeButton from '@/components/atoms/button/ToggleModeButton';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import MoreOptions from '@/components/atoms/more-options/MoreOptions';
import Popup from '@/components/molecules/popup/Popup';
import { ERecipeDetailSection } from '@/constants/common.constants';
import { RECIPE_MY_OPTIONS, RECIPE_OPTIONS } from '@/constants/options.constants';
import { RECIPE_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useDeleteRecipe } from '@/hooks/recipe.hooks';
import { ERecipeOption } from '@/types/enum';
import { HandleOpenModal, showToast } from '@/utils/functions';

interface RecipeHeaderProps {
  recipeId: number;
  isMyRecipe?: boolean;
}

const RecipeHeader = ({ recipeId, isMyRecipe = false }: RecipeHeaderProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const { mutate: deleteRecipe } = useDeleteRecipe({
    onSuccess: () => {
      router.push('/recipe');
      queryClient.invalidateQueries({ queryKey: RECIPE_LIST_QUERY_KEY });
      showToast({ message: '레시피 삭제 완료!', type: 'success' });
    },
  });

  const handleOptionClick = (type: string) => {
    switch (type) {
      case ERecipeOption.PROFILE:
        // ! 프로필 조회
        break;
      case ERecipeOption.CHAT:
        // ! 채팅하기
        break;
      case ERecipeOption.REPORT:
        // ! 신고하기
        break;
      case ERecipeOption.EDIT:
        // ! 수정하기
        break;
      case ERecipeOption.DELETE:
        HandleOpenModal('recipe-detete-modal');
        break;
    }
  };

  return (
    <div className="sticky z-50 flex items-center justify-between px-5 py-4">
      <Link href="/recipe">
        <BoxIcon name="arrow-back" size={24} color="white" />
      </Link>
      <div className="text-white01 absolute left-1/2 -translate-x-1/2">
        <ToggleModeButton
          options={[ERecipeDetailSection.INGREDIENT, ERecipeDetailSection.DESCRIPTION]}
          onChange={(newOption: string) => {
            params.set('mode', newOption);
            router.replace(`${pathname}?${params.toString()}`);
          }}
        />
      </div>
      <MoreOptions
        options={isMyRecipe ? RECIPE_MY_OPTIONS : RECIPE_OPTIONS}
        buttonEvent={handleOptionClick}
        iconColor="white"
      />
      <Popup
        id="recipe-detete-modal"
        title="레시피를 삭제하시겠습니까?"
        closeButtonName="취소"
        activeButtonComponent={
          <Button buttonColor="primary" size="medium" onClick={() => deleteRecipe({ recipeId })}>
            삭제
          </Button>
        }
      >
        <p>레시피를 삭제하시면 되돌리실 수 없습니다.</p>
      </Popup>
    </div>
  );
};

export default RecipeHeader;
