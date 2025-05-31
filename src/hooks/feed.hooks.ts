import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { AddLog, DeleteLog, GetLog, GetLogList } from '@/apis/feed.api';
import { FEED_LIST_QUERY_KEY, FEED_QUERY_KEY } from '@/constants/query-key.constants';
import { IMutationOptions } from '@/types/api';

export function useGetLogList() {
  return useInfiniteQuery({
    queryKey: [FEED_LIST_QUERY_KEY],
    queryFn: async ({ pageParam = 0 }) => await GetLogList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
  });
}

export function useAddLog(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (formData: FormData) => AddLog(formData),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useGetLog(id: number) {
  return useQuery({
    queryKey: [FEED_QUERY_KEY],
    queryFn: () => GetLog(id),
    select: (res) => res.data,
  });
}

export function useDeleteLog(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (id: number) => DeleteLog(id),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
