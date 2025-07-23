import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { useGetSortedRecipe } from '@/hooks/recipe.hooks';

import RecipeItem from './recipe-item';

interface RecipeListProps {
  isOnlyPaid: boolean;
  selectedSortOption: { id: number; title: string; name: string };
  isMine?: boolean;
  onRecipeNotExist?: () => void;
}

const RecipeList = ({
  isOnlyPaid,
  selectedSortOption,
  isMine = false,
  onRecipeNotExist,
}: RecipeListProps) => {
  const { ref, inView } = useInView();

  const { data, hasNextPage, fetchNextPage, isFetching } = useGetSortedRecipe(
    {
      isPaid: isOnlyPaid,
      pageNumber: 0,
    },
    { sortOption: selectedSortOption.name, isMine },
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data && data.recipes.length === 0) onRecipeNotExist?.();
  }, [data, onRecipeNotExist]);

  return (
    <>
      {data?.recipes?.length === 0 ? (
        <div className="pb-8 text-center">레시피가 존재하지 않습니다</div>
      ) : (
        <>
          {data?.recipes?.map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />)}

          {isFetching && (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}

          <div ref={ref} />
        </>
      )}
    </>
  );
};

export default RecipeList;
