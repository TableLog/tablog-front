// utils/axios.ts
import axios from 'axios';

import { REFRESH_URL } from '@/constants/endpoint.constants';
import { APIErrorResponse } from '@/types/api';

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
      } catch (err) {
        if (axios.isAxiosError<APIErrorResponse>(err) && err.response) {
          const message = err.response.data.message;

          // TODO: 잘 작동하는지 테스트
          if (message === 'EJ400001') {
            await fetch('/api/logout', { method: 'POST' });
          }
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
