import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  followUser,
  getFeedListByUserId,
  getFollowerCount,
  getFollowerList,
  getFollowingCount,
  getFollowingList,
  getProfileInfo,
  getRecipeListByUserId,
  getUserList,
  unfollowUser,
} from '@/apis/users.api';
import { FEED_QUERY_KEY, RECIPE_QUERY_KEY, USER_QUERY_KEY } from '@/constants/query-key.constants';
import { showErrorToast } from '@/utils/functions';

export const useGetFollowingCount = (userId: number) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.FOLLOWING_COUNT(userId),
    queryFn: () => getFollowingCount(userId),
  });
};

export const useGetFollowerCount = (userId: number) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.FOLLOWER_COUNT(userId),
    queryFn: () => getFollowerCount(userId),
  });
};

export const useGetProfileInfo = (userId: number) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.PROFILE_INFO(userId),
    queryFn: () => getProfileInfo(userId),
    select: (data) => data.data,
    enabled: !!userId,
  });
};

export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: number; followedBy: number }) => followUser(userId),
    onSuccess: (res, { userId, followedBy }) => {
      if (res.status === 201 || res.status === 200) {
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.LIST() });
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.PROFILE_INFO(userId) });
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.FOLLOWER(userId) });
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.FOLLOWING(followedBy) });
      }
    },
    onError: (err) => {
      showErrorToast(err);
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: number; unfollowedBy: number }) => unfollowUser(userId),
    onSuccess: (res, { userId, unfollowedBy }) => {
      if (res.status === 201 || res.status === 200) {
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.LIST() });
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.PROFILE_INFO(userId) });
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.FOLLOWER(userId) });
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.FOLLOWING(unfollowedBy) });
      }
    },
    onError: (err) => {
      showErrorToast(err);
    },
  });
}

export function useGetFollowerList(id: number, isFollower: boolean) {
  return useInfiniteQuery({
    queryKey: USER_QUERY_KEY.FOLLOWER_LIST(id),
    queryFn: async ({ pageParam = 0 }) => await getFollowerList(id, pageParam),
    enabled: isFollower,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.data.users),
  });
}

export function useGetFollowingList(id: number, isFollower: boolean) {
  return useInfiniteQuery({
    queryKey: USER_QUERY_KEY.FOLLOWING_LIST(id),
    queryFn: async ({ pageParam = 0 }) => await getFollowingList(id, pageParam),
    initialPageParam: 0,
    enabled: !isFollower,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.data.users),
  });
}

export function useGetRecipeListByUserId(userId: number) {
  return useInfiniteQuery({
    queryKey: RECIPE_QUERY_KEY.LIST_BY_USER_ID(userId),
    queryFn: async ({ pageParam = 0 }) => await getRecipeListByUserId(userId, pageParam),
    initialPageParam: 0,
    enabled: !!userId,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
  });
}

export function useGetFeedListByUserId(userId: number) {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEY.LIST_BY_USER_ID(userId),
    queryFn: async ({ pageParam = 0 }) => await getFeedListByUserId(userId, pageParam),
    initialPageParam: 0,
    enabled: !!userId,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
  });
}

export function useSearchUserList(keyword: string, isLoggedIn: boolean) {
  return useInfiniteQuery({
    queryKey: USER_QUERY_KEY.SEARCH(keyword),
    queryFn: async ({ pageParam = 0 }) => await getUserList(keyword, pageParam, isLoggedIn),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.data.hasNext ? pageParam + 1 : undefined,
    enabled: !!keyword,
  });
}
