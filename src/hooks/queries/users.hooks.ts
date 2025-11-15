import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  folloUser,
  getFeedListByUserId,
  getFollowerCount,
  getFollowerList,
  getFollowingCount,
  getFollowingList,
  getProfileInfo,
  getRecipeListByUserId,
  getUserList,
  unfolloUser,
} from '@/apis/users.api';
import {
  FEED_LIST_BY_USER_ID_QUERY_KEY,
  FOLLOWER_COUNT_QUERY_KEY,
  FOLLOWER_LIST_QUERY_KEY,
  FOLLOWING_COUNT_QUERY_KEY,
  FOLLOWING_LIST_QUERY_KEY,
  PROFILE_INFO_QUERY_KEY,
  RECIPE_LIST_BY_USER_ID_QUERY_KEY,
  USER_LIST_QUERY_KEY,
} from '@/constants/query-key.constants';
import { showErrorToast } from '@/utils/functions';

export const useGetFollowingCount = (id: number) => {
  return useQuery({
    queryKey: [FOLLOWING_COUNT_QUERY_KEY, id],
    queryFn: () => getFollowingCount(id),
  });
};

export const useGetFollowerCount = (id: number) => {
  return useQuery({
    queryKey: [FOLLOWER_COUNT_QUERY_KEY, id],
    queryFn: () => getFollowerCount(id),
  });
};

export const useGetProfileInfo = (id: number) => {
  return useQuery({
    queryKey: [PROFILE_INFO_QUERY_KEY, id],
    queryFn: () => getProfileInfo(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export function useFollowUser(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => folloUser(id),
    onSuccess: (res) => {
      if (res.status === 201 || res.status === 200) {
        queryClient.invalidateQueries({ queryKey: [PROFILE_INFO_QUERY_KEY, Number(id)] });
        queryClient.invalidateQueries({ queryKey: [FOLLOWER_COUNT_QUERY_KEY, Number(id)] });
        queryClient.invalidateQueries({ queryKey: [USER_LIST_QUERY_KEY] });
      }
    },
    onError: (err) => {
      showErrorToast(err);
    },
  });
}

export function useUnfollowUser(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => unfolloUser(id),
    onSuccess: (res) => {
      if (res.status === 201 || res.status === 200) {
        queryClient.invalidateQueries({ queryKey: [PROFILE_INFO_QUERY_KEY, Number(id)] });
        queryClient.invalidateQueries({ queryKey: [FOLLOWER_COUNT_QUERY_KEY, Number(id)] });
        queryClient.invalidateQueries({ queryKey: [USER_LIST_QUERY_KEY] });
      }
    },
    onError: (err) => {
      showErrorToast(err);
    },
  });
}

export function useGetFollowerList(id: number, isFollower: boolean) {
  return useInfiniteQuery({
    queryKey: [FOLLOWER_LIST_QUERY_KEY, id],
    queryFn: async ({ pageParam = 0 }) => await getFollowerList(id, pageParam),
    enabled: isFollower,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
  });
}

export function useGetFollowingList(id: number, isFollower: boolean) {
  return useInfiniteQuery({
    queryKey: [FOLLOWING_LIST_QUERY_KEY, id],
    queryFn: async ({ pageParam = 0 }) => await getFollowingList(id, pageParam),
    initialPageParam: 0,
    enabled: !isFollower,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
  });
}

export function useGetRecipeListByUserId(userId: number) {
  return useInfiniteQuery({
    queryKey: [RECIPE_LIST_BY_USER_ID_QUERY_KEY, userId],
    queryFn: async ({ pageParam = 0 }) => await getRecipeListByUserId(userId, pageParam),
    initialPageParam: 0,
    enabled: !!userId,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
  });
}

export function useGetFeedListByUserId(userId: number) {
  return useInfiniteQuery({
    queryKey: [FEED_LIST_BY_USER_ID_QUERY_KEY, userId],
    queryFn: async ({ pageParam = 0 }) => await getFeedListByUserId(userId, pageParam),
    initialPageParam: 0,
    enabled: !!userId,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
  });
}

export function useGetUserList(nickname: string, isLoggedIn: boolean) {
  return useInfiniteQuery({
    queryKey: [USER_LIST_QUERY_KEY, nickname],
    queryFn: async ({ pageParam = 0 }) => await getUserList(nickname, pageParam, isLoggedIn),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    enabled: !!nickname,
  });
}
