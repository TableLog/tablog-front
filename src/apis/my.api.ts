import { BOOKMARK_LIST_URL, LIKE_LIST_URL } from '@/constants/endpoint.constants';
import { IGetRecipeParams, IGetSortedRecipeOption, IRecipeListResponse } from '@/types/api';
import instance from '@/utils/axios';

export const getMyLikeList = async (params: IGetRecipeParams, option: IGetSortedRecipeOption) => {
  const { sortOption = 'latest' } = option;

  try {
    return await instance.get<IRecipeListResponse>(`${LIKE_LIST_URL}/${sortOption}`, {
      params,
    });
  } catch (error) {
    throw error;
  }
};

export const getMyBookmarkList = async (
  params: IGetRecipeParams,
  option: IGetSortedRecipeOption,
) => {
  const { sortOption = 'latest' } = option;

  try {
    return await instance.get<IRecipeListResponse>(`${BOOKMARK_LIST_URL}/${sortOption}`, {
      params,
    });
  } catch (error) {
    throw error;
  }
};
