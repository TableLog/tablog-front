import { RECIPE_URL } from '@/constants/endpoint.constants';
import {
  IDeleteRecipeParams,
  IGetRecipeParams,
  IRecipeDetailParams,
  IRecipeDetailResponse,
  IRecipeIngredientParams,
  IRecipeIngredientResponse,
  IRecipeListResponse,
} from '@/types/api';
import instance from '@/utils/axios';

export const addRecipe = async (formdata: FormData) => {
  try {
    return await instance.post(RECIPE_URL, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getSortedRecipeList = async (params: IGetRecipeParams, sortOption = 'latest') => {
  try {
    return await instance.get<IRecipeListResponse>(`${RECIPE_URL}/${sortOption}`, {
      params,
    });
  } catch (error) {
    throw error;
  }
};

export const getRecipeDetail = async ({ recipeId }: IRecipeDetailParams) => {
  try {
    return await instance.get<IRecipeDetailResponse>(`${RECIPE_URL}/${recipeId}`);
  } catch (error) {
    throw error;
  }
};

export const getRecipeIngredient = async ({ recipeId }: IRecipeIngredientParams) => {
  try {
    return await instance.get<IRecipeIngredientResponse>(`${RECIPE_URL}/${recipeId}/foods`);
  } catch (error) {
    throw error;
  }
};

export const updateRecipe = async (formdata: FormData, { recipeId }: IDeleteRecipeParams) => {
  try {
    return await instance.put(`${RECIPE_URL}/${recipeId}`, formdata);
  } catch (error) {
    throw error;
  }
};

export const deleteRecipe = async ({ recipeId }: IDeleteRecipeParams) => {
  try {
    return await instance.delete(`${RECIPE_URL}/${recipeId}`);
  } catch (error) {
    throw error;
  }
};
