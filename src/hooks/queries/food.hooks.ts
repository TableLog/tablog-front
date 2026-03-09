import { useInfiniteQuery } from '@tanstack/react-query';

import { searchFood } from '@/apis/food.api';
import { FOOD_QUERY_KEY } from '@/constants/query-key.constants';
import { ISearchFoodParams } from '@/types/api';

export function useSearchFood(params: ISearchFoodParams) {
  return useInfiniteQuery({
    queryKey: FOOD_QUERY_KEY.SEARCH_WITH_PARAMS(params),
    queryFn: async ({ pageParam }) => await searchFood({ ...params, cursor: pageParam }),
    initialPageParam: params.cursor,
    getNextPageParam: (lastPage) => (lastPage.data.hasNext ? lastPage.data.nextCursor : undefined),
    select: (response) => {
      return {
        foods: response.pages.flatMap((page) => page.data.foods),
      };
    },
  });
}
