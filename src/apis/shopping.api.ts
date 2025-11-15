import { SHOPPING_URL } from '@/constants/endpoint.constants';
import { AddShoppingListPayload, RemoveShoppingListParams } from '@/types/api';
import instance from '@/utils/axios';

export const addShoppingList = async (payload: AddShoppingListPayload) => {
  return await instance.post(SHOPPING_URL, payload);
};

export const removeShoppingList = async ({ shoppingListId }: RemoveShoppingListParams) => {
  return await instance.delete(`${SHOPPING_URL}/${shoppingListId}`);
};

export const getShoppingList = async (page: number) => {
  return await instance.get(SHOPPING_URL, { params: { page } });
};
