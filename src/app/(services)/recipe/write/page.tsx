'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import Tab from '@/components/atoms/tab/Tab';
import { COOK_TIME_OPTIONS, PRICE_OPTIONS } from '@/constants/options.constants';
import { RECIPE_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddRecipe } from '@/hooks/recipe.hooks';
import { zodAddRecipeForm } from '@/lib/zod/zodValidation';
import { showToast } from '@/utils/functions';

import InfoForm from './info-form';
import IngredientForm from './ingredient-form';
import RecipeForm from './recipe-form';

export type TRecipeFormValues = z.infer<typeof zodAddRecipeForm>;

const RecipeWritePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: addRecipe } = useAddRecipe({
    onSuccess: (res) => {
      if (res.status === 201) {
        router.push('/recipe');
        queryClient.invalidateQueries({ queryKey: RECIPE_LIST_QUERY_KEY });
        showToast({ message: '레시피 등록 완료!', type: 'success' });
      }
    },
  });

  const methods = useForm<TRecipeFormValues>({
    resolver: zodResolver(zodAddRecipeForm),
    mode: 'onChange',
    defaultValues: {
      recipeCreateRequestDto: {
        title: '',
        intro: '',
        recipeCategoryList: [],
        price: PRICE_OPTIONS[0].name,
        cookingTime: COOK_TIME_OPTIONS[0].name,
        isPaid: false,
      },
      recipeImage: [],
      recipeFoodCreateRequestDto: [],
      dtos: [{ rpTitle: '', description: '', files: [] }],
    },
  });
  const { handleSubmit } = methods;

  function onSubmit(data: TRecipeFormValues) {
    const { recipeImage, recipeCreateRequestDto, recipeFoodCreateRequestDto, dtos } = data;

    const formdata = new FormData();

    if (recipeImage[0]) formdata.append(`recipeImage`, recipeImage[0]);
    formdata.append('recipeCreateRequestDto', JSON.stringify(recipeCreateRequestDto));
    formdata.append('recipeFoodCreateRequestDto', JSON.stringify(recipeFoodCreateRequestDto));
    dtos.forEach((step, idx) => {
      formdata.append(`dtos[${idx}].sequence`, String(idx));
      formdata.append(`dtos[${idx}].rpTitle`, step.rpTitle);
      formdata.append(`dtos[${idx}].description`, step.description);
      step.files?.forEach((file: File) => formdata.append(`dtos[${idx}].files`, file));
    });

    addRecipe(formdata);
  }

  return (
    <div className="relative mb-4 px-5 py-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tab>
            <Tab.Buttons className="mb-4" tabs={['레시피 정보', '재료 등록', '조리 방법']} />

            <Tab.Panel index={0}>
              <InfoForm />
            </Tab.Panel>
            <Tab.Panel index={1}>
              <IngredientForm />
            </Tab.Panel>
            <Tab.Panel index={2}>
              <RecipeForm />
            </Tab.Panel>
          </Tab>
        </form>
      </FormProvider>
    </div>
  );
};

export default RecipeWritePage;
