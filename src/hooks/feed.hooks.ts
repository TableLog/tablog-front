import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  AddLog,
  AddLogComment,
  AddLogLike,
  DeleteLog,
  EditLog,
  GetLog,
  GetLogCommentList,
  GetLogList,
} from '@/apis/feed.api';
import {
  FEED_COMMENT_LIST_QUERY_KEY,
  FEED_LIST_QUERY_KEY,
  FEED_QUERY_KEY,
} from '@/constants/query-key.constants';
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

export function useEditLog(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) => EditLog(id, formData),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useGetLog(id: number) {
  return useQuery({
    queryKey: [FEED_QUERY_KEY, id],
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

export function useAddLike(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (id: number) => AddLogLike(id),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useGetCommentList(id: number) {
  return useInfiniteQuery({
    queryKey: [FEED_COMMENT_LIST_QUERY_KEY, id],
    queryFn: async ({ pageParam = 0 }) => await GetLogCommentList(id, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
  });
}

export function useAddComment(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) => AddLogComment(id, content),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
