import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import MiniSelectBox from '@/components/atoms/input/MiniSelectBox';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { SERVING_OPTIONS } from '@/constants/options.constants';
import { useGetRecipeIngredientList } from '@/hooks/queries/recipe.hooks';

import ShoppingButton from './shopping-button';

interface IngredientProps {
  recipeId: number;
}

const Ingredient = ({ recipeId }: IngredientProps) => {
  const { ref, inView } = useInView();
  const { data, hasNextPage, fetchNextPage, isFetching } = useGetRecipeIngredientList({
    recipeId,
    pageNumber: 0,
  });

  const [selectedServingOption, setSelectedServingOption] = useState(SERVING_OPTIONS[0]);
  const servingNumber = parseInt(selectedServingOption.name);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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
            {data?.recipe.recipeFoods.map(
              ({ id, foodName, amount, recipeFoodUnit, cal, isChecked }) => (
                <div key={id} className="flex justify-between">
                  <div>
                    {foodName} | {amount * servingNumber}
                    {recipeFoodUnit} ({cal * servingNumber})kcal
                  </div>
                  <ShoppingButton
                    foodId={id}
                    amount={amount}
                    foodUnit={recipeFoodUnit}
                    isChecked={isChecked}
                  />
                </div>
              ),
            )}

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
