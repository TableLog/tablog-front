'use client';

import React, { useCallback, useState } from 'react';

import { RECIPE_CATEGORY_LIST } from '@/constants/options.constants';
import { IRecipeFilterParams } from '@/types/api';
import { cn } from '@/utils/cn';

const RecipeCategory = ({
  setCondition,
}: {
  setCondition: (condition: Partial<IRecipeFilterParams> | null) => void;
}) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleClickCategory = useCallback(
    (id: number) => {
      const newSelectedCategories = selectedCategories.includes(id)
        ? selectedCategories.filter((catId) => catId !== id)
        : [...selectedCategories, id];

      setSelectedCategories(newSelectedCategories);

      const categoryTitles = newSelectedCategories.map((catId) =>
        RECIPE_CATEGORY_LIST.find((cat) => cat.id === catId)!.title.replaceAll('/', 'or'),
      );

      if (categoryTitles?.length === 0) {
        setCondition(null);
      } else {
        setCondition({
          recipeCategory: categoryTitles,
        });
      }
    },
    [selectedCategories, setCondition],
  );

  return (
    <div className="grid grid-cols-4 place-items-center gap-4 px-5">
      {RECIPE_CATEGORY_LIST.map((category) => {
        const isSelected = selectedCategories.includes(category.id);
        const selectedClass = isSelected
          ? 'bg-primary01 text-white01'
          : 'bg-transparent text-black01';

        return (
          <div
            key={category.id}
            className={cn(
              selectedClass,
              'transition-all-3 flex h-[84px] w-[54px] auto-cols-max flex-col items-center gap-1 rounded-full p-[5px]',
            )}
            onClick={() => handleClickCategory(category.id)}
          >
            <div className="bg-white01 flex aspect-square w-[44px] items-center justify-center rounded-full text-2xl">
              {category.icon}
            </div>

            <div className="text-center text-xs">{category.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeCategory;
