'use client';
import { z } from 'zod';

import Tab from '@/components/atoms/tab/Tab';
import { zodAddRecipeForm } from '@/lib/zod/zodValidation';

import Forms from './forms';

export type TRecipeFormValues = z.infer<typeof zodAddRecipeForm>;

const RecipeWritePage = () => {
  return (
    <Tab>
      <Forms />
    </Tab>
  );
};

export default RecipeWritePage;
