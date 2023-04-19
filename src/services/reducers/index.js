import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./feedReducer";
import { orderReducer } from "./orderReducer";
import { ingredientReducer } from "./ingredientReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  orders: orderReducer,
})