import {
  IGetRecipeParams,
  IGetRecipeReviewDetailParams,
  IGetRecipeReviewsParams,
  IGetRecipeSearchParams,
  IGetSortedRecipeOption,
  IRecipeFilterParams,
  IRecipeIngredientParams,
  IRecipeProcessBySequenceParams,
  IRecipeProcessListParams,
  ISearchFoodParams,
} from '@/types/api';

export const RECIPE_QUERY_KEY = {
  ALL: () => ['recipe'],
  LIST: () => [...RECIPE_QUERY_KEY.ALL(), 'list'],
  LIST_WITH_PARAMS: (
    params: IGetRecipeParams,
    option: IGetSortedRecipeOption & { isMine: boolean },
  ) => [...RECIPE_QUERY_KEY.LIST(), { ...params, ...option }],
  LIST_BY_USER_ID: (userId: number) => [...RECIPE_QUERY_KEY.LIST(), 'user', { userId }],
  LIST_BY_FILTER: (filterCondition: Partial<IRecipeFilterParams> | null) => [
    ...RECIPE_QUERY_KEY.LIST(),
    'filter',
    { filterCondition },
  ],
  LIST_BY_FOOD: (keywords: string[]) => [...RECIPE_QUERY_KEY.LIST(), 'food', { ...keywords }],
  SEARCH_WITH_PARAMS: (params: IGetRecipeSearchParams) => [
    ...RECIPE_QUERY_KEY.LIST(),
    'search',
    { ...params },
  ],
  DETAIL: (recipeId: number) => ['recipe', 'detail', { recipeId }],
  // ingredient
  INGREDIENT_LIST: (recipeId: number) => ['recipe', 'ingredient', 'list', { recipeId }],
  INGREDIENT_LIST_WITH_PARAMS: ({ recipeId, ...params }: IRecipeIngredientParams) => [
    ...RECIPE_QUERY_KEY.INGREDIENT_LIST(recipeId),
    { ...params },
  ],
  // process
  PROCESS_LIST: (recipeId: number) => ['recipe', 'process', 'list', { recipeId }],
  PROCESS_LIST_WITH_PARAMS: ({ recipeId, ...params }: IRecipeProcessListParams) => [
    ...RECIPE_QUERY_KEY.PROCESS_LIST(recipeId),
    { ...params },
  ],
  PROCESS: (recipeId: number) => ['recipe', 'process', { recipeId }],
  PROCESS_WITH_PARAMS: ({ recipeId, ...params }: IRecipeProcessBySequenceParams) => [
    ...RECIPE_QUERY_KEY.PROCESS(recipeId),
    { ...params },
  ],
  // liked recipes
  LIKE: (recipeId: number) => ['recipe', 'like', { recipeId }],
  MY_LIKE_LIST: () => [...RECIPE_QUERY_KEY.LIST(), 'like', 'my'],
  MY_LIKE_LIST_WITH_PARAMS: (params: IGetRecipeParams, option: IGetSortedRecipeOption) => [
    ...RECIPE_QUERY_KEY.MY_LIKE_LIST(),
    { ...params, ...option },
  ],
  // bookmarked recipes
  BOOKMARK: (recipeId: number) => ['recipe', 'bookmark', { recipeId }],
  MY_BOOKMARK_LIST: () => [...RECIPE_QUERY_KEY.LIST(), 'bookmark', 'my'],
  MY_BOOKMARK_LIST_WITH_PARAMS: (params: IGetRecipeParams, option: IGetSortedRecipeOption) => [
    ...RECIPE_QUERY_KEY.MY_BOOKMARK_LIST(),
    { ...params, ...option },
  ],
  // reviews
  REVIEW_LIST: () => [...RECIPE_QUERY_KEY.LIST(), 'review'],
  REVIEW_LIST_BY_RECIPE_ID: (recipeId: number) => [...RECIPE_QUERY_KEY.REVIEW_LIST(), { recipeId }],
  REVIEW_LIST_WITH_PARAMS: ({ recipeId, ...params }: IGetRecipeReviewsParams) => [
    ...RECIPE_QUERY_KEY.REVIEW_LIST_BY_RECIPE_ID(recipeId),
    { ...params },
  ],
  MY_REVIEW_LIST: () => [...RECIPE_QUERY_KEY.REVIEW_LIST(), 'my'],
  REVIEW_DETAIL: ({ recipeId, reviewId }: IGetRecipeReviewDetailParams) => [
    'recipe',
    'review',
    'detail',
    recipeId,
    reviewId,
  ],
  // memo
  MEMO: (recipeId: number) => ['recipe', 'memo', { recipeId }],
};

export const FEED_QUERY_KEY = {
  ALL: () => ['feed'],
  LIST: () => [...FEED_QUERY_KEY.ALL(), 'list'],
  LIST_BY_USER_ID: (userId: number) => [...FEED_QUERY_KEY.LIST(), 'user', { userId }],
  DETAIL: (logId: number) => [...FEED_QUERY_KEY.ALL(), 'detail', { logId }],
  // comment
  COMMENT_LIST: (logId: number) => [...FEED_QUERY_KEY.ALL(), 'comment', 'list', { logId }],
  COMMENT_REPLY_LIST: (logId: number, commentId: number) => [
    ...FEED_QUERY_KEY.ALL(),
    'comment',
    'reply',
    'list',
    { logId },
    { commentId },
  ],
};

export const CHAT_QUERY_KEY = {
  ALL: () => ['chat'],
  // chat-room
  MY_CHAT_ROOM_LIST: () => [...CHAT_QUERY_KEY.ALL(), 'list', 'room', 'my'],
  // message
  MESSAGE_LIST: (roomId: string) => [...CHAT_QUERY_KEY.ALL(), 'list', 'message', { roomId }],
};

export const USER_QUERY_KEY = {
  ALL: () => ['user'],
  LIST: () => [...USER_QUERY_KEY.ALL(), 'list'],
  SEARCH: (keyword: string) => [...USER_QUERY_KEY.LIST(), 'search', { keyword }],
  INFO: () => [...USER_QUERY_KEY.ALL(), 'info'],
  PROFILE_INFO: (userId: number) => [...USER_QUERY_KEY.ALL(), 'profile', 'info', { userId }],
  // follower
  FOLLOWER: (userId: number) => [...USER_QUERY_KEY.ALL(), 'follower', { userId }],
  FOLLOWER_LIST: (userId: number) => [...USER_QUERY_KEY.FOLLOWER(userId), 'list'],
  FOLLOWER_COUNT: (userId: number) => [...USER_QUERY_KEY.FOLLOWER(userId), 'count'],
  // following
  FOLLOWING: (userId: number) => [...USER_QUERY_KEY.ALL(), 'following', { userId }],
  FOLLOWING_LIST: (userId: number) => [...USER_QUERY_KEY.FOLLOWING(userId), 'list'],
  FOLLOWING_COUNT: (userId: number) => [...USER_QUERY_KEY.FOLLOWING(userId), 'count'],
  // shopping
  SHOPPING_LIST: () => [...USER_QUERY_KEY.ALL(), 'shopping', 'list'],
  // license
  LiCENSE: () => [...USER_QUERY_KEY.ALL(), 'license'],
  LICENSE_COUNT: () => [...USER_QUERY_KEY.LiCENSE(), 'count'],
  LICENSE_LIST: (licenseType: string) => [...USER_QUERY_KEY.LiCENSE(), 'list', { licenseType }],
  // point
  POINT: () => [...USER_QUERY_KEY.ALL(), 'point'],
  POINT_HISTORY: (type: string) => [...USER_QUERY_KEY.ALL(), 'point', 'history', { type }],
};

export const FOOD_QUERY_KEY = {
  ALL: () => ['food'],
  LIST: () => [...FOOD_QUERY_KEY.ALL(), 'list'],
  SEARCH_WITH_PARAMS: (params: ISearchFoodParams) => [
    ...FOOD_QUERY_KEY.LIST(),
    'search',
    { ...params },
  ],
};
