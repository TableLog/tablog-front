import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { getMyBookmarkList, getMyLikeList } from '@/apis/my.api';
import { uploadLicense } from '@/apis/users.api';
import {
  MY_BOOKMARK_LIST_OPTIONS_QUERY_KEY,
  MY_LIKE_LIST_OPTIONS_QUERY_KEY,
} from '@/constants/query-key.constants';
import { IGetRecipeParams, IGetSortedRecipeOption } from '@/types/api';

export const useGetMyLikesList = (params: IGetRecipeParams, option: IGetSortedRecipeOption) => {
  const { ...sortOptions } = option;

  return useInfiniteQuery({
    queryKey: MY_LIKE_LIST_OPTIONS_QUERY_KEY(params, option),
    queryFn: async ({ pageParam }) =>
      await getMyLikeList({ ...params, pageNumber: pageParam }, sortOptions),
    initialPageParam: params.pageNumber,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({ recipes: response.pages.flatMap((page) => page.data.contents) }),
  });
};

export const useGetMyBookmarkList = (params: IGetRecipeParams, option: IGetSortedRecipeOption) => {
  const { ...sortOptions } = option;

  return useInfiniteQuery({
    queryKey: MY_BOOKMARK_LIST_OPTIONS_QUERY_KEY(params, option),
    queryFn: async ({ pageParam }) =>
      await getMyBookmarkList({ ...params, pageNumber: pageParam }, sortOptions),
    initialPageParam: params.pageNumber,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (response) => ({ recipes: response.pages.flatMap((page) => page.data.contents) }),
  });
};

export const useUploadLicense = () => {
  return useMutation({
    mutationFn: async (data: FormData) => await uploadLicense(data),
  });
};
