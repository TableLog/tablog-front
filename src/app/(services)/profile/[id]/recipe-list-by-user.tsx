import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Text } from '@/components/atoms/text/Text';
import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { useGetRecipeListByUserId } from '@/hooks/queries/users.hooks';
import { IRecipe } from '@/types/api';

const RecipeListByUser = () => {
  const { id } = useParams();
  const {
    data: recipeList,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetRecipeListByUserId(Number(id));

  return (
    <InfiniteScroll
      className="mt-4 px-5 text-center"
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
    >
      {recipeList?.pages?.[0]?.data.contents.length === 0 ? (
        <Text fontSize={14} color="grey02">
          작성된 레시피가 없습니다.
        </Text>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {recipeList?.pages?.map((page) => {
            return page.data.contents.map((recipe: IRecipe) => (
              <Link key={recipe.id} href={`/recipe/${recipe.id}`} className="border border-grey08">
                <figure className="image-figure aspect-square" style={{ width: 120, height: 120 }}>
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    width={120}
                    height={120}
                    className="image-cover"
                    priority
                    unoptimized
                  />
                </figure>
              </Link>
            ));
          })}
        </div>
      )}
    </InfiniteScroll>
  );
};

export default RecipeListByUser;
