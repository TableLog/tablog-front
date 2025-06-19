import { useQueryClient } from '@tanstack/react-query';

import { RECIPE_DETAIL_QUERY_KEY } from '@/constants/query-key.constants';
import { useCancelLikeRecipe, useGetRecipeLike, useLikeRecipe } from '@/hooks/recipe.hooks';

import { BoxIcon } from '../icon/BoxIcon';

interface RecipeLikeButtonProps {
  recipeId: number;
  likeCount?: number;
}

const RecipeLikeButton = ({ recipeId, likeCount }: RecipeLikeButtonProps) => {
  const queryClient = useQueryClient();

  const { data: response } = useGetRecipeLike({ recipeId });

  const { mutate: likeRecipe } = useLikeRecipe({
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
    else likeRecipe({ recipeId });
  }

  return (
    <button className="flex items-center gap-1 text-sm" onClick={handleLikeButtonClick}>
      <BoxIcon color="primary01" type={like ? 'solid' : 'regular'} name="heart" size={24} />{' '}
      {likeCount && <span>{likeCount}</span>}
    </button>
  );
};

export default RecipeLikeButton;
