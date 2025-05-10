import axios from 'axios';

import {
  EMAIL_CHECK_URL,
  LOGIN_URL,
  LOGOUT_URL,
  NICKNAME_CHECK_URL,
  REGISTER_URL,
  SOCIAL_LOGIN_URL,
  USER_INFO_URL,
} from '@/constants/endpoint.constants';
import { TLoginFormValues } from '@/types/api';
import instance from '@/utils/axios';
import { hanldeApiError } from '@/utils/functions';

export const EmailLogin = async (data: TLoginFormValues) => {
  try {
    return await axios.post(LOGIN_URL, data);
  } catch (error) {
    throw error;
  }
};

export const SocialLogin = async (provider: string | string[], code: string) => {
  try {
    return await axios.post(
      `${SOCIAL_LOGIN_URL}?provider=${provider}&code=${code}`,
      {},
      {
        withCredentials: true,
      },
    );
  } catch (error) {
    throw error;
  }
};

export const Logout = async () => {
  try {
    return await instance.post(LOGOUT_URL);
  } catch (error) {
    throw error;
  }
};

export const RegisterUser = async (formdata: FormData) => {
  try {
    return await axios.post(REGISTER_URL, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw error;
  }
};

export const CheckNickname = async (nickname: string) => {
  try {
    return await axios.post(NICKNAME_CHECK_URL, {
      nickname: nickname,
    });
  } catch (error) {
    throw error;
  }
};

export const CheckEmail = async (email: string) => {
  try {
    return await axios.post(EMAIL_CHECK_URL, {
      email: email,
    });
  } catch (error) {
    throw error;
  }
};

// 회원 정보
export const UserInfo = async () => {
  try {
    return await instance.get(USER_INFO_URL);
  } catch (error) {
    hanldeApiError(error);

    throw error;
  }
};
