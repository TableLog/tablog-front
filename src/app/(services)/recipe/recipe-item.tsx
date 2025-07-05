import { MouseEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import MoreOptions from '@/components/atoms/more-options/MoreOptions';
import Bookmark from '@/components/molecules/bookmark/Bookmark';
import Popup from '@/components/molecules/popup/Popup';
import RecipeInfo from '@/components/molecules/recipe-info/RecipeInfo';
import { DELETE_RECIPE_MODAL } from '@/constants/modal.constants';
import { RECIPE_MY_OPTIONS } from '@/constants/options.constants';
import { RECIPE_DETAIL_QUERY_KEY, RECIPE_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import {
  useAddBookmarkRecipe,
  useCancelBookmarkRecipe,
  useDeleteRecipe,
} from '@/hooks/recipe.hooks';
import { IRecipeList } from '@/types/api';
import { ECookTime, EPrice, ERecipeOption } from '@/types/enum';
import { HandleOpenModal, showToast } from '@/utils/functions';

interface RecipeListProps {
  recipe: IRecipeList;
}
const RecipeItem = ({ recipe }: RecipeListProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: addBookmarkRecipe } = useAddBookmarkRecipe({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_LIST_QUERY_KEY, exact: false });
      queryClient.invalidateQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipe.id) });
    },
  });

  const { mutate: cancelBookMarkRecipe } = useCancelBookmarkRecipe({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_LIST_QUERY_KEY, exact: false });
      queryClient.invalidateQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipe.id) });
    },
  });

  function handleBookmarkButtonClick(e: MouseEvent) {
    e.preventDefault();
    if (recipe.isSaved) cancelBookMarkRecipe({ recipeId: recipe.id });
    else addBookmarkRecipe({ recipeId: recipe.id });
  }

  const { mutate: deleteRecipe } = useDeleteRecipe({
    onSuccess: () => {
      router.push('/recipe');
      queryClient.invalidateQueries({ queryKey: RECIPE_LIST_QUERY_KEY });
      showToast({ message: '레시피 삭제 완료!', type: 'success' });
    },
  });

  function handleOptionClick(type: string) {
    switch (type) {
      case ERecipeOption.EDIT:
        // ! 수정하기
        break;
      case ERecipeOption.DELETE:
        HandleOpenModal(DELETE_RECIPE_MODAL);
        break;
    }
  }

  return (
    <>
      <Link
        key={recipe.id}
        href={`/recipe/${recipe.id}`}
        className="relative aspect-[16/12] w-full overflow-hidden rounded-[20px]"
      >
        <Image src={recipe.imageUrl} alt={`${recipe.title} 이미지`} fill className="object-cover" />

        <div className="absolute top-5 right-4 flex flex-col gap-1">
          {recipe.isWriter ? (
            <MoreOptions
              options={RECIPE_MY_OPTIONS}
              buttonEvent={handleOptionClick}
              iconColor="white"
            />
          ) : (
            <>
              <button
                className="bg-white01/20 flex h-[30px] w-[30px] items-center justify-center rounded-full"
                onClick={handleBookmarkButtonClick}
              >
                <Bookmark isMarked={recipe.isSaved} size={20} />
              </button>
              {recipe.isPaid && (
                <BoxIcon name="dollar-circle" size={30} color="yellow01" type="solid" />
              )}
            </>
          )}
        </div>

        <div className="absolute bottom-0 w-full">
          <RecipeInfo
            recipeName={recipe.title}
            price={EPrice[recipe.price]}
            time={ECookTime[recipe.cookingTime]}
            calorie={recipe.totalCal}
            star={recipe.star}
            comments={recipe.starCount}
            author={recipe.user}
          />
        </div>
      </Link>

      <Popup
        id={DELETE_RECIPE_MODAL}
        title="레시피를 삭제하시겠습니까?"
        closeButtonName="취소"
        activeButtonComponent={
          <Button
            buttonColor="primary"
            size="medium"
            onClick={() => deleteRecipe({ recipeId: recipe.id })}
          >
            삭제
          </Button>
        }
      >
        <p>레시피를 삭제하시면 되돌리실 수 없습니다.</p>
      </Popup>
    </>
  );
};

export default RecipeItem;
