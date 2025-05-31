import axios from 'axios';

import { BOARD_URL } from '@/constants/endpoint.constants';
import instance from '@/utils/axios';

export const GetLogList = async (page: number) => {
  try {
    return await axios.get(`${BOARD_URL}?page=${page}`);
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
