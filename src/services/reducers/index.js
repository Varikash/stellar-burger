import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./feedReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: orderReducer,
})