import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  addRecipe,
  deleteRecipe,
  getRecipeDetail,
  getRecipeIngredient,
  getSortedRecipeList,
  updateRecipe,
} from '@/apis/recipe.api';
import {
  RECIPE_DETAIL_QUERY_KEY,
  RECIPE_INGREDIENT_QUERY_KEY,
  RECIPE_LIST_QUERY_KEY,
} from '@/constants/query-key.constants';
import {
  IDeleteRecipeParams,
  IGetRecipeParams,
  IMutationOptions,
  IRecipeDetailParams,
  IRecipeIngredientParams,
  IUpdateRecipeParams,
} from '@/types/api';

export function useAddRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (formData: FormData) => addRecipe(formData),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useUpdateRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ recipeId, ...formData }: IUpdateRecipeParams & FormData) =>
      updateRecipe(formData, { recipeId }),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useDeleteRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ recipeId }: IDeleteRecipeParams) => deleteRecipe({ recipeId }),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

interface GetSortedRecipeOption {
  sortOption: string;
}

export const useGetSortedRecipe = (
  params: IGetRecipeParams,
  { sortOption }: GetSortedRecipeOption,
) => {
  return useInfiniteQuery({
    queryKey: [RECIPE_LIST_QUERY_KEY],
    queryFn: async ({ pageParam }) => await getSortedRecipeList(params, sortOption, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
  });
};

export const useGetRecipeDetail = (params: IRecipeDetailParams) => {
  const { recipeId } = params;
  return useQuery({
    queryKey: [RECIPE_DETAIL_QUERY_KEY, { recipeId }],
    queryFn: () => getRecipeDetail(params),
  });
};

export const useGetRecipeIngredient = (params: IRecipeIngredientParams) => {
  const { recipeId } = params;
  return useQuery({
    queryKey: [RECIPE_INGREDIENT_QUERY_KEY, { recipeId }],
    queryFn: () => getRecipeIngredient(params),
  });
};
