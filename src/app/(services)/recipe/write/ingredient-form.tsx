'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

interface TIngredientValues {
  ingredientName: string;
  quantity: string;
  unit: string;
}

const IngredientForm = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<(TIngredientValues & { id: string })[]>([]);
  const [unit, setUnit] = useState<string>(UNIT_OPTIONS[0].title);

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Omit<TIngredientValues, 'unit'>>({
    resolver: zodResolver(zodIngredientInfo),
    mode: 'onChange',
    defaultValues: {
      ingredientName: '',
      quantity: '',
    },
  });

  function openBottomSheet() {
    setIsOpen(true);
  }

  function closeBottomSheet() {
    setIsOpen(false);
  }

  function addIngredient(value: Omit<TIngredientValues, 'unit'>) {
    setIngredients((prev) => [...prev, { id: crypto.randomUUID(), ...value, unit }]);
    reset();
    setUnit(UNIT_OPTIONS[0].title);
  }

  function deleteIngredient(ingredientId: string) {
    setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== ingredientId));
  }

  return (
    <form
      id={id}
      className="flex flex-col items-center gap-8"
      onSubmit={handleSubmit(addIngredient)}
    >
      <Button onClick={openBottomSheet} size="large" full>
        재료 등록 +
      </Button>

      {ingredients.length === 0 ? (
        <div>요리에 필요한 재료를 입력해주세요.</div>
      ) : (
        ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex w-full justify-between">
            <Text>
              {ingredient.ingredientName} | {ingredient.quantity}
              {ingredient.unit}
            </Text>
            <button
              type="button"
              onClick={() => {
                deleteIngredient(ingredient.id);
              }}
            >
              <Image width={24} height={24} src="/icons/delete.svg" alt="삭제 아이콘" />
            </button>
          </div>
        ))
      )}

      <BottomSheet
        isOpen={isOpen}
        onClose={closeBottomSheet}
        buttons={
          <form className="grid grid-cols-2 gap-1.5">
            <Button onClick={closeBottomSheet} size="large" full buttonColor="grey06">
              닫기
            </Button>
            <Button type="submit" onClick={openBottomSheet} size="large" full>
              추가
            </Button>
          </form>
        }
      >
        <div className="flex flex-col gap-8 px-5">
          <AutoComplete
            list={[
              { id: 1, title: '콩' },
              { id: 2, title: '콩떡' },
              { id: 3, title: '콩나물' },
            ]}
            category="ingredientName"
            register={register}
          />
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-1">
            <TextInput type="number" category="quantity" register={register} errors={errors} />
            <SelectBox category="unit" list={UNIT_OPTIONS} value={unit} setValue={setUnit} />
            <div className="col-span-2 flex gap-1">
              <BoxIcon name="info-circle" size={20} />
              <Text fontSize={12}>1인분 기준으로 입력해주세요.</Text>
            </div>
          </div>
        </div>
      </BottomSheet>
    </form>
  );
};

export default IngredientForm;
