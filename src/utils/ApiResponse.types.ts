import TIngredientProps from "./TIngredientProps.types";

type BaseResponse = {
  success: boolean;
  message?: string;
}

type AuthResponse = BaseResponse & {
  accessToken: string;
  refreshToken: string;
}

type User = {
  email: string;
  name: string;
}

type Owner = User & {
  createdAt: string;
  updatedAt: string;
}

type AuthUserResponse = AuthResponse & {
  user: User;
}


export type Order = {
  ingredients: TIngredientProps[];
  _id: string;
  owner: Owner;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}

export type FetchOrder = BaseResponse & {
  name: string;
  order: Order;
}

export type FetchIngredients = BaseResponse & {
  data: TIngredientProps[];
}


export type LogOut = BaseResponse;
export type SendNewPass = BaseResponse;
export type SendEmail = BaseResponse;
export type RefreshUser = AuthResponse;
export type RegisterUser = AuthUserResponse;
export type LogginUser = AuthUserResponse;
export type FetchUser = BaseResponse & {
  user: User;
}
