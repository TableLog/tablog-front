'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Tabs from '@/components/atoms/tabs/Tabs';
import { zodRecipeForm } from '@/lib/zod/zodValidation';

import InfoForm from './info-form';
import IngredientForm from './ingredient-form';
import RecipeForm from './recipe-form';

export type TRecipeFormValues = z.infer<typeof zodRecipeForm>;

const RecipeWritePage = () => {
  const tabs = [
    { id: 'info', label: '레시피 정보' },
    { id: 'ingredients', label: '재료 등록' },
    { id: 'recipe', label: '조리 방법' },
  ];

  const methods = useForm<TRecipeFormValues>({
    resolver: zodResolver(zodRecipeForm),
    mode: 'onChange',
    defaultValues: {
      recipeCreateRequestDto: {
        title: '',
        intro: '',
        recipeCategoryList: [],
        price: '0',
        cookingTime: '0',
        isPaid: false,
      },
      recipeImage: undefined,
      recipeFoodCreateRequestDto: [],
      rpDtos: { dtos: [] },
    },
  });
  const { handleSubmit } = methods;

  function onSubmit(data: TRecipeFormValues) {
    const {
      rpDtos: { dtos },
    } = data;

    console.log('submit', {
      ...data,
      rpDtos: { dtos: dtos.map((recipe, idx) => ({ ...recipe, sequence: idx })) },
    });
  }

  return (
    <div className="mb-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs tabs={tabs}>
            <InfoForm id={tabs[0].id} />
            <IngredientForm id={tabs[1].id} />
            <RecipeForm id={tabs[2].id} />
          </Tabs>
        </form>
      </FormProvider>
    </div>
  );
};

export default RecipeWritePage;
