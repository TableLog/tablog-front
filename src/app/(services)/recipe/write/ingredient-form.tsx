'use client';
import { useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import AutoComplete from '@/components/atoms/input/AutoComplete';
import SelectBox from '@/components/atoms/input/SelectBox';
import TextInput from '@/components/atoms/input/TextInput';
import { Text } from '@/components/atoms/text/Text';
import BottomSheet from '@/components/organisms/bottom-sheet/BottomSheet';
import { UNIT_OPTIONS } from '@/constants/options.constants';
import { zodIngredientInfo } from '@/lib/zod/zodValidation';

import { TRecipeFormValues } from './page';

const IngredientForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const foodList = [
    { id: 1, title: '콩' },
    { id: 2, title: '콩떡' },
    { id: 3, title: '콩나물' },
  ];

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TRecipeFormValues['recipeFoodCreateRequestDto'][number]>({
    resolver: zodResolver(zodIngredientInfo),
    mode: 'onChange',
    defaultValues: {
      amount: 0,
      foodId: 0,
      recipeFoodUnit: UNIT_OPTIONS[0].name,
    },
  });

  const {} = useFormContext<TRecipeFormValues>();

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray<TRecipeFormValues, 'recipeFoodCreateRequestDto'>({
    name: 'recipeFoodCreateRequestDto',
  });

  function openBottomSheet() {
    setIsOpen(true);
  }

  function closeBottomSheet() {
    setIsOpen(false);
  }

  function addIngredient(data: TRecipeFormValues['recipeFoodCreateRequestDto'][number]) {
    appendIngredient(data);
    closeBottomSheet();
    reset();
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Button onClick={openBottomSheet} size="large" full>
        재료 등록 +
      </Button>

      {ingredientFields.length === 0 ? (
        <div>요리에 필요한 재료를 입력해주세요.</div>
      ) : (
        <div className="flex w-full flex-col-reverse gap-8">
          {ingredientFields.map((ingredient, idx) => (
            <div key={ingredient.id} className="flex justify-between">
              <Text>
                {foodList.find(({ id }) => id === ingredient.foodId)?.title} | {ingredient.amount}{' '}
                {ingredient.recipeFoodUnit}
              </Text>
              <button
                type="button"
                onClick={() => {
                  removeIngredient(idx);
                }}
              >
                <Image width={24} height={24} src="/icons/delete.svg" alt="삭제 아이콘" />
              </button>
            </div>
          ))}
        </div>
      )}

      <BottomSheet
        isOpen={isOpen}
        onClose={closeBottomSheet}
        buttons={
          <form className="grid grid-cols-2 gap-1.5">
            <Button onClick={closeBottomSheet} size="large" full buttonColor="grey06">
              닫기
            </Button>
            <Button onClick={handleSubmit(addIngredient)} size="large" full>
              추가
            </Button>
          </form>
        }
      >
        <div className="flex flex-col gap-8 px-5">
          <div>
            <AutoComplete
              list={foodList}
              category="ingredientName"
              name="foodId"
              control={control}
            />
            {errors?.foodId && (
              <div className="validator-hint mt-0 ml-4 whitespace-pre-line">
                <Text color="red01">{errors['foodId'].message}</Text>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            <TextInput type="number" category="amount" register={register} errors={errors} />
            <SelectBox
              category="unit"
              name="recipeFoodUnit"
              list={UNIT_OPTIONS}
              control={control}
            />
            <div className="col-span-2 flex gap-1">
              <BoxIcon name="info-circle" size={20} />
              <Text fontSize={12}>1인분 기준으로 입력해주세요.</Text>
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default IngredientForm;
