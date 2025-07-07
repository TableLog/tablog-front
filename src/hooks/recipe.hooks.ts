import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

// 레시피 구매
import {
  addBookmarkRecipe,
  addLikeRecipe,
  addRecipe,
  addRecipeMemo,
  addRecipeReview,
  addRecipeReviewReply,
  cancelBookmarkRecipe,
  cancelLikeRecipe,
  deleteRecipe,
  getMySortedRecipeList,
  getRecipeBookmark,
  getRecipeByFilter,
  getRecipeByFood,
  getRecipeDetail,
  getRecipeIngredientList,
  getRecipeLike,
  getRecipeMemo,
  getRecipeProcessBySequence,
  getRecipeProcessList,
  getRecipeReviews,
  getSortedRecipeList,
  payRecipe,
  updateRecipe,
  updateRecipeMemo,
} from '@/apis/recipe.api';
import {
  RECIPE_BOOKMARK_QUERY_KEY,
  RECIPE_DETAIL_QUERY_KEY,
  RECIPE_INGREDIENT_LIST_QUERY_KEY_WITH_PARAMS,
  RECIPE_LIKE_QUERY_KEY,
  RECIPE_LIST_BY_FILTER_QUERY_KEY,
  RECIPE_LIST_BY_FOOD_QUERY_KEY,
  RECIPE_LIST_OPTIONS_QUERY_KEY,
  RECIPE_MEMO_QUERY_KEY,
  RECIPE_PROCESS_LIST_QUERY_KEY_WITH_PARAMS,
  RECIPE_PROCESS_QUERY_KEY_WITH_PARAMS,
  RECIPE_REVIEW_LIST_QUERY_KEY_WITH_PARAMS,
} from '@/constants/query-key.constants';
import {
  IAddBookmarkRecipeParams,
  IAddLikeRecipeParams,
  IAddRecipeReviewParams,
  IAddRecipeReviewReplyParams,
  ICancelBookmarkRecipeParams,
  ICancelLikeRecipeParams,
  IDeleteRecipeParams,
  IGetRecipeLikeParams,
  IGetRecipeMemoParams,
  IGetRecipeParams,
  IGetRecipeReviewsParams,
  IGetSortedRecipeOption,
  IMutateRecipeMemoParams,
  IMutationOptions,
  IRecipeDetailParams,
  IRecipeFilterParams,
  IRecipeIngredientParams,
  IRecipeProcessBySequenceParams,
  IRecipeProcessListParams,
  IUpdateRecipeParams,
  PayRecipeParams,
} from '@/types/api';

// 레시피 CRUD
export function useAddRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (formData: FormData) => addRecipe(formData),
    ...options,
  });
}

export function useUpdateRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ recipeId, ...formData }: IUpdateRecipeParams & FormData) =>
      updateRecipe(formData, { recipeId }),
    ...options,
  });
}

export function useDeleteRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ recipeId }: IDeleteRecipeParams) => deleteRecipe({ recipeId }),
    ...options,
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
export const useGetRecipeIngredientList = (params: IRecipeIngredientParams) => {
  return useInfiniteQuery({
    queryKey: RECIPE_INGREDIENT_LIST_QUERY_KEY_WITH_PARAMS(params),
    queryFn: () => getRecipeIngredientList(params),
    initialPageParam: params.pageNumber,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({
      recipe: {
        title: response.pages[0].data.title,
        hasNext: response.pages[0].data.hasNext,
        imageUrl: response.pages[0].data.imageUrl,
        recipeFoods: response.pages.flatMap((page) => page.data.recipeFoods),
      },
    }),
  });
};

// 레시피 조리 과정
export const useGetRecipeProcesses = (params: IRecipeProcessListParams) => {
  return useInfiniteQuery({
    queryKey: RECIPE_PROCESS_LIST_QUERY_KEY_WITH_PARAMS(params),
    queryFn: () => getRecipeProcessList(params),
    initialPageParam: params.page,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({
      data: response.pages.flatMap((page) =>
        page.data.recipeProcesses.map((data) => data.recipeProcesses),
      ),
    }),
  });
};

export const useGetRecipeProcessBySequence = (params: IRecipeProcessBySequenceParams) => {
  return useQuery({
    queryKey: RECIPE_PROCESS_QUERY_KEY_WITH_PARAMS(params),
    queryFn: () => getRecipeProcessBySequence(params),
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
    ...options,
  });
}

export function useCancelLikeRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ recipeId }: ICancelLikeRecipeParams) => cancelLikeRecipe({ recipeId }),
    ...options,
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
    ...options,
  });
}

export function useCancelBookmarkRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ recipeId }: ICancelBookmarkRecipeParams) => cancelBookmarkRecipe({ recipeId }),
    ...options,
  });
}

// 레시피 필터
export const useGetRecipeByFilter = (condition: Partial<IRecipeFilterParams> | null) => {
  return useInfiniteQuery({
    queryKey: [RECIPE_LIST_BY_FILTER_QUERY_KEY, condition],
    queryFn: ({ pageParam = 0 }) => getRecipeByFilter({ condition, pageNumber: pageParam }),
    initialPageParam: 0,
    enabled: !!condition,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({
      recipes: response.pages.flatMap((page) => page.data.contents),
    }),
  });
};

export const useGetRecipeByFood = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: [RECIPE_LIST_BY_FOOD_QUERY_KEY, keyword],
    queryFn: ({ pageParam = 0 }) => getRecipeByFood({ keyword, pageNumber: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({
      recipes: response.pages.flatMap((page) => page.data.contents),
    }),
  });
};

export function usePayRecipe(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ recipeId }: PayRecipeParams) => payRecipe({ recipeId }),
    ...options,
  });
}

// 레시피 리뷰
export const useGetReviews = (params: IGetRecipeReviewsParams) => {
  return useInfiniteQuery({
    queryKey: RECIPE_REVIEW_LIST_QUERY_KEY_WITH_PARAMS(params),
    queryFn: () => getRecipeReviews(params),
    initialPageParam: params.pageNumber,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({ reviews: response.pages.flatMap((page) => page.data.contents) }),
  });
};

export function useAddReview(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (params: IAddRecipeReviewParams) => addRecipeReview(params),
    ...options,
  });
}

export function useAddReviewReply(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (params: IAddRecipeReviewReplyParams) => addRecipeReviewReply(params),
    ...options,
  });
}

// 레시피 메모
export function useAddRecipeMemo(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (params: IMutateRecipeMemoParams) => addRecipeMemo(params),
    ...options,
  });
}

export function useUpdateRecipeMemo(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (params: IMutateRecipeMemoParams) => updateRecipeMemo(params),
    ...options,
  });
}

export function useGetRecipeMemo({ recipeId }: IGetRecipeMemoParams) {
  return useQuery({
    queryKey: RECIPE_MEMO_QUERY_KEY(recipeId),
    queryFn: () => getRecipeMemo({ recipeId }),
  });
}
