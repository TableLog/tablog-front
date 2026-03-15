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
  deleteRecipeReview,
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
  getRecipeReviewDetail,
  getRecipeReviews,
  getRecipeSearch,
  getSortedRecipeList,
  payRecipe,
  updateRecipe,
  updateRecipeMemo,
} from '@/apis/recipe.api';
import { RECIPE_QUERY_KEY } from '@/constants/query-key.constants';
import {
  IAddBookmarkRecipeParams,
  IAddLikeRecipeParams,
  IAddRecipeReviewParams,
  IAddRecipeReviewReplyParams,
  ICancelBookmarkRecipeParams,
  ICancelLikeRecipeParams,
  IDeleteRecipeParams,
  IDeleteRecipeReviewParams,
  IGetRecipeLikeParams,
  IGetRecipeMemoParams,
  IGetRecipeParams,
  IGetRecipeReviewDetailParams,
  IGetRecipeReviewsParams,
  IGetRecipeSearchParams,
  IGetSortedRecipeOption,
  IMutateRecipeMemoParams,
  IMutationOptions,
  IQueryOptions,
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
    mutationFn: ({ recipeId, formData }: IUpdateRecipeParams & { formData: FormData }) =>
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
    queryKey: RECIPE_QUERY_KEY.LIST_WITH_PARAMS(params, option),
    queryFn: async ({ pageParam }) =>
      isMine
        ? await getMySortedRecipeList({ ...params, page: pageParam }, sortOptions)
        : await getSortedRecipeList({ ...params, page: pageParam }, sortOptions),
    initialPageParam: params.page,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({ recipes: response.pages.flatMap((page) => page.data.contents) }),
  });
};

export const useGetRecipeDetail = (params: IRecipeDetailParams, options?: IQueryOptions) => {
  const { recipeId } = params;
  return useQuery({
    queryKey: RECIPE_QUERY_KEY.DETAIL(recipeId),
    queryFn: () => getRecipeDetail(params),
    ...options,
    enabled: !!params.recipeId,
  });
};

// 레시피 재료
export const useGetRecipeIngredientList = (
  params: IRecipeIngredientParams,
  options?: IQueryOptions,
) => {
  return useInfiniteQuery({
    queryKey: RECIPE_QUERY_KEY.INGREDIENT_LIST_WITH_PARAMS(params),
    queryFn: ({ pageParam }) => {
      return getRecipeIngredientList({ ...params, page: pageParam });
    },
    initialPageParam: params.page,
    getNextPageParam: (lastPage, _, pageParam) => {
      return lastPage.data.hasNext ? pageParam + 1 : undefined;
    },
    select: (response) => ({
      recipe: {
        title: response.pages[0].data.title,
        hasNext: response.pages[0].data.hasNext,
        imageUrl: response.pages[0].data.imageUrl,
        recipeFoods: response.pages.flatMap((page) => page.data.recipeFoods),
      },
    }),
    ...options,
  });
};

// 레시피 조리 과정
export const useGetRecipeProcesses = (params: IRecipeProcessListParams) => {
  return useInfiniteQuery({
    queryKey: RECIPE_QUERY_KEY.PROCESS_LIST_WITH_PARAMS(params),
    queryFn: ({ pageParam }) => getRecipeProcessList({ ...params, page: pageParam }),
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
    queryKey: RECIPE_QUERY_KEY.PROCESS_WITH_PARAMS(params),
    queryFn: () => getRecipeProcessBySequence(params),
  });
};

// 레시피 좋아요
export function useGetRecipeLike(params: IGetRecipeLikeParams, options?: IQueryOptions) {
  const { recipeId } = params;
  return useQuery({
    queryKey: RECIPE_QUERY_KEY.LIKE(recipeId),
    queryFn: () => getRecipeLike(params),
    ...options,
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
export function useGetRecipeBookmark(params: IGetRecipeLikeParams, options?: IQueryOptions) {
  const { recipeId } = params;
  return useQuery({
    queryKey: RECIPE_QUERY_KEY.BOOKMARK(recipeId),
    queryFn: () => getRecipeBookmark(params),
    ...options,
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
export const useGetRecipeByFilter = (filterCondition: Partial<IRecipeFilterParams> | null) => {
  return useInfiniteQuery({
    queryKey: RECIPE_QUERY_KEY.LIST_BY_FILTER(filterCondition),
    queryFn: ({ pageParam }) => getRecipeByFilter({ condition: filterCondition, page: pageParam }),
    initialPageParam: 0,
    enabled: !!filterCondition,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({
      recipes: response.pages.flatMap((page) => page.data.contents),
    }),
  });
};

export const useGetRecipeByFood = (keywords: string[]) => {
  return useInfiniteQuery({
    queryKey: RECIPE_QUERY_KEY.LIST_BY_FOOD(keywords),
    queryFn: ({ pageParam }) => getRecipeByFood({ keywords, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({
      recipes: response.pages.flatMap((page) => page.data.contents),
    }),
    enabled: keywords.length > 0,
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
    queryKey: RECIPE_QUERY_KEY.REVIEW_LIST_WITH_PARAMS(params),
    queryFn: ({ pageParam }) => getRecipeReviews({ ...params, page: pageParam }),
    initialPageParam: params.page,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({
      reviews: response.pages.flatMap((page) => page.data.contents),
      isWriter: response.pages[0].data.isWriter,
    }),
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

export function useGetRecipeReviewDetail(params: IGetRecipeReviewDetailParams) {
  return useQuery({
    queryKey: RECIPE_QUERY_KEY.REVIEW_DETAIL(params),
    queryFn: () => getRecipeReviewDetail(params),
    select: (data) => data.data,
  });
}

export function useDeleteRecipeReview(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (params: IDeleteRecipeReviewParams) => deleteRecipeReview(params),
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

export function useGetRecipeMemo({ recipeId }: IGetRecipeMemoParams, options?: IQueryOptions) {
  return useQuery({
    queryKey: RECIPE_QUERY_KEY.MEMO(recipeId),
    queryFn: () => getRecipeMemo({ recipeId }),
    ...options,
  });
}

export const useGetRecipeSearch = (params: IGetRecipeSearchParams) => {
  return useInfiniteQuery({
    queryKey: RECIPE_QUERY_KEY.SEARCH_WITH_PARAMS(params),
    queryFn: ({ pageParam }) => getRecipeSearch({ ...params, page: pageParam }),
    initialPageParam: params.page,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({
      recipes: response.pages.flatMap((page) => page.data.contents),
    }),
    enabled: params.keyword.length > 0,
  });
};
