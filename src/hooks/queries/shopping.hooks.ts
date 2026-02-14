import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { addShoppingList, getShoppingList, removeShoppingList } from '@/apis/shopping.api';
import { USER_QUERY_KEY } from '@/constants/query-key.constants';
import { AddShoppingListPayload, IMutationOptions, RemoveShoppingListParams } from '@/types/api';

export function useAddShoppingList(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (data: AddShoppingListPayload) => addShoppingList(data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useRemoveShoppingList(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (params: RemoveShoppingListParams) => removeShoppingList(params),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useGetShoppingList() {
  return useInfiniteQuery({
    queryKey: USER_QUERY_KEY.SHOPPING_LIST(),
    queryFn: async ({ pageParam = 0 }) => await getShoppingList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
  });
}
