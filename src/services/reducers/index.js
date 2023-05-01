import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./feedReducer";
import { orderReducer } from "./orderReducer";
import { ingredientReducer } from "./ingredientReducer";
import burgerConstructionSlice from "./burgerConstructionSlice";
import forgotPasswordSlice from "./forgotPasswordSlice";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  orders: orderReducer,
  orderList: burgerConstructionSlice,
  getEmail: forgotPasswordSlice,
})