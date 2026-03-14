import { useState } from 'react';

import MiniSelectBox from '@/components/atoms/input/MiniSelectBox';
import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { SERVING_OPTIONS } from '@/constants/options.constants';
import { useGetRecipeIngredientList } from '@/hooks/queries/recipe.hooks';

import ShoppingButton from './shopping-button';

interface IngredientProps {
  recipeId: number;
}

const Ingredient = ({ recipeId }: IngredientProps) => {
  const { data, hasNextPage, fetchNextPage, isFetching } = useGetRecipeIngredientList({
    recipeId,
    page: 0,
  });

  const [selectedServingOption, setSelectedServingOption] = useState(SERVING_OPTIONS[0]);
  const servingNumber = parseInt(selectedServingOption.name);

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
          <InfiniteScroll
            className="flex max-h-56 w-full flex-col gap-4 overflow-y-auto pr-4"
            hasNextPage={hasNextPage}
            isFetching={isFetching}
            fetchNextPage={fetchNextPage}
          >
            {data?.recipe.recipeFoods.map(
              ({
                id,
                foodId,
                foodName,
                amount,
                recipeFoodUnit,
                cal,
                isChecked,
                shoppingListId,
              }) => (
                <div key={id} className="flex justify-between">
                  <div>
                    {foodName} | {amount * servingNumber}
                    {recipeFoodUnit} · {cal * servingNumber}kcal
                  </div>
                  <ShoppingButton
                    recipeId={recipeId}
                    foodId={foodId}
                    amount={amount}
                    foodUnit={recipeFoodUnit}
                    isChecked={isChecked}
                    shoppingListId={shoppingListId}
                  />
                </div>
              ),
            )}
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

export default Ingredient;
