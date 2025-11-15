import { USER_URL } from '@/constants/endpoint.constants';
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

export const folloUser = async (id: number) => {
  return await instance.post(`${USER_URL}/${id}/follow`);
};

export const unfolloUser = async (id: number) => {
  return await instance.delete(`${USER_URL}/${id}/follow`);
};

export const getFollowerList = async (id: number, pageNumber: number) => {
  return await instance.get(`${USER_URL}/${id}/follower`, { params: { pageNumber } });
};

export const getFollowingList = async (id: number, pageNumber: number) => {
  return await instance.get(`${USER_URL}/${id}/following`, { params: { pageNumber } });
};

export const getRecipeListByUserId = async (userId: number, pageNumber: number) => {
  return await instance.get(`${USER_URL}/${userId}/recipes`, { params: { pageNumber } });
};

export const getFeedListByUserId = async (userId: number, page: number) => {
  return await instance.get(`/${userId}/boards`, { params: { page } });
};

export const getUserList = async (keyword: string, pageNumber: number, isLoggedIn: boolean) => {
  if (isLoggedIn) {
    return await instance.get(`${USER_URL}/search`, { params: { keyword, pageNumber } });
  } else {
    return await instance.get(`${USER_URL}/search`, { params: { keyword, pageNumber } });
  }
};
