import { RECIPE_URL, USER_URL } from '@/constants/endpoint.constants';
import {
  IAddLikeRecipeParams,
  IAddRecipeReviewParams,
  IAddRecipeReviewReplyParams,
  ICancelLikeRecipeParams,
  IDeleteRecipeParams,
  IDeleteRecipeReviewParams,
  IGetRecipeLikeParams,
  IGetRecipeLikeResponse,
  IGetRecipeMemoParams,
  IGetRecipeParams,
  IGetRecipeReviewDetailParams,
  IGetRecipeReviewDetailResponse,
  IGetRecipeReviewsParams,
  IGetRecipeReviewsResponse,
  IGetRecipeSearchParams,
  IGetRecipeSearchResponse,
  IGetSortedRecipeOption,
  IMemoResponse,
  IMutateRecipeMemoParams,
  IRecipeDetailParams,
  IRecipeDetailResponse,
  IRecipeFilterParams,
  IRecipeIngredientParams,
  IRecipeIngredientResponse,
  IRecipeListResponse,
  IRecipeProcessBySequenceParams,
  IRecipeProcessesResponse,
  IRecipeProcessListParams,
  IRecipeProcessResponse,
  PayRecipeParams,
} from '@/types/api';
import instance from '@/utils/axios';

export const addRecipe = async (formdata: FormData) => {
  return await instance.post(RECIPE_URL, formdata);
};

export const getSortedRecipeList = async (
  params: IGetRecipeParams,
  option: IGetSortedRecipeOption,
) => {
  const { sortOption = 'latest' } = option;

  return await instance.get<IRecipeListResponse>(`${RECIPE_URL}/${sortOption}`, { params });
};

export const getMySortedRecipeList = async (
  params: IGetRecipeParams,
  option: IGetSortedRecipeOption,
) => {
  const { sortOption = 'latest' } = option;

  return await instance.get<IRecipeListResponse>(`${USER_URL}/me/recipes/${sortOption}`, {
    params,
  });
};

export const getRecipeDetail = async ({ recipeId }: IRecipeDetailParams) => {
  return await instance.get<IRecipeDetailResponse>(`${RECIPE_URL}/${recipeId}`);
};

export const getRecipeIngredientList = async ({ recipeId, ...params }: IRecipeIngredientParams) => {
  return await instance.get<IRecipeIngredientResponse>(`${RECIPE_URL}/${recipeId}/foods`, {
    params,
  });
};

export const getRecipeProcessList = async ({ recipeId, ...params }: IRecipeProcessListParams) => {
  return await instance.get<IRecipeProcessesResponse>(`${RECIPE_URL}/${recipeId}/recipe-process`, {
    params,
  });
};

export const getRecipeProcessBySequence = async ({
  recipeId,
  sequence,
  ...params
}: IRecipeProcessBySequenceParams) => {
  return await instance.get<IRecipeProcessResponse>(
    `${RECIPE_URL}/${recipeId}/recipe-process/sequence/${sequence}`,
    {
      params,
    },
  );
};

export const updateRecipe = async (formdata: FormData, { recipeId }: IDeleteRecipeParams) => {
  return await instance.put(`${RECIPE_URL}/${recipeId}`, formdata);
};

export const deleteRecipe = async ({ recipeId }: IDeleteRecipeParams) => {
  return await instance.delete(`${RECIPE_URL}/${recipeId}`);
};

export const getRecipeLike = async ({ recipeId }: IGetRecipeLikeParams) => {
  return await instance.get<IGetRecipeLikeResponse>(`${RECIPE_URL}/${recipeId}/likes/me`);
};

export const addLikeRecipe = async ({ recipeId }: IAddLikeRecipeParams) => {
  return await instance.post(`${RECIPE_URL}/${recipeId}/likes`);
};

export const cancelLikeRecipe = async ({ recipeId }: ICancelLikeRecipeParams) => {
  return await instance.delete(`${RECIPE_URL}/${recipeId}/likes`);
};

export const addBookmarkRecipe = async ({ recipeId }: IAddLikeRecipeParams) => {
  return await instance.post(`${RECIPE_URL}/${recipeId}/saves`);
};

export const cancelBookmarkRecipe = async ({ recipeId }: ICancelLikeRecipeParams) => {
  return await instance.delete(`${RECIPE_URL}/${recipeId}/saves`);
};

export const getRecipeBookmark = async ({ recipeId }: IGetRecipeLikeParams) => {
  return await instance.get<IGetRecipeLikeResponse>(`${RECIPE_URL}/${recipeId}/saves/me`);
};

export const getRecipeByFilter = async ({
  condition,
  page,
}: {
  condition: Partial<IRecipeFilterParams> | null;
  page: number;
}) => {
  try {
    const params = new URLSearchParams();

    if (condition) {
      params.append('page', String(page));

      Object.entries(condition).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => params.append(key, item));
        } else if (value) {
          params.append(key, String(value));
        }
      });
    }

    return await instance.get(`${RECIPE_URL}/filter`, { params });
  } catch (error) {
    throw error;
  }
};

export const getRecipeByFood = async ({ keywords, page }: { keywords: string[]; page: number }) => {
  return await instance.get(`${RECIPE_URL}/filter/food`, {
    params: {
      keyword: keywords,
      page,
    },
    paramsSerializer: {
      serialize: (params) => {
        const searchParams = new URLSearchParams();

        if (params.keyword && Array.isArray(params.keyword)) {
          params.keyword.forEach((keyword: string) => {
            searchParams.append('keyword', keyword);
          });
        }

        searchParams.append('page', params.page);

        return searchParams.toString();
      },
    },
  });
};

export const payRecipe = async ({ recipeId }: PayRecipeParams) => {
  return await instance.post(`${RECIPE_URL}/${recipeId}/payments`);
};

export const getRecipeReviews = async ({ recipeId, ...params }: IGetRecipeReviewsParams) => {
  return await instance.get<IGetRecipeReviewsResponse>(`${RECIPE_URL}/${recipeId}/recipe-reviews`, {
    params,
  });
};

export const addRecipeReview = async ({ recipeId, ...data }: IAddRecipeReviewParams) => {
  return await instance.post<IGetRecipeReviewsResponse>(
    `${RECIPE_URL}/${recipeId}/recipe-reviews`,
    data,
  );
};

export const addRecipeReviewReply = async ({ recipeId, ...data }: IAddRecipeReviewReplyParams) => {
  return await instance.post<IGetRecipeReviewsResponse>(
    `${RECIPE_URL}/${recipeId}/recipe-reply`,
    data,
  );
};

export const getRecipeReviewDetail = async ({
  recipeId,
  reviewId,
}: IGetRecipeReviewDetailParams) => {
  return await instance.get<IGetRecipeReviewDetailResponse>(
    `${RECIPE_URL}/${recipeId}/recipe-reviews/${reviewId}`,
    { params: { includeReplies: true } },
  );
};

export const deleteRecipeReview = async ({ recipeId, reviewId }: IDeleteRecipeReviewParams) => {
  return await instance.delete(`${RECIPE_URL}/${recipeId}/recipe-reviews/${reviewId}`);
};

export const addRecipeMemo = async ({ recipeId, ...data }: IMutateRecipeMemoParams) => {
  return await instance.post(`${RECIPE_URL}/${recipeId}/memos`, data);
};

export const updateRecipeMemo = async ({ recipeId, ...data }: IMutateRecipeMemoParams) => {
  return await instance.put(`${RECIPE_URL}/${recipeId}/memos`, data);
};

export const getRecipeMemo = async ({ recipeId }: IGetRecipeMemoParams) => {
  return await instance.get<IMemoResponse>(`${RECIPE_URL}/${recipeId}/memos`);
};

// 식재료 검색
export const getFoodSearch = async ({ keyword, page }: { keyword: string; page: number }) => {
  return await instance.get(`${RECIPE_URL}/filter/food`, {
    params: { keyword, page },
  });
};

// 레시피 검색
export const getRecipeSearch = async ({ keyword, page }: IGetRecipeSearchParams) => {
  return await instance.get<IGetRecipeSearchResponse>(`${RECIPE_URL}/filter/search`, {
    params: { keyword, page },
  });
};
