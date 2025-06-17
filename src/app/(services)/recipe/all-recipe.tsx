import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { useGetSortedRecipe } from '@/hooks/recipe.hooks';

import RecipeItem from './recipe-item';

interface AllRecipeProps {
  isOnlyPaid: boolean;
  selectedSortOption: { id: number; title: string; name: string };
}

const AllRecipe = ({ isOnlyPaid, selectedSortOption }: AllRecipeProps) => {
  const { ref, inView } = useInView();

  const {
    data: recipes,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useGetSortedRecipe(
    {
      isPaid: isOnlyPaid,
    },
    { sortOption: selectedSortOption.name },
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const recipeContents = recipes?.pages;

  return (
    <>
      {recipeContents?.length === 0 ? (
        <div className="text-center">레시피가 존재하지 않습니다</div>
      ) : (
        <>
          {recipes?.pages.map((page) =>
            page.data.contents.map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />),
          )}

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

export default AllRecipe;
