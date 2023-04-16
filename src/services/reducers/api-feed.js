import { GET_FEED, GET_FEED_FAILED, GET_FEED_SUCCESS } from "../actions/fetchIngredients";

const initialState = {
  feedRequest: false,
  feedFailed: false,
  ingredients: []
}

export const feedReducer = (state = initialState, action) => {
  console.log('action', action)
  switch (action.type) {
    case GET_FEED: {
      return {
        ...state,
        feedRequest: true,
      };
    }
    case GET_FEED_SUCCESS: {
      return { 
        ...state, 
        feed: action.payload, 
        feedRequest: false 
            };
    }
    case GET_FEED_FAILED: {
      return { 
        ...state, 
        feedFailed: true, 
        feedRequest: false 
            };
    }
        default: {
            return state
        }
    }
} 


