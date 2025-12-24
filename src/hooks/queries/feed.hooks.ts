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
import {
  FEED_COMMENT_LIST_QUERY_KEY,
  FEED_COMMENT_REPLY_LIST_QUERY_KEY,
  FEED_LIST_QUERY_KEY,
  FEED_QUERY_KEY,
} from '@/constants/query-key.constants';
import { IMutationOptions } from '@/types/api';

export function useGetLogList() {
  return useInfiniteQuery({
    queryKey: [FEED_LIST_QUERY_KEY],
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
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) => editLog(id, formData),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useGetLog(id: number) {
  return useQuery({
    queryKey: [FEED_QUERY_KEY, id],
    queryFn: () => getLog(id),
    enabled: !!id && id !== -1,
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

export function useGetCommentList(id: number) {
  return useInfiniteQuery({
    queryKey: [FEED_COMMENT_LIST_QUERY_KEY, id],
    queryFn: async ({ pageParam = 0 }) => await getLogCommentList(id, pageParam),
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
    mutationFn: ({ id, content }: { id: number; content: string }) => addLogComment(id, content),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useAddCommentReply(options?: IMutationOptions) {
  return useMutation({
    mutationFn: ({
      boardId,
      commentId,
      content,
    }: {
      boardId: number;
      commentId: number;
      content: string;
    }) => addLogCommentReply(boardId, commentId, content),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useGetCommentReplyList(boardId: number, commentId: number, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: [FEED_COMMENT_REPLY_LIST_QUERY_KEY, boardId, commentId],
    queryFn: async ({ pageParam = 0 }) =>
      await getLogCommentReplyList(boardId, commentId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    enabled: enabled && !!boardId && !!commentId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}
