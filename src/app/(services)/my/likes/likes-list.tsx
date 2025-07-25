import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Button from '@/components/atoms/button/Button';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { useGetMyLikesList } from '@/hooks/my.hooks';

import RecipeItem from '../../recipe/recipe-item';

interface ILikesListProps {
  isOnlyPaid: boolean;
  selectedSortOption: { id: number; title: string; name: string };
}

const LikesList = ({ isOnlyPaid, selectedSortOption }: ILikesListProps) => {
  const { ref, inView } = useInView();

  const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyLikesList(
    {
      isPaid: isOnlyPaid,
      pageNumber: 0,
    },
    { sortOption: selectedSortOption.name },
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-4">
      {data?.recipes?.length === 0 ? (
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-10 text-center">
          <div>좋아요 레시피가 존재하지 않습니다 </div>

          <Button href="/recipe">레시피 둘러보기</Button>
        </div>
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
    </div>
  );
};

export default LikesList;
