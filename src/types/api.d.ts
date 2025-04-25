// NOTE: error type
export interface IApiErrorResponse {
  code: string;
  message: string;
}
export interface IRecipeResponse {
  recipe_id: number;
}

export type RegisterFormValues = {
  email: string;
  password: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};
