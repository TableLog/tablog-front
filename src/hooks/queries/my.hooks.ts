import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  getLicenseCount,
  getLicenseList,
  getMyBookmarkList,
  getMyLikeList,
  getMyRecipeReview,
  getPointHistory,
  requestExpertVerification,
  uploadLicense,
} from '@/apis/my.api';
import { RECIPE_QUERY_KEY, USER_QUERY_KEY } from '@/constants/query-key.constants';
import { IGetRecipeParams, IGetSortedRecipeOption, IMutationOptions } from '@/types/api';
import { showToast } from '@/utils/functions';

export const useGetMyLikesList = (params: IGetRecipeParams, option: IGetSortedRecipeOption) => {
  const { ...sortOptions } = option;

  return useInfiniteQuery({
    queryKey: RECIPE_QUERY_KEY.MY_LIKE_LIST_WITH_PARAMS(params, option),
    queryFn: async ({ pageParam }) =>
      await getMyLikeList({ ...params, page: pageParam }, sortOptions),
    initialPageParam: params.page,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({ recipes: response.pages.flatMap((page) => page.data.contents) }),
  });
};

export const useGetMyBookmarkList = (params: IGetRecipeParams, option: IGetSortedRecipeOption) => {
  const { ...sortOptions } = option;

  return useInfiniteQuery({
    queryKey: RECIPE_QUERY_KEY.MY_BOOKMARK_LIST_WITH_PARAMS(params, option),
    queryFn: async ({ pageParam }) =>
      await getMyBookmarkList({ ...params, page: pageParam }, sortOptions),
    initialPageParam: params.page,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({ recipes: response.pages.flatMap((page) => page.data.contents) }),
  });
};

export const useRequestExpertVerification = () => {
  return useMutation({
    mutationFn: async () => await requestExpertVerification(),
    onSuccess: (res) => {
      if (res.status === 201) {
        showToast({ message: '전문가 인증 요청이 접수되었습니다.', type: 'success' });
      }
    },
  });
};

// 전문가 등록
export const useUploadLicense = (options?: IMutationOptions) => {
  return useMutation({
    mutationFn: async (data: FormData) => await uploadLicense(data),
    ...options,
  });
};

export const useGetLicenseList = (licenseType: string) => {
  return useInfiniteQuery({
    queryKey: USER_QUERY_KEY.LICENSE_LIST(licenseType),
    queryFn: async ({ pageParam }) => await getLicenseList(pageParam, licenseType),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({ licenses: response.pages.flatMap((page) => page.data.contents) }),
    enabled: !!licenseType,
  });
};

export const useGetLicenseCount = () => {
  return useQuery({
    queryKey: USER_QUERY_KEY.LICENSE_COUNT(),
    queryFn: async () => await getLicenseCount(),
    select: (response) => response.data,
  });
};

export const useGetMyRecipeReview = ({ userId }: { userId: number | undefined }) => {
  return useInfiniteQuery({
    queryKey: RECIPE_QUERY_KEY.MY_REVIEW_LIST(),
    queryFn: async ({ pageParam = 0 }) => await getMyRecipeReview(userId, pageParam),

    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({ reviews: response.pages.flatMap((page) => page.data.contents) }),
    enabled: !!userId,
  });
};

export const useGetPointHistory = (type: string) => {
  return useInfiniteQuery({
    queryKey: USER_QUERY_KEY.POINT_HISTORY(type),
    queryFn: async ({ pageParam }) => await getPointHistory(pageParam, type),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({ pointHistory: response.pages.flatMap((page) => page.data.contents) }),
  });
};
