import axios from 'axios';

import { BOARD_URL } from '@/constants/endpoint.constants';
import instance from '@/utils/axios';

export const GetLogList = async (page: number) => {
  try {
    return await axios.get(`${BOARD_URL}/desc?page=${page}`);
  } catch (error) {
    throw error;
  }
};

export const AddLog = async (formdata: FormData) => {
  try {
    return await instance.post(BOARD_URL, formdata);
  } catch (error) {
    throw error;
  }
};

export const EditLog = async (id: number, formdata: FormData) => {
  try {
    return await instance.put(`${BOARD_URL}/${id}`, formdata);
  } catch (error) {
    throw error;
  }
};

export const GetLog = async (id: number) => {
  try {
    return await axios.get(`${BOARD_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};

export const DeleteLog = async (id: number) => {
  try {
    return await instance.delete(`${BOARD_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};

export const AddLogLike = async (id: number) => {
  try {
    return await instance.post(`${BOARD_URL}/${id}/likes`);
  } catch (error) {
    throw error;
  }
};

export const RemoveLogLike = async (id: number) => {
  try {
    return await instance.delete(`${BOARD_URL}/${id}/likes`);
  } catch (error) {
    throw error;
  }
};

export const GetLogCommentList = async (id: number, page: number) => {
  try {
    return await axios.get(`${BOARD_URL}/${id}/board_comments?page=${page}`);
  } catch (error) {
    throw error;
  }
};

export const AddLogComment = async (id: number, comment: string) => {
  try {
    return await instance.post(
      `${BOARD_URL}/${id}/board_comment`,
      { content: comment },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    throw error;
  }
};
