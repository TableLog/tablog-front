import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQueryClient } from '@tanstack/react-query';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import MiniSelectBox from '@/components/atoms/input/MiniSelectBox';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { SERVING_OPTIONS } from '@/constants/options.constants';
import { RECIPE_INGREDIENT_QUERY_KEY } from '@/constants/query-key.constants';
import { useGetRecipeIngredientList } from '@/hooks/recipe.hooks';
import { useAddShoppingList, useRemoveShoppingList } from '@/hooks/shopping.hooks';
import { AddShoppingListPayload } from '@/types/api';

interface IngredientProps {
  recipeId: number;
}

const Ingredient = ({ recipeId }: IngredientProps) => {
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();
  const { data, hasNextPage, fetchNextPage, isFetching } = useGetRecipeIngredientList({
    recipeId,
    pageNumber: 0,
  });
  const { mutate: addShoppingList } = useAddShoppingList({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RECIPE_INGREDIENT_QUERY_KEY],
      });
    },
  });
  const { mutate: removeShoppingList } = useRemoveShoppingList({});

  const [selectedServingOption, setSelectedServingOption] = useState(SERVING_OPTIONS[0]);
  const servingNumber = parseInt(selectedServingOption.name);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  function handleCartButtonClick(data: AddShoppingListPayload, isChecked: boolean) {
    // ! shoppingListId가 필요함
    if (isChecked) removeShoppingList({ shoppingListId: -1 });
    else addShoppingList(data);
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-[20px] bg-white01/20 px-4 py-6 text-white01 backdrop-blur-2xl">
      {data?.recipe.recipeFoods.length === 0 ? (
        <></>
      ) : (
        <>
          <p className="text-lg font-medium">{data?.recipe.title}</p>
          <MiniSelectBox
            className="self-end"
            list={SERVING_OPTIONS}
            value={selectedServingOption}
            onChange={(newOption) => setSelectedServingOption(newOption)}
          />
          <div className="flex w-full flex-col gap-4">
            {data?.recipe.recipeFoods.map((food) => (
              <div key={food.id} className="flex justify-between">
                <div>
                  {food.foodName} | {food.amount * servingNumber}
                  {food.recipeFoodUnit} ({food.cal * servingNumber})kcal
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCartButtonClick(
                      {
                        foodId: food.foodId,
                        amount: food.amount,
                        foodUnit: food.recipeFoodUnit,
                      },
                      food.isChecked,
                    )
                  }
                >
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
