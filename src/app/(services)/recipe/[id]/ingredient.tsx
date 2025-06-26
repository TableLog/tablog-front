import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { useGetRecipeIngredientList } from '@/hooks/recipe.hooks';

interface IngredientProps {
  recipeId: number;
}

const Ingredient = ({ recipeId }: IngredientProps) => {
  const { ref, inView } = useInView();

  const { data, hasNextPage, fetchNextPage, isFetching } = useGetRecipeIngredientList({
    recipeId,
    pageNumber: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="bg-white01/20 text-white01 flex flex-col items-center gap-4 rounded-[20px] px-4 py-6 backdrop-blur-2xl">
      {data?.recipe.recipeFoods.length === 0 ? (
        <></>
      ) : (
        <>
          <p className="text-lg font-medium">{data?.recipe.title}</p>
          <div className="flex w-full flex-col gap-4">
            {data?.recipe.recipeFoods.map((food) => (
              <div key={food.id} className="flex justify-between">
                <div>
                  {food.foodName} | {food.amount}
                  {food.recipeFoodUnit} ({food.cal})kcal
                </div>
                <button>
                  <BoxIcon type={food.isChecked ? 'solid' : 'regular'} name="cart" size={24} />
                </button>
              </div>
            ))}

            {isFetching && (
              <div className="flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}

            <div ref={ref} />
          </div>
        </>
      )}
    </div>
  );
};

export default Ingredient;
