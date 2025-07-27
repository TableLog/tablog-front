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

export const getSortedRecipeList = async (
  params: IGetRecipeParams,
  option: IGetSortedRecipeOption,
) => {
  const { sortOption = 'latest' } = option;

  try {
    return await instance.get<IRecipeListResponse>(`${RECIPE_URL}/${sortOption}`, {
      params,
    });
  } catch (error) {
    throw error;
  }
};

export const getMySortedRecipeList = async (
  params: IGetRecipeParams,
  option: IGetSortedRecipeOption,
) => {
  const { sortOption = 'latest' } = option;

  try {
    return await instance.get<IRecipeListResponse>(`${USER_URL}/me/recipes/${sortOption}`, {
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

export const getRecipeIngredientList = async ({ recipeId, ...params }: IRecipeIngredientParams) => {
  try {
    return await instance.get<IRecipeIngredientResponse>(`${RECIPE_URL}/${recipeId}/foods`, {
      params,
    });
  } catch (error) {
    throw error;
  }
};

export const getRecipeProcessList = async ({ recipeId, ...params }: IRecipeProcessListParams) => {
  try {
    return await instance.get<IRecipeProcessesResponse>(
      `${RECIPE_URL}/${recipeId}/recipe-process`,
      {
        params,
      },
    );
  } catch (error) {
    throw error;
  }
};

export const getRecipeProcessBySequence = async ({
  recipeId,
  sequence,
  ...params
}: IRecipeProcessBySequenceParams) => {
  try {
    return await instance.get<IRecipeProcessResponse>(
      `${RECIPE_URL}/${recipeId}/recipe-process/sequence/${sequence}`,
      {
        params,
      },
    );
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

export const getRecipeLike = async ({ recipeId }: IGetRecipeLikeParams) => {
  try {
    return await instance.get<IGetRecipeLikeResponse>(`${RECIPE_URL}/${recipeId}/likes/me`);
  } catch (error) {
    throw error;
  }
};

export const addLikeRecipe = async ({ recipeId }: IAddLikeRecipeParams) => {
  try {
    return await instance.post(`${RECIPE_URL}/${recipeId}/likes`);
  } catch (error) {
    throw error;
  }
};

export const cancelLikeRecipe = async ({ recipeId }: ICancelLikeRecipeParams) => {
  try {
    return await instance.delete(`${RECIPE_URL}/${recipeId}/likes`);
  } catch (error) {
    throw error;
  }
};

export const addBookmarkRecipe = async ({ recipeId }: IAddLikeRecipeParams) => {
  try {
    return await instance.post(`${RECIPE_URL}/${recipeId}/saves`);
  } catch (error) {
    throw error;
  }
};

export const cancelBookmarkRecipe = async ({ recipeId }: ICancelLikeRecipeParams) => {
  try {
    return await instance.delete(`${RECIPE_URL}/${recipeId}/saves`);
  } catch (error) {
    throw error;
  }
};

export const getRecipeBookmark = async ({ recipeId }: IGetRecipeLikeParams) => {
  try {
    return await instance.get<IGetRecipeLikeResponse>(`${RECIPE_URL}/${recipeId}/saves/me`);
  } catch (error) {
    throw error;
  }
};

export const getRecipeByFilter = async ({
  condition,
  pageNumber,
}: {
  condition: Partial<IRecipeFilterParams> | null;
  pageNumber: number;
}) => {
  try {
    const params = new URLSearchParams();

    if (condition) {
      params.append('pageNumber', String(pageNumber));

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

export const getRecipeByFood = async ({
  keywords,
  pageNumber,
}: {
  keywords: string[];
  pageNumber: number;
}) => {
  try {
    return await instance.get(`${RECIPE_URL}/filter/food`, {
      params: {
        keyword: keywords,
        pageNumber,
      },
      paramsSerializer: {
        serialize: (params) => {
          const searchParams = new URLSearchParams();

          if (params.keyword && Array.isArray(params.keyword)) {
            params.keyword.forEach((keyword: string) => {
              searchParams.append('keyword', keyword);
            });
          }

          searchParams.append('pageNumber', params.pageNumber);

          return searchParams.toString();
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const payRecipe = async ({ recipeId }: PayRecipeParams) => {
  try {
    return await instance.post(`${RECIPE_URL}/${recipeId}/payments`);
  } catch (error) {
    throw error;
  }
};

export const getRecipeReviews = async ({ recipeId, ...params }: IGetRecipeReviewsParams) => {
  try {
    return await instance.get<IGetRecipeReviewsResponse>(
      `${RECIPE_URL}/${recipeId}/recipe-reviews`,
      {
        params,
      },
    );
  } catch (error) {
    throw error;
  }
};

export const addRecipeReview = async ({ recipeId, ...data }: IAddRecipeReviewParams) => {
  try {
    return await instance.post<IGetRecipeReviewsResponse>(
      `${RECIPE_URL}/${recipeId}/recipe-reviews`,
      data,
    );
  } catch (error) {
    throw error;
  }
};

export const addRecipeReviewReply = async ({ recipeId, ...data }: IAddRecipeReviewReplyParams) => {
  try {
    return await instance.post<IGetRecipeReviewsResponse>(
      `${RECIPE_URL}/${recipeId}/recipe-reply`,
      data,
    );
  } catch (error) {
    throw error;
  }
};

export const getRecipeReviewDetail = async ({
  recipeId,
  reviewId,
}: IGetRecipeReviewDetailParams) => {
  try {
    return await instance.get<IGetRecipeReviewDetailResponse>(
      `${RECIPE_URL}/${recipeId}/recipe-reviews/${reviewId}?includeReplies=true`,
    );
  } catch (error) {
    throw error;
  }
};

export const deleteRecipeReview = async ({ recipeId, reviewId }: IDeleteRecipeReviewParams) => {
  try {
    return await instance.delete(`${RECIPE_URL}/${recipeId}/recipe-reviews/${reviewId}`);
  } catch (error) {
    throw error;
  }
};

export const addRecipeMemo = async ({ recipeId, ...data }: IMutateRecipeMemoParams) => {
  try {
    return await instance.post(`${RECIPE_URL}/${recipeId}/memos`, data);
  } catch (error) {
    throw error;
  }
};

export const updateRecipeMemo = async ({ recipeId, ...data }: IMutateRecipeMemoParams) => {
  try {
    return await instance.put(`${RECIPE_URL}/${recipeId}/memos`, data);
  } catch (error) {
    throw error;
  }
};

export const getRecipeMemo = async ({ recipeId }: IGetRecipeMemoParams) => {
  try {
    return await instance.get<IMemoResponse>(`${RECIPE_URL}/${recipeId}/memos`);
  } catch (error) {
    throw error;
  }
};

// 식재료 검색
export const getFoodSearch = async ({
  keyword,
  pageNumber,
}: {
  keyword: string;
  pageNumber: number;
}) => {
  try {
    return await instance.get(`${RECIPE_URL}/filter/food`, {
      params: { keyword, pageNumber },
    });
  } catch (error) {
    throw error;
  }
};
