import { useQueryClient } from '@tanstack/react-query';

import Bookmark from '@/components/molecules/bookmark/Bookmark';
import { RECIPE_QUERY_KEY } from '@/constants/query-key.constants';
import {
  useAddBookmarkRecipe,
  useCancelBookmarkRecipe,
  useGetRecipeBookmark,
} from '@/hooks/queries/recipe.hooks';

interface RecipeBookmarkButtonProps {
  recipeId: number;
}

const RecipeBookmarkButton = ({ recipeId }: RecipeBookmarkButtonProps) => {
  const queryClient = useQueryClient();

  const { data: response } = useGetRecipeBookmark({ recipeId });

  const { mutate: addBookmarkRecipe } = useAddBookmarkRecipe({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY.LIST() });
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY.BOOKMARK(recipeId) });
    },
  });

  const { mutate: cancelBookMarkRecipe } = useCancelBookmarkRecipe({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY.LIST() });
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY.BOOKMARK(recipeId) });
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
