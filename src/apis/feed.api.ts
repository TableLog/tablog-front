import axios from 'axios';

import { BOARD_URL } from '@/constants/endpoint.constants';
import instance from '@/utils/axios';

export const GetLog = async (page: number) => {
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
