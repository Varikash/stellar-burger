import { combineReducers } from "@reduxjs/toolkit";
import { feedReducer } from "./api-feed";

export const rootReducer = combineReducers({
  feed: feedReducer,
})