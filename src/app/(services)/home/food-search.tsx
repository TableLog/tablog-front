import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AutoComplete from '@/components/atoms/input/AutoComplete';
import { Text } from '@/components/atoms/text/Text';
import InfiniteScroll from '@/components/organisms/infinite-scroll/InfiniteScroll';
import { useSearchFood } from '@/hooks/queries/food.hooks';
import { zodSearchRecipeByFood } from '@/lib/zod/zodValidation';

interface IFoodsSearchProps {
  selectedFoods: string[];
  setSelectedFoods: React.Dispatch<React.SetStateAction<string[]>>;
}

const FoodsSearch = ({ selectedFoods, setSelectedFoods }: IFoodsSearchProps) => {
  const [keyword, setKeyword] = useState<string>('');

  const {
    control,
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
    search: keyword,
    page: 0,
  });

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <AutoComplete
        list={foodList?.foods.map((food) => ({ id: food.id, title: food.foodName })) ?? []}
        category="ingredientName"
        name="keyword"
        control={control}
        lastListElement={
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isFetching={isFetching}
            fetchNextPage={fetchNextPage}
          />
        }
        isFilteredBySearch={false}
        onSearch={(keyword) => {
          setKeyword(keyword);
        }}
        onSelect={(item) => {
          if (selectedFoods.includes(item.title)) {
            return;
          }
          reset();
          setSelectedFoods((prev) => [...prev, item.title]);
        }}
        title
      />

      {errors?.keyword?.message && (
        <div className="validator-hint ml-4 mt-0 whitespace-pre-line">
          <Text color="red01" fontSize={14}>
            {errors.keyword.message}
          </Text>
        </div>
      )}
    </form>
  );
};

export default FoodsSearch;
