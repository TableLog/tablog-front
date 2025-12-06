import { useEffect } from 'react';

import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { useGetSortedRecipe } from '@/hooks/queries/recipe.hooks';

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
  const { data, hasNextPage, fetchNextPage, isFetching } = useGetSortedRecipe(
    {
      isPaid: isOnlyPaid,
      pageNumber: 0,
    },
    { sortOption: selectedSortOption.name, isMine },
  );

  useEffect(() => {
    if (data && data.recipes.length === 0) onRecipeNotExist?.();
  }, [data, onRecipeNotExist]);

  return (
    <>
      {data?.recipes?.length === 0 ? (
        <div className="pb-8 text-center">레시피가 존재하지 않습니다</div>
      ) : (
        <InfiniteScroll
          className="flex flex-col gap-4"
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          fetchNextPage={fetchNextPage}
        >
          {data?.recipes?.map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />)}
        </InfiniteScroll>
      )}
    </>
  );
};

export default RecipeList;
