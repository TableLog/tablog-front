import axios from 'axios';

import { USER_URL } from '@/constants/endpoint.constants';
import instance from '@/utils/axios';

export const GetFollowingCount = async (id: number) => {
  try {
    return await instance.get(`${USER_URL}/${id}/following/count`);
  } catch (error) {
    throw error;
  }
};

export const GetFollowerCount = async (id: number) => {
  try {
    return await instance.get(`${USER_URL}/${id}/follower/count`);
  } catch (error) {
    throw error;
  }
};

export const GetProfileInfo = async (id: number) => {
  try {
    return await axios.get(`${USER_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};

export const FolloUser = async (id: number) => {
  try {
    return await axios.post(`${USER_URL}/${id}/follow`);
  } catch (error) {
    throw error;
  }
};

export const UnfolloUser = async (id: number) => {
  try {
    return await axios.delete(`${USER_URL}/${id}/follow`);
  } catch (error) {
    throw error;
  }
};

export const GetFollowerList = async (id: number, page: number) => {
  try {
    return await axios.get(`${USER_URL}/${id}/follower?pageNumber=${page}`);
  } catch (error) {
    throw error;
  }
};

export const GetFollowingList = async (id: number, page: number) => {
  try {
    return await axios.get(`${USER_URL}/${id}/following?pageNumber=${page}`);
  } catch (error) {
    throw error;
  }
};

export const GetRecipeListByUserId = async (userId: number, page: number) => {
  try {
    return await axios.get(`${USER_URL}/${userId}/recipes?pageNumber=${page}`);
  } catch (error) {
    throw error;
  }
};
