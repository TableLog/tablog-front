// utils/axios.ts
import axios from 'axios';

import { REFRESH_URL } from '@/constants/endpoint.constants';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // NOTE: 토근 만료시 refresh 요청
    if (error.response?.status === 401) {
      try {
        await axios.post(REFRESH_URL, {}, { withCredentials: true });

        return instance.request(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
