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

export const loginWithEmail = async (data: TLoginFormValues) => {
  return await instance.post(LOGIN_URL, data);
};

export const loginWithSocialAccount = async (provider: string | string[], code: string) => {
  return await instance.post(`${SOCIAL_LOGIN_URL}`, {
    params: { provider, code },
  });
};

export const findAccount = async (data: TFindAccountFormValues) => {
  return await instance.post(`${FIND_ACCOUNT}`, data);
};

export const changePassword = async (data: TChangePasswordFormData) => {
  return await instance.put(`${CHANGE_PASSWORD}`, data);
};

export const socialLink = async (provider: string | string[], code: string) => {
  return await instance.post(`${SOCIAL_LINK_URL}`, {
    params: { provider, code },
  });
};

export const logout = async () => {
  return await instance.post(LOGOUT_URL);
};

export const registerUser = async (formdata: FormData) => {
  return await instance.post(REGISTER_URL, formdata);
};

export const checkNickname = async (nickname: string) => {
  return await instance.post(NICKNAME_CHECK_URL, {
    nickname,
  });
};

export const checkEmail = async (email: string) => {
  return await instance.post(EMAIL_CHECK_URL, {
    email,
  });
};

// 회원 정보
export const getUserInfo = async () => {
  return await instance.get<TUserData>(USER_INFO_URL);
};

export const updateUserInfo = async (formData: FormData) => {
  return await instance.put(USER_INFO_URL, formData);
};

export const deleteUser = async () => {
  return await instance.delete(USER_INFO_URL);
};
