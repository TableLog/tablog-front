import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { useGetRecipeListByUserId } from '@/hooks/queries/users.hooks';
import { IRecipe } from '@/types/api';

const RecipeListByUser = () => {
  const { id } = useParams();
  const { ref, inView } = useInView();
  const {
    data: recipeList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetRecipeListByUserId(Number(id));

  useEffect(() => {
    // 무한 스크롤
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="mt-4 px-5 text-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : recipeList?.pages?.[0]?.data.contents.length === 0 ? (
        <div>작성된 레시피가 없습니다.</div>
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
                  />
                </figure>
              </Link>
            ));
          })}

          {isFetching && (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}

          <div ref={ref as React.RefCallback<HTMLDivElement>} />
        </div>
      )}
    </div>
  );
};

export default RecipeListByUser;
