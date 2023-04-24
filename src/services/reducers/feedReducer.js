import { 
  GET_FEED, 
  GET_FEED_FAILED, 
  GET_FEED_SUCCESS 
} from "../actions/fetchIngredients";

const initialState = {
  loadingIngredients: false,
  errorLoadingIngredients: false,
  ingredientsLoaded: false,
  ingredients: []
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED: {
      return {
        ...state,
        loadingIngredients: true,
        errorLoadingIngredients: false,
        ingredientsLoaded: false,
      };
    }
    case GET_FEED_SUCCESS: {
      return { 
        ...state, 
        ingredients: action.ingredients, 
        loadingIngredients: false,
        errorLoadingIngredients: false,
        ingredientsLoaded: true,
            };
    }
    case GET_FEED_FAILED: {
      return { 
        ...state, 
        errorLoadingIngredients: true, 
        loadingIngredients: false, 
        ingredientsLoaded: false
            };
    }
        default: {
            return state
        }
    }
} 


