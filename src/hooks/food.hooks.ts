import { useInfiniteQuery } from '@tanstack/react-query';

import { searchFood } from '@/apis/food.api';
import { FOOD_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { ISearchFoodParams } from '@/types/api';

export function useSearchFood(params: ISearchFoodParams) {
  return useInfiniteQuery({
    queryKey: [FOOD_LIST_QUERY_KEY, { keyword: params.keyword }],
    queryFn: async ({ pageParam }) => await searchFood({ ...params, page: pageParam }),
    initialPageParam: params.page,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => {
      return {
        foods: response.pages.flatMap((page) => page.data.foods),
      };
    },
  });
}
