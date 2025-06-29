import axios from 'axios';

import {
  CHANGE_PASSWORD,
  EMAIL_CHECK_URL,
  FIND_ACCOUNT,
  LOGIN_URL,
  LOGOUT_URL,
  NICKNAME_CHECK_URL,
  REGISTER_URL,
  SOCIAL_LINK_URL,
  SOCIAL_LOGIN_URL,
  USER_INFO_URL,
} from '@/constants/endpoint.constants';
import {
  TChangePasswordFormData,
  TFindAccountFormValues,
  TLoginFormValues,
  TUserData,
} from '@/types/api';
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
    return await instance.post(`${SOCIAL_LOGIN_URL}?provider=${provider}&code=${code}`, {});
  } catch (error) {
    throw error;
  }
};

export const FindAccount = async (data: TFindAccountFormValues) => {
  try {
    return await axios.post(`${FIND_ACCOUNT}`, data);
  } catch (error) {
    throw error;
  }
};

export const ChangePassword = async (data: TChangePasswordFormData) => {
  try {
    return await axios.put(`${CHANGE_PASSWORD}`, data);
  } catch (error) {
    throw error;
  }
};

export const SocialLink = async (provider: string | string[], code: string) => {
  try {
    return await instance.post(`${SOCIAL_LINK_URL}?provider=${provider}&code=${code}`, {});
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
    return await instance.get<TUserData>(USER_INFO_URL);
  } catch (error) {
    hanldeApiError(error);
  }
};

export const UserInfoUpdate = async (formData: FormData) => {
  try {
    return await instance.put(USER_INFO_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw error;
  }
};

export const UnregisterUser = async () => {
  try {
    return await instance.delete(USER_INFO_URL);
  } catch (error) {
    throw error;
  }
};
