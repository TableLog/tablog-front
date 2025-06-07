'use client';
import { ComponentProps } from 'react';
import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';

import { Text } from '@/components/atoms/text/Text';
import { cn } from '@/utils/cn';

type CategoryType = string;

interface CategoryTagProps<T extends FieldValues> extends ComponentProps<'div'> {
  control: Control<T>;
  name: Path<T>;
}

const CategoryTag = <T extends FieldValues>({
  className,
  name,
  control,
  ...props
}: CategoryTagProps<T>) => {
  const categories = ['밥요리', '면요리', '밑반찬', '국/찌개', '아침', '점심', '저녁', '간식/후식'];

  const {
    field: { value: selectedCategories, onChange },
  } = useController({
    name,
    control,
  });

  function handleCategoryClick(category: CategoryType) {
    const isIncluded = selectedCategories.includes(category);

    const updated = isIncluded
      ? selectedCategories.filter((c: PathValue<T, Path<T>>) => c !== category)
      : [...selectedCategories, category];

    onChange(updated);
  }

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <Text fontSize={14} fontWeight="semiBold" color="black03">
        카테고리 (중복 선택 가능)
      </Text>
      <div className="flex flex-wrap gap-1.5">
        {categories.map((category) => {
          const isIncludedCategory = selectedCategories.includes(category);
          return (
            <button
              key={`category-${category}`}
              type="button"
              className={cn(
                'rounded-full px-2.5 py-1',
                isIncludedCategory ? 'bg-primary02' : 'bg-grey07',
              )}
              onClick={() => handleCategoryClick(category)}
            >
              <Text
                fontSize={14}
                fontWeight={isIncludedCategory ? 'medium' : 'regular'}
                className={isIncludedCategory ? 'text-white01' : 'text-black01'}
              >
                {category}
              </Text>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTag;
