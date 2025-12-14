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

  return await instance.get<IRecipeListResponse>(`${LIKE_LIST_URL}/${sortOption}`, { params });
};

export const getMyBookmarkList = async (
  params: IGetRecipeParams,
  option: IGetSortedRecipeOption,
) => {
  const { sortOption = 'latest' } = option;

  return await instance.get<IRecipeListResponse>(`${BOOKMARK_LIST_URL}/${sortOption}`, { params });
};

export const requestExpertVerification = async () => {
  return await instance.post(EXPERT_URL);
};

export const getLicenseList = async (page: number, licenseType: string) => {
  return await instance.get(`${LICENSE_URL}`, { params: { page, licenseType } });
};

export const getLicenseCount = async () => {
  return await instance.get(`${LICENSE_URL}/count`);
};

export const uploadLicense = async (data: FormData) => {
  return await instance.post(`${LICENSE_URL}`, data);
};

export const getMyRecipeReview = async (userId: number | undefined, page: number) => {
  return await instance.get(`${USER_INFO_URL}/${userId}/recipe-reviews`, {
    params: { page, includeReplies: true },
  });
};

export const getPointHistory = async (page: number, pointType: string) => {
  return await instance.get(`${USER_INFO_URL}/me/point`, {
    params: { page, pointType },
  });
};
