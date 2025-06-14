// NOTE: error type
export type APIErrorResponse = {
  message: ServiceErrorCode;
  status?: HttpStatusCode;
  name: string;
};

export type TUserData = {
  id: number;
  userName: string;
  userRole: string;
  birthday: string;
  email: string;
  marketingOptIn: boolean;
  nickname: string;
  pointBalance: boolean;
  profileImgUrl: string;
  provider: string;
  oAuthAccounts: Array<{ provider: string; email: string }>;
  recipeCount: number;
  boardCount: number;
  followerCount: number;
  followingCount: number;
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

export type TUserInfoEditFormValues = {
  email: string;
  userName: string;
  birthday: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  imgUrl?: string;
  marketingOptIn: boolean;
  checkNickname: boolean;
  checkEmail: boolean;
  provider: string;
};

export type TFindAccountFormValues = {
  userName: string;
  birthday: string;
};

export type TChangePasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export type TChangePasswordFormData = {
  email: string;
  newPassword: string;
};

export type TAddLogFormData = {
  content: string;
  images: (File | string)[];
};

export interface IApiErrorResponse {
  code: string;
  message: string;
}

export interface IMutationOptions {
  onSuccess?: (res) => void;
  onError?: (res) => void;
}

export type TTablogFormValues = TRegisterFormValues | TUserInfoEditFormValues;

export interface ILogResponse {
  id: number;
  category: string;
  comment_count: number;
  content: string;
  created_at: string;
  image_urls: Array<string>;
  like_count: number;
  profileImgUrl: string;
  title: string;
  user: string;
  createdAt: string;
  isLike: boolean;
  isMe: boolean;
  user_id: number;
}

export interface ICommentResponse {
  content: string;
  profileImgUrl: string;
  user: string;
  createdAt: string;
}

export interface IFollowerListResponse {
  isFollowed: boolean;
  nickname: string;
  profileImgUrl: string;
  userId: number;
}
