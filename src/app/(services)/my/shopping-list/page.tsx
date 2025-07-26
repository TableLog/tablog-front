'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { Checkbox } from '@/components/atoms/input/Checkbox';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import FoodsSearch from '@/components/molecules/foods-search/FoodsSearch';
import { UNIT_OPTIONS } from '@/constants/options.constants';
import { SHOPPING_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import {
  useAddShoppingList,
  useGetShoppingList,
  useRemoveShoppingList,
} from '@/hooks/shopping.hooks';
import { zodShoppingListForm } from '@/lib/zod/zodValidation';
import { IShoppingList } from '@/types/api';
import { cn } from '@/utils/cn';

const ShoppingListPage = () => {
  const searchRef = useRef<HTMLDivElement>(null!);
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  const [isChecked, setIsChecked] = useState<boolean[]>([false]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: shoppingList, hasNextPage, fetchNextPage, isFetching } = useGetShoppingList();

  const { mutate: removeShoppingList } = useRemoveShoppingList({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SHOPPING_LIST_QUERY_KEY] });
    },
  });

  const methods = useForm<z.infer<typeof zodShoppingListForm>>({
    resolver: zodResolver(zodShoppingListForm),
    mode: 'onChange',
    defaultValues: {
      foodUnit: UNIT_OPTIONS[0].name,
      amount: 0,
      foodId: 0,
    },
  });

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = methods;

  const { mutate: addShoppingList } = useAddShoppingList({
    onSuccess: (res) => {
      if (res.status === 201) {
        queryClient.invalidateQueries({ queryKey: [SHOPPING_LIST_QUERY_KEY] });
        queryClient.refetchQueries({ queryKey: [SHOPPING_LIST_QUERY_KEY] });
        closeBottomSheet();
        reset();
      }
    },
  });

  useEffect(() => {
    // 무한 스크롤
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleCheckboxChange = (id: number) => {
    setIsChecked((prev) => {
      const newChecked = [...prev];
      newChecked[id] = !newChecked[id];

      return newChecked;
    });
  };

  const handleRemoveShoppingList = (id: number) => {
    removeShoppingList({ shoppingListId: id });
  };

  function openBottomSheet() {
    setIsOpen(true);
  }

  function closeBottomSheet() {
    setIsOpen(false);
  }

  const onSubmit = (data: z.infer<typeof zodShoppingListForm>) => {
    addShoppingList({
      ...data,
      amount: Number(data.amount),
    });
  };

  return (
    <div>
      <PageHeader title="장보기 메모" back />

      <div className="mt-4">
        <div>
          {shoppingList?.pages?.map((page) =>
            page?.data?.shoppingLists?.map((item: IShoppingList) => {
              return (
                <div key={item.id} className="mb-3 flex w-full items-center justify-between">
                  <Checkbox
                    label={
                      <div className="relative flex w-full items-center gap-4">
                        <div
                          className={cn(
                            isChecked[item.id] ? 'w-full' : 'w-0',
                            'absolute left-0 top-1/2 h-[1px] bg-black/50 transition-all duration-300',
                          )}
                        />

                        <div>{item.foodName}</div>

                        <div>
                          {item.amount}
                          {item.foodUnit}
                        </div>
                      </div>
                    }
                    value={isChecked[item.id]}
                    onChange={() => handleCheckboxChange(item.id)}
                  />

                  <div
                    className="h-[24px] cursor-pointer"
                    onClick={() => handleRemoveShoppingList(item.id)}
                  >
                    <BoxIcon name="x" size={24} color="grey04" />
                  </div>
                </div>
              );
            }),
          )}
        </div>

        {isFetching && (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}

        <div ref={ref as React.RefCallback<HTMLDivElement>} />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} id="shopping-list-form">
          <div className="fixed bottom-5 left-4 right-4 mt-6">
            <Button onClick={openBottomSheet} size="large" full type="button">
              재료 등록 +
            </Button>
          </div>

          <FoodsSearch
            isOpen={isOpen}
            closeBottomSheet={closeBottomSheet}
            register={register}
            control={control}
            errors={errors}
            searchRef={searchRef}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default ShoppingListPage;
