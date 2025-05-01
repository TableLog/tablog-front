// NOTE: error type
export type APIErrorResponse = {
  message: ServiceErrorCode;
  status: HttpStatusCode;
  name: string;
};

export type TRegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
  nickname: string;
  birthday: string;
  imgUrl?: string;
  marketingOptIn: boolean;
  checkNickname: boolean;
  checkEmail: boolean;
  provider: 'local' | 'kakao' | 'google';
};

export type TLoginFormValues = {
  email: string;
  password: string;
};

export interface IApiErrorResponse {
  code: string;
  message: string;
}
export interface IRecipeResponse {
  recipe_id: number;
}

export interface IMutationOptions {
  onSuccess?: (res) => void;
  onError?: (res) => void;
}
