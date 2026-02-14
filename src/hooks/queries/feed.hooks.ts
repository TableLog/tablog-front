import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  addLog,
  addLogComment,
  addLogCommentReply,
  addLogLike,
  deleteLog,
  editLog,
  getLog,
  getLogCommentList,
  getLogCommentReplyList,
  getLogList,
  removeLogLike,
} from '@/apis/feed.api';
import { FEED_QUERY_KEY } from '@/constants/query-key.constants';
import { IMutationOptions } from '@/types/api';

export function useGetLogList() {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEY.LIST(),
    queryFn: async ({ pageParam = 0 }) => await getLogList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
  });
}

export function useAddLog(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (formData: FormData) => addLog(formData),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useEditLog(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ logId, formData }: { logId: number; formData: FormData }) =>
      editLog(logId, formData),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useGetLog(logId: number) {
  return useQuery({
    queryKey: FEED_QUERY_KEY.DETAIL(logId),
    queryFn: () => getLog(logId),
    enabled: !!logId && logId !== -1,
    select: (res) => res.data,
  });
}

export function useDeleteLog(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (id: number) => deleteLog(id),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useAddLike(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (id: number) => addLogLike(id),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useRemoveLike(options?: IMutationOptions) {
  return useMutation({
    mutationFn: (id: number) => removeLogLike(id),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useGetCommentList(logId: number) {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEY.COMMENT_LIST(logId),
    queryFn: async ({ pageParam = 0 }) => await getLogCommentList(logId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}

export function useAddComment(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({ logId, content }: { logId: number; content: string }) =>
      addLogComment(logId, content),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useAddCommentReply(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({
      logId,
      commentId,
      content,
    }: {
      logId: number;
      commentId: number;
      content: string;
    }) => addLogCommentReply(logId, commentId, content),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useGetCommentReplyList(logId: number, commentId: number, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEY.COMMENT_REPLY_LIST(logId, commentId),
    queryFn: async ({ pageParam = 0 }) => await getLogCommentReplyList(logId, commentId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    enabled: enabled && !!logId && !!commentId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}
