import { useMutation } from '@tanstack/react-query';

import { addShoppingList, removeShoppingList } from '@/apis/shopping.api';
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
