// utils/axios.ts
import axios from 'axios';

import { REFRESH_URL } from '@/constants/endpoint.constants';
import { APIErrorResponse } from '@/types/api';

import { getErrorCode } from './functions';

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
        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}${REFRESH_URL}`,
          {},
          { withCredentials: true },
        );

        return instance.request(error.config);
      } catch (err) {
        if (axios.isAxiosError<APIErrorResponse>(err) && err.response) {
          const errorCode = getErrorCode(err);

          if (errorCode === 'EJ401001' || errorCode === 'EJ400001' || errorCode === 'EJ401002') {
            // refresh token 만료시 쿠키 삭제 후 로그인 페이지로 이동
            await fetch('/api/logout', { method: 'POST' });

            window.location.href = '/login';
          }
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
