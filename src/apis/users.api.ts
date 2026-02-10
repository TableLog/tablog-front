import { USER_URL } from '@/constants/endpoint.constants';
import { IFollowListResponse, PaginationData } from '@/types/api';
import instance from '@/utils/axios';

export const getFollowingCount = async (id: number) => {
  return await instance.get(`${USER_URL}/${id}/following/count`);
};

export const getFollowerCount = async (id: number) => {
  return await instance.get(`${USER_URL}/${id}/follower/count`);
};

export const getProfileInfo = async (id: number) => {
  return await instance.get(`${USER_URL}/${id}`);
};

export const followUser = async (id: number) => {
  return await instance.post(`${USER_URL}/${id}/follow`);
};

export const unfollowUser = async (id: number) => {
  return await instance.delete(`${USER_URL}/${id}/follow`);
};

export const getFollowerList = async (id: number, page: number) => {
  return await instance.get<{ users: IFollowListResponse } & PaginationData>(
    `${USER_URL}/${id}/follower`,
    { params: { page } },
  );
};

export const getFollowingList = async (id: number, page: number) => {
  return await instance.get<{ users: IFollowListResponse } & PaginationData>(
    `${USER_URL}/${id}/following`,
    {
      params: { page },
    },
  );
};

export const getRecipeListByUserId = async (userId: number, page: number) => {
  return await instance.get(`${USER_URL}/${userId}/recipes`, { params: { page } });
};

export const getFeedListByUserId = async (userId: number, page: number) => {
  return await instance.get(`/${userId}/boards`, { params: { page } });
};

export const getUserList = async (keyword: string, page: number, isLoggedIn: boolean) => {
  // ?
  if (isLoggedIn) {
    return await instance.get(`${USER_URL}/search`, { params: { keyword, page } });
  } else {
    return await instance.get(`${USER_URL}/search`, { params: { keyword, page } });
  }
};
