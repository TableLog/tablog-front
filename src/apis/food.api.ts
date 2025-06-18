import { FOOD_URL } from '@/constants/endpoint.constants';
import { ISearchFoodParams, ISearchFoodResponse } from '@/types/api';
import instance from '@/utils/axios';

export const searchFood = async (params: ISearchFoodParams) => {
  try {
    return await instance.get<ISearchFoodResponse>(FOOD_URL, { params });
  } catch (error) {
    throw error;
  }
};
