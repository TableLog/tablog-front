import { SHOPPING_URL } from '@/constants/endpoint.constants';
import { AddShoppingListPayload, RemoveShoppingListParams } from '@/types/api';
import instance from '@/utils/axios';

export const addShoppingList = async (payload: AddShoppingListPayload) => {
  try {
    return await instance.post(SHOPPING_URL, payload);
  } catch (error) {
    throw error;
  }
};

export const removeShoppingList = async ({ shoppingListId }: RemoveShoppingListParams) => {
  try {
    return await instance.delete(`${SHOPPING_URL}/${shoppingListId}`);
  } catch (error) {
    throw error;
  }
};
