import axios from 'axios';

import {
  EMAIL_CHECK_URL,
  LOGIN_URL,
  NICKNAME_CHECK_URL,
  REGISTER_URL,
  SOCIAL_LOGIN_URL,
  SOCIAL_REGISTER_URL,
} from '@/constants/endpoint.constants';
import { TLoginFormValues } from '@/types/api';

export const EmailLogin = async (data: TLoginFormValues) => {
  try {
    return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}${LOGIN_URL}`, data);
  } catch (error) {
    throw error;
  }
};

export const SocialLogin = async (provider: string | string[], code: string) => {
  try {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${SOCIAL_LOGIN_URL}?provider=${provider}&code=${code}`,
    );
  } catch (error) {
    throw error;
  }
};

export const SocialRegister = async (provider: string | string[], code: string) => {
  try {
    return await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${SOCIAL_REGISTER_URL}?provider=${provider}&code=${code}`,
    );
  } catch (error) {
    throw error;
  }
};

export const RegisterUser = async (formdata: FormData) => {
  try {
    return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}${REGISTER_URL}`, formdata, {
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
    return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}${NICKNAME_CHECK_URL}`, {
      nickname: nickname,
    });
  } catch (error) {
    throw error;
  }
};

export const CheckEmail = async (email: string) => {
  try {
    return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}${EMAIL_CHECK_URL}`, {
      email: email,
    });
  } catch (error) {
    throw error;
  }
};
