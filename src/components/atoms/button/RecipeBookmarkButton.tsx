import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

import Bookmark from '@/components/molecules/bookmark/Bookmark';
import { RECIPE_DETAIL_QUERY_KEY, RECIPE_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import {
  useAddBookmarkRecipe,
  useCancelBookmarkRecipe,
  useGetRecipeBookmark,
} from '@/hooks/recipe.hooks';

interface RecipeBookmarkButtonProps {
  recipeId: number;
}

const RecipeBookmarkButton = ({ recipeId }: RecipeBookmarkButtonProps) => {
  const queryClient = useQueryClient();

  const { data: response } = useGetRecipeBookmark({ recipeId });

  const { mutate: addBookmarkRecipe } = useAddBookmarkRecipe({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_LIST_QUERY_KEY, exact: false });
      queryClient.invalidateQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId) });
    },
  });

  const { mutate: cancelBookMarkRecipe } = useCancelBookmarkRecipe({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_LIST_QUERY_KEY, exact: false });
      queryClient.invalidateQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId) });
    },
  });

  if (!response) return;

  const isMarked = response.data;

  function handleBookmarkButtonClick() {
    if (isMarked) cancelBookMarkRecipe({ recipeId });
    else addBookmarkRecipe({ recipeId });
  }

  return (
    <button className="flex items-center" onClick={handleBookmarkButtonClick}>
      <Bookmark isMarked={isMarked} />
    </button>
  );
};

export default RecipeBookmarkButton;
