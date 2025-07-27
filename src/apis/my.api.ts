import {
  BOOKMARK_LIST_URL,
  EXPERT_URL,
  LICENSE_URL,
  LIKE_LIST_URL,
  USER_INFO_URL,
} from '@/constants/endpoint.constants';
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

export const requestExpertVerification = async () => {
  try {
    return await instance.post(EXPERT_URL);
  } catch (error) {
    throw error;
  }
};

export const getLicenseList = async (page: number, licenseType: string) => {
  try {
    return await instance.get(`${LICENSE_URL}?page=${page}&licenseType=${licenseType}`);
  } catch (error) {
    throw error;
  }
};

export const getLicenseCount = async () => {
  try {
    return await instance.get(`${LICENSE_URL}/count`);
  } catch (error) {
    throw error;
  }
};

export const uploadLicense = async (data: FormData) => {
  try {
    return await instance.post(`${LICENSE_URL}`, data);
  } catch (error) {
    throw error;
  }
};

export const getMyRecipeReview = async (userId: number | undefined, pageNumber: number) => {
  try {
    return await instance.get(
      `${USER_INFO_URL}/${userId}/recipe-reviews?pageNumber=${pageNumber}&includeReplies=true`,
    );
  } catch (error) {
    throw error;
  }
};
