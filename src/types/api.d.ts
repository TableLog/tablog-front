import { ECookTime, EPrice } from './enum';

// NOTE: error type
export type APIErrorResponse = {
  message: ServiceErrorCode;
  status?: HttpStatusCode;
  name: string;
};

export interface PaginationData {
  hasNext: boolean;
}

export type TUserData = {
  id: number;
  userName: string;
  userRole: EUserRole;
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

// recipe
interface IRecipe {
  id: number;
  title: string;
  intro: string;
  recipeCategoryList: ['밥요리', '아침'];
  starCount: number;
  star: number;
  price: keyof typeof EPrice;
  cookingTime: keyof typeof ECookTime;
  totalCal: number;
  isPaid: false;
  recipePoint: number;
  reviewCount: number;
  imageUrl: string;
  likeCount: number;
  isSaved: boolean;
  user: string;
  isWriter: boolean;
}

export interface IGetRecipeParams {
  isPaid: boolean;
  pageNumber: number;
}

export interface IGetSortedRecipeOption {
  sortOption: string;
}

export interface IRecipeList extends IRecipe {
  memo: string | null;
}

export interface IUpdateRecipeParams {
  recipeId: number;
}

export interface IDeleteRecipeParams {
  recipeId: number;
}

export interface IRecipeDetailParams {
  recipeId: number;
}

export interface IRecipeIngredientParams {
  recipeId: number;
  pageNumber: number;
}

export interface IRecipeProcessListParams {
  recipeId: number;
  page: number;
}

export interface IRecipeProcessBySequenceParams {
  recipeId: number;
  sequence: number;
}

export interface IRecipeListResponse extends PaginationData {
  contents: IRecipeList[];
}

export interface IRecipeDetailResponse extends IRecipe {
  hasPurchased: boolean;
}

export interface IRecipeIngredientResponse
  extends Pick<IRecipe, 'title' | 'imageUrl'>,
    PaginationData {
  recipeFoods: {
    id: number;
    amount: number;
    recipeFoodUnit: string;
    foodId: number;
    foodName: string;
    cal: number;
    isChecked: boolean;
  }[];
}

export interface IRecipeProcessesResponse extends PaginationData {
  recipeProcesses: IRecipeProcessResponse[];
  totalCount: number;
}

export interface IRecipeProcessResponse {
  recipeProcesses: {
    id: number;
    sequence: number;
    rpTitle: string;
    description: string;
    recipeProcessImageUrls: string[];
  };
  hasPrev: boolean;
  hasNext: boolean;
}

// food
export interface ISearchFoodParams {
  search: string;
  page: number;
}

export interface ISearchFoodResponse extends PaginationData {
  foods: IFood[];
}

interface IFood {
  id: number;
  foodName: string;
  foodUnit: string;
  cal: number;
}

// like
export interface IGetRecipeLikeParams {
  recipeId: number;
}

export type IGetRecipeLikeResponse = boolean;

export interface IAddLikeRecipeParams {
  recipeId: number;
}

export interface ICancelLikeRecipeParams {
  recipeId: number;
}

// bookmark
export interface IGetRecipeBookmarkParams {
  recipeId: number;
}

export type IGetRecipeBookmarkResponse = boolean;

export interface IAddBookmarkRecipeParams {
  recipeId: number;
}

export interface ICancelBookmarkRecipeParams {
  recipeId: number;
}
