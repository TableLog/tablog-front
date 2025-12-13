import Button from '@/components/atoms/button/Button';
import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { useGetMyBookmarkList } from '@/hooks/queries/my.hooks';

import RecipeItem from '../../recipe/recipe-item';

interface IBookmarkListProps {
  isOnlyPaid: boolean;
  selectedSortOption: { id: number; title: string; name: string };
}

const BookmarkList = ({ isOnlyPaid, selectedSortOption }: IBookmarkListProps) => {
  const { data, hasNextPage, fetchNextPage, isFetching } = useGetMyBookmarkList(
    {
      isPaid: isOnlyPaid,
      page: 0,
    },
    { sortOption: selectedSortOption.name },
  );

  return (
    <InfiniteScroll
      className="flex flex-col gap-4"
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
    >
      {data?.recipes?.length === 0 ? (
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-6 text-center">
          <div>찜한 레시피가 존재하지 않습니다 </div>

          <Button href="/recipe">레시피 둘러보기</Button>
        </div>
      ) : (
        <>{data?.recipes?.map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />)}</>
      )}
    </InfiniteScroll>
  );
};

export default BookmarkList;
