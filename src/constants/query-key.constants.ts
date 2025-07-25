import {
  IGetRecipeParams,
  IGetSortedRecipeOption,
  IRecipeIngredientParams,
  IRecipeProcessBySequenceParams,
  IRecipeProcessListParams,
} from '@/types/api';

export const RECIPE_LIST_QUERY_KEY = ['recipe-list'];
export const RECIPE_LIST_OPTIONS_QUERY_KEY = (
  params: IGetRecipeParams,
  option: IGetSortedRecipeOption & { isMine: boolean },
) => [...RECIPE_LIST_QUERY_KEY, { ...params, ...option }];

export const RECIPE_DETAIL_QUERY_KEY = (recipeId: number) => ['recipe-detail', { recipeId }];
export const RECIPE_INGREDIENT_LIST_QUERY_KEY = (params: IRecipeIngredientParams) => [
  'recipe-ingredient',
  { ...params },
];
export const RECIPE_PROCESS_LIST_QUERY_KEY = (params: IRecipeProcessListParams) => [
  'recipe-process',
  { ...params },
];
export const RECIPE_PROCESS_QUERY_KEY = (params: IRecipeProcessBySequenceParams) => [
  'recipe-process',
  { ...params },
];
export const RECIPE_LIKE_QUERY_KEY = (recipeId: number) => [
  ...RECIPE_DETAIL_QUERY_KEY(recipeId),
  'like',
];
export const RECIPE_BOOKMARK_QUERY_KEY = (recipeId: number) => [
  ...RECIPE_DETAIL_QUERY_KEY(recipeId),
  'bookmark',
];
export const FOOD_LIST_QUERY_KEY = 'food-list';
export const USER_INFO_QUERY_KEY = 'user-info';
export const FEED_LIST_QUERY_KEY = 'feed-list';
export const FEED_QUERY_KEY = 'feed';
export const FEED_COMMENT_LIST_QUERY_KEY = 'feed-comment-list';
export const FOLLOWING_COUNT_QUERY_KEY = 'following-count';
export const FOLLOWER_COUNT_QUERY_KEY = 'follower-count';
export const PROFILE_INFO_QUERY_KEY = 'profile-info';
export const FOLLOWER_LIST_QUERY_KEY = 'follower-list';
export const FOLLOWING_LIST_QUERY_KEY = 'following-list';
export const RECIPE_LIST_BY_USER_ID_QUERY_KEY = 'recipe-list-by-user-id';
export const RECIPE_LIST_BY_FILTER_QUERY_KEY = 'recipe-list-by-filter';
export const RECIPE_LIST_BY_FOOD_QUERY_KEY = 'recipe-list-by-food';
export const BOOKMARK_LIST_QUERY_KEY = 'bookmark-list';

// my
export const MY_LIKE_LIST_QUERY_KEY = ['my-like-list'];

export const MY_LIKE_LIST_OPTIONS_QUERY_KEY = (
  params: IGetRecipeParams,
  option: IGetSortedRecipeOption,
) => [...MY_LIKE_LIST_QUERY_KEY, { ...params, ...option }];

export const MY_BOOKMARK_LIST_QUERY_KEY = ['my-bookmark-list'];

export const MY_BOOKMARK_LIST_OPTIONS_QUERY_KEY = (
  params: IGetRecipeParams,
  option: IGetSortedRecipeOption,
) => [...MY_BOOKMARK_LIST_QUERY_KEY, { ...params, ...option }];
