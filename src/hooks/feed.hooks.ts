import { useMutation, useQuery } from '@tanstack/react-query';

import { AddLog, GetLog } from '@/apis/feed.api';
import { FEED_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { IMutationOptions } from '@/types/api';

export function useGetLog(page: number) {
  return useQuery({
    queryKey: [FEED_LIST_QUERY_KEY, page],
    queryFn: () => GetLog(page),
    select: (res) => res.data,
  });
}

export function useAddLog(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (formData: FormData) => AddLog(formData),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
