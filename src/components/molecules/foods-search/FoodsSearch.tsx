import React, { useState } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/atoms/button/Button';
import AutoComplete from '@/components/atoms/input/AutoComplete';
import SelectBox from '@/components/atoms/input/SelectBox';
import TextInput from '@/components/atoms/input/TextInput';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { Text } from '@/components/atoms/text/Text';
import BottomSheet from '@/components/organisms/bottom-sheet/BottomSheet';
import { UNIT_OPTIONS } from '@/constants/options.constants';
import { useSearchFood } from '@/hooks/food.hooks';
import { zodShoppingListForm } from '@/lib/zod/zodValidation';

interface IFoodsSearchProps {
  isOpen: boolean;
  closeBottomSheet: () => void;
  register: UseFormRegister<z.infer<typeof zodShoppingListForm>>;
  control: Control<z.infer<typeof zodShoppingListForm>>;
  errors: FieldErrors<z.infer<typeof zodShoppingListForm>>;
  searchRef: React.RefObject<HTMLDivElement> | null;
}

const FoodsSearch = ({
  isOpen,
  closeBottomSheet,
  register,
  control,
  errors,
  searchRef,
}: IFoodsSearchProps) => {
  const [keyword, setKeyword] = useState('');

  const { data, isFetching } = useSearchFood({
    search: keyword,
    page: 0,
  });

  const foodList = data?.foods.map((food) => ({ id: food.id, title: food.foodName }));

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={closeBottomSheet}
      buttons={
        <div className="grid grid-cols-2 gap-1.5">
          <Button onClick={closeBottomSheet} size="large" full buttonColor="grey06">
            닫기
          </Button>
          <Button type="submit" size="large" full form="shopping-list-form">
            추가
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-8 px-5">
        <div>
          <AutoComplete
            list={foodList || []}
            category="ingredientName"
            name="foodId"
            control={control}
            lastListElement={
              <>
                {isFetching && (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner />
                  </div>
                )}

                <div ref={searchRef} />
              </>
            }
            isFilteredBySearch={false}
            onSearch={(keyword) => {
              setKeyword(keyword);
            }}
          />

          {errors?.foodId && (
            <div className="validator-hint ml-4 mt-0 whitespace-pre-line">
              <Text color="red01">{errors['foodId'].message}</Text>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          <TextInput type="number" category="amount" register={register} errors={errors} />

          <SelectBox category="unit" name="foodUnit" list={UNIT_OPTIONS} control={control} />
        </div>
      </div>
    </BottomSheet>
  );
};

export default FoodsSearch;
