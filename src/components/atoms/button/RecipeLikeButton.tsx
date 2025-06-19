import { useQueryClient } from '@tanstack/react-query';

import { RECIPE_DETAIL_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddLikeRecipe, useCancelLikeRecipe, useGetRecipeLike } from '@/hooks/recipe.hooks';

import { BoxIcon } from '../icon/BoxIcon';

interface RecipeLikeButtonProps {
  recipeId: number;
  likeCount?: number;
}

const RecipeLikeButton = ({ recipeId, likeCount }: RecipeLikeButtonProps) => {
  const queryClient = useQueryClient();

  const { data: response } = useGetRecipeLike({ recipeId });

  const { mutate: addLikeRecipe } = useAddLikeRecipe({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId) });
    },
  });

  const { mutate: cancelLikeRecipe } = useCancelLikeRecipe({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId) });
    },
  });

  if (!response) return;

  const like = response.data;

  function handleLikeButtonClick() {
    if (like) cancelLikeRecipe({ recipeId });
    else addLikeRecipe({ recipeId });
  }

  return (
    <button className="flex items-center gap-1 text-sm" onClick={handleLikeButtonClick}>
      <BoxIcon
        color={like ? 'primary01' : 'white01'}
        type={like ? 'solid' : 'regular'}
        name="heart"
        size={24}
      />
      {likeCount && <span>{likeCount}</span>}
    </button>
  );
};

export default RecipeLikeButton;
