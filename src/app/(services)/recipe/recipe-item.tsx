import { MouseEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import Bookmark from '@/components/molecules/bookmark/Bookmark';
import RecipeInfo from '@/components/molecules/recipe-info/RecipeInfo';
import { RECIPE_DETAIL_QUERY_KEY, RECIPE_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddBookmarkRecipe, useCancelBookmarkRecipe } from '@/hooks/recipe.hooks';
import { IRecipeList } from '@/types/api';
import { ECookTime, EPrice } from '@/types/enum';

interface RecipeListProps {
  recipe: IRecipeList;
}
const RecipeItem = ({ recipe }: RecipeListProps) => {
  const queryClient = useQueryClient();

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

  return (
    <Link
      key={recipe.id}
      href={`/recipe/${recipe.id}`}
      className="relative aspect-[16/12] w-full overflow-hidden rounded-[20px]"
    >
      <Image src={recipe.imageUrl} alt={`${recipe.title} 이미지`} fill className="object-cover" />
      <div className="absolute top-5 right-4 flex flex-col gap-1">
        <button
          className="bg-white01/20 flex h-[30px] w-[30px] items-center justify-center rounded-full"
          onClick={handleBookmarkButtonClick}
        >
          <Bookmark isMarked={recipe.isSaved} size={20} />
        </button>
        {recipe.isPaid && (
          <div className="bg-yellow01 flex h-[30px] w-[30px] items-center justify-center rounded-full">
            $
          </div>
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
  );
};

export default RecipeItem;
