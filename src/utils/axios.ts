// utils/axios.ts
import axios from 'axios';

import { REFRESH_URL } from '@/constants/endpoint.constants';

import { getErrorCode } from './functions';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + '/api/v1',
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // NOTE: 토근 만료시 refresh 요청
    if (error.response?.status === 401) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1${REFRESH_URL}`,
          {},
          { withCredentials: true },
        );

        return instance.request(error.config);
      } catch (err) {
        const errorCode = getErrorCode(err);

        // refresh token 만료시 쿠키 삭제 후 로그인 페이지로 이동
        if (errorCode === 'EJ401001' || errorCode === 'EJ400001' || errorCode === 'EJ401002') {
          await fetch('/api/v1/logout', {
            method: 'POST',
            credentials: 'include',
          });
          window.location.href = '/login?tokenExpired=true';
        }

        return Promise.reject(err);
      }
    }

    if (error.status === 403) {
      console.error('토큰을 확인해주세요');
    }

    // const { code } = error.response.data.message;

    // if (code) {
    //   const errorMessage = ERROR_CODE_MESSAGE_MAP[code];
    //   console.error(`공통 에러 메세지: ${errorMessage}`);
    // } else {
    //   console.error('알 수 없는 오류가 발생했습니다.');
    // }

    return Promise.reject(error);
  },
);

export default instance;
