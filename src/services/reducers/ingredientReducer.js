import { 
  OPEN_MODAL, 
  CLOSE_MODAL
} from "../actions/ingredientAction"

const initalState = {
  ingredient: null,
}

export const ingredientReducer = (state = initalState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        ingredient: action.ingredient
      }
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        ingredient: null
      }
    }

    default: {
      return state
    }
  }
}