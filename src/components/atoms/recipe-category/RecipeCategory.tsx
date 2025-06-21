'use client';

import React, { useCallback, useState } from 'react';

import { cn } from '@/utils/cn';

const RecipeCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const RECIPE_CATEGORY_LIST = [
    { id: 1, title: '밥요리', icon: '🍚' },
    { id: 2, title: '면요리', icon: '🍜' },
    { id: 3, title: '밑반찬', icon: '🍳' },
    { id: 4, title: '국/찌개', icon: '🥘' },
    { id: 5, title: '아침', icon: '🥞' },
    { id: 6, title: '점심', icon: '🌮' },
    { id: 7, title: '저녁', icon: '🍲' },
    { id: 8, title: '간식/후식', icon: '🍰' },
  ];

  const handleClickCategory = useCallback((id: number) => {
    setSelectedCategory((prev) => (prev === null ? id : null));
  }, []);

  return (
    <div className="grid grid-cols-4 place-items-center gap-4">
      {RECIPE_CATEGORY_LIST.map((category) => {
        const selectedClass =
          selectedCategory === category.id
            ? 'bg-primary01 text-white01'
            : 'bg-transparent text-black01';

        return (
          <div
            key={category.id}
            className={cn(
              selectedClass,
              'transition-all-3 flex h-[84px] w-[54px] auto-cols-max flex-col items-center gap-1.5 rounded-full p-[5px]',
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
