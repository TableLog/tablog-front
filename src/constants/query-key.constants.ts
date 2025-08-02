import {
  IGetRecipeParams,
  IGetRecipeReviewDetailParams,
  IGetRecipeReviewsParams,
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
export const RECIPE_INGREDIENT_LIST_QUERY_KEY_WITH_PARAMS = ({
  recipeId,
  ...params
}: IRecipeIngredientParams) => [RECIPE_INGREDIENT_QUERY_KEY, recipeId, { ...params }];
export const RECIPE_PROCESS_LIST_QUERY_KEY_WITH_PARAMS = (params: IRecipeProcessListParams) => [
  'recipe-process',
  { ...params },
];
export const RECIPE_PROCESS_QUERY_KEY_WITH_PARAMS = ({
  recipeId,
  ...params
}: IRecipeProcessBySequenceParams) => ['recipe-process', recipeId, { ...params }];
export const RECIPE_LIKE_QUERY_KEY = (recipeId: number) => [
  ...RECIPE_DETAIL_QUERY_KEY(recipeId),
  'like',
];
export const RECIPE_BOOKMARK_QUERY_KEY = (recipeId: number) => [
  ...RECIPE_DETAIL_QUERY_KEY(recipeId),
  'bookmark',
];
export const RECIPE_REVIEW_LIST_QUERY_KEY = (recipeId: IGetRecipeReviewsParams['recipeId']) => [
  'recipe-review',
  recipeId,
];
export const RECIPE_REVIEW_LIST_QUERY_KEY_WITH_PARAMS = ({
  recipeId,
  ...params
}: IGetRecipeReviewsParams) => ['recipe-review', recipeId, { ...params }];
export const RECIPE_MEMO_QUERY_KEY = (recipeId: number) => ['recipe-memo', recipeId];
export const RECIPE_REVIEW_DETAIL_QUERY_KEY = (params: IGetRecipeReviewDetailParams) => [
  'recipe-review-detail',
  params,
];

export const RECIPE_INGREDIENT_QUERY_KEY = 'recipe-ingredient';
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
export const FEED_LIST_BY_USER_ID_QUERY_KEY = 'feed-list-by-user-id';
export const USER_LIST_QUERY_KEY = 'user-list';
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

export const SHOPPING_LIST_QUERY_KEY = 'shopping-list';

// license
export const LICENSE_COUNT_QUERY_KEY = 'license-count';
export const LICENSE_LIST_QUERY_KEY = 'license-list';

// recipe review
export const MY_RECIPE_REVIEW_LIST_QUERY_KEY = 'my-recipe-review-list';

// point history
export const POINT_HISTORY_QUERY_KEY = 'point-history';
