import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { zodResolver } from '@hookform/resolvers/zod';

import AutoComplete from '@/components/atoms/input/AutoComplete';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import { Text } from '@/components/atoms/text/Text';
import { useSearchFood } from '@/hooks/food.hooks';
import { zodSearchRecipeByFood } from '@/lib/zod/zodValidation';

interface IFoodsSearchProps {
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
}

const FoodsSearch = ({ keywords, setKeywords }: IFoodsSearchProps) => {
  const { ref, inView } = useInView();

  const {
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSearchRecipeByFood),
    mode: 'onChange',
    defaultValues: {
      keyword: '',
    },
  });

  const {
    data: foodList,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useSearchFood({
    keyword: '',
    page: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const list = foodList?.foods.map((food) => ({ id: food.id, title: food.foodName }));

  return (
    <form>
      <AutoComplete
        list={list || []}
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
          if (keywords.includes(keyword)) {
            setError('keyword', { message: '이미 필터된 재료입니다.' });
            return;
          }

          reset();

          setKeywords((prev) => [...prev, keyword]);
        }}
        title
      />

      {errors?.keyword && (
        <div className="validator-hint ml-4 mt-0 whitespace-pre-line">
          <Text color="red01" fontSize={14}>
            {errors['keyword'].message}
          </Text>
        </div>
      )}
    </form>
  );
};

export default FoodsSearch;
