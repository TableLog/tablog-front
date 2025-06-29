import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { zodResolver } from '@hookform/resolvers/zod';

import AutoComplete from '@/components/atoms/input/AutoComplete';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { Text } from '@/components/atoms/text/Text';
import { useGetRecipeByFood } from '@/hooks/recipe.hooks';
import { zodSearchRecipeByFood } from '@/lib/zod/zodValidation';

const FilterRecipesFood = () => {
  const { ref, inView } = useInView();

  const [keyword, setKeyword] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSearchRecipeByFood),
    mode: 'onChange',
    defaultValues: {
      keyword: '',
    },
  });

  const { data: recipeList, isFetching, hasNextPage, fetchNextPage } = useGetRecipeByFood(keyword);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const onSubmit = useCallback(
    (data: { keyword: string }) => {
      setKeyword(data.keyword);
    },
    [setKeyword],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-5">
      <AutoComplete
        list={recipeList?.recipes ?? []}
        category="ingredientName"
        name="keyword"
        control={control}
        lastListElement={
          <>
            {isFetching && (
              <div className="flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}

            <div ref={ref} />
          </>
        }
        isFilteredBySearch={false}
        onSearch={(keyword) => {
          setKeyword(keyword);
        }}
      />

      {errors?.keyword && (
        <div className="validator-hint mt-0 ml-4 whitespace-pre-line">
          <Text color="red01">{errors['keyword'].message}</Text>
        </div>
      )}
    </form>
  );
};

export default FilterRecipesFood;
