import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { AddLog, GetLog } from '@/apis/feed.api';
import { FEED_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { IMutationOptions } from '@/types/api';

export function useGetLog() {
  return useInfiniteQuery({
    queryKey: [FEED_LIST_QUERY_KEY],
    queryFn: async ({ pageParam = 0 }) => await GetLog(pageParam),
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
