import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  addBookmarkRecipe,
  addLikeRecipe,
  addRecipe,
  cancelBookmarkRecipe,
  cancelLikeRecipe,
  deleteRecipe,
  getMySortedRecipeList,
  getRecipeBookmark,
  getRecipeDetail,
  getRecipeIngredient,
  getRecipeLike,
  getSortedRecipeList,
  updateRecipe,
} from '@/apis/recipe.api';
import {
  RECIPE_BOOKMARK_QUERY_KEY,
  RECIPE_DETAIL_QUERY_KEY,
  RECIPE_INGREDIENT_QUERY_KEY,
  RECIPE_LIKE_QUERY_KEY,
  RECIPE_LIST_OPTIONS_QUERY_KEY,
} from '@/constants/query-key.constants';
import {
  IAddBookmarkRecipeParams,
  IAddLikeRecipeParams,
  ICancelBookmarkRecipeParams,
  ICancelLikeRecipeParams,
  IDeleteRecipeParams,
  IGetRecipeLikeParams,
  IGetRecipeParams,
  IGetSortedRecipeOption,
  IMutationOptions,
  IRecipeDetailParams,
  IRecipeIngredientParams,
  IUpdateRecipeParams,
} from '@/types/api';

// 레시피 CRUD
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

export const useGetSortedRecipe = (
  params: IGetRecipeParams,
  option: IGetSortedRecipeOption & { isMine: boolean },
) => {
  const { isMine, ...sortOptions } = option;
  return useInfiniteQuery({
    queryKey: RECIPE_LIST_OPTIONS_QUERY_KEY(params, option),
    queryFn: async ({ pageParam }) =>
      isMine
        ? await getMySortedRecipeList({ ...params, pageNumber: pageParam }, sortOptions)
        : await getSortedRecipeList({ ...params, pageNumber: pageParam }, sortOptions),
    initialPageParam: params.pageNumber,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({ recipes: response.pages.flatMap((page) => page.data.contents) }),
  });
};

export const useGetRecipeDetail = (params: IRecipeDetailParams) => {
  const { recipeId } = params;
  return useQuery({
    queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId),
    queryFn: () => getRecipeDetail(params),
  });
};

// 레시피 재료
export const useGetRecipeIngredient = (params: IRecipeIngredientParams) => {
  const { recipeId } = params;
  return useQuery({
    queryKey: RECIPE_INGREDIENT_QUERY_KEY(recipeId),
    queryFn: () => getRecipeIngredient(params),
  });
};

// 레시피 좋아요
export function useGetRecipeLike(params: IGetRecipeLikeParams) {
  const { recipeId } = params;
  return useQuery({
    queryKey: RECIPE_LIKE_QUERY_KEY(recipeId),
    queryFn: () => getRecipeLike(params),
  });
}

export function useAddLikeRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ recipeId }: IAddLikeRecipeParams) => addLikeRecipe({ recipeId }),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useCancelLikeRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ recipeId }: ICancelLikeRecipeParams) => cancelLikeRecipe({ recipeId }),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// 레시피 북마크
export function useGetRecipeBookmark(params: IGetRecipeLikeParams) {
  const { recipeId } = params;
  return useQuery({
    queryKey: RECIPE_BOOKMARK_QUERY_KEY(recipeId),
    queryFn: () => getRecipeBookmark(params),
  });
}

export function useAddBookmarkRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ recipeId }: IAddBookmarkRecipeParams) => addBookmarkRecipe({ recipeId }),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useCancelBookmarkRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ recipeId }: ICancelBookmarkRecipeParams) => cancelBookmarkRecipe({ recipeId }),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
