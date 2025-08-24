import { USER_URL } from '@/constants/endpoint.constants';
import instance from '@/utils/axios';

export const getFollowingCount = async (id: number) => {
  try {
    return await instance.get(`${USER_URL}/${id}/following/count`);
  } catch (error) {
    throw error;
  }
};

export const getFollowerCount = async (id: number) => {
  try {
    return await instance.get(`${USER_URL}/${id}/follower/count`);
  } catch (error) {
    throw error;
  }
};

export const getProfileInfo = async (id: number) => {
  try {
    return await instance.get(`${USER_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};

export const folloUser = async (id: number) => {
  try {
    return await instance.post(`${USER_URL}/${id}/follow`);
  } catch (error) {
    throw error;
  }
};

export const unfolloUser = async (id: number) => {
  try {
    return await instance.delete(`${USER_URL}/${id}/follow`);
  } catch (error) {
    throw error;
  }
};

export const getFollowerList = async (id: number, page: number) => {
  try {
    return await instance.get(`${USER_URL}/${id}/follower?pageNumber=${page}`);
  } catch (error) {
    throw error;
  }
};

export const getFollowingList = async (id: number, page: number) => {
  try {
    return await instance.get(`${USER_URL}/${id}/following?pageNumber=${page}`);
  } catch (error) {
    throw error;
  }
};

export const getRecipeListByUserId = async (userId: number, page: number) => {
  try {
    return await instance.get(`${USER_URL}/${userId}/recipes?pageNumber=${page}`);
  } catch (error) {
    throw error;
  }
};

export const getFeedListByUserId = async (userId: number, page: number) => {
  try {
    return await instance.get(`/api/v1/${userId}/boards?page=${page}`);
  } catch (error) {
    throw error;
  }
};

export const getUserList = async (nickname: string, page: number, isLoggedIn: boolean) => {
  try {
    if (isLoggedIn) {
      return await instance.get(`${USER_URL}/search?keyword=${nickname}&pageNumber=${page}`);
    } else {
      return await instance.get(`${USER_URL}/search?keyword=${nickname}&pageNumber=${page}`);
    }
  } catch (error) {
    throw error;
  }
};
