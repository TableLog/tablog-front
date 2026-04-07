import { useQueryClient } from '@tanstack/react-query';

import { RECIPE_QUERY_KEY } from '@/constants/query-key.constants';
import {
  useAddLikeRecipe,
  useCancelLikeRecipe,
  useGetRecipeLike,
} from '@/hooks/queries/recipe.hooks';
import { useLoginStore } from '@/lib/zustand/userStore';

import { BoxIcon } from '../icon/BoxIcon';

import LoginClickGuard from './LoginRequiredLink';

interface RecipeLikeButtonProps {
  recipeId: number;
  likeCount?: number;
}

const RecipeLikeButton = ({ recipeId, likeCount }: RecipeLikeButtonProps) => {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useLoginStore();

  const { data: response } = useGetRecipeLike({ recipeId }, { enabled: isLoggedIn });

  const { mutate: addLikeRecipe } = useAddLikeRecipe({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY.DETAIL(recipeId) });
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY.MY_LIKE_LIST() });
    },
  });

  const { mutate: cancelLikeRecipe } = useCancelLikeRecipe({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY.DETAIL(recipeId) });
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY.MY_LIKE_LIST() });
    },
  });

  if (!response)
    return (
      <LoginClickGuard>
        <div className="flex items-center gap-1 text-sm">
          <BoxIcon color="white01" type="regular" name="heart" size={24} />
          {likeCount && <span>{likeCount}</span>}
        </div>
      </LoginClickGuard>
    );

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
