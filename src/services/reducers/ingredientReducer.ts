import TIngredientProps from "../../utils/TIngredientProps.types";

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

type OpenModalAction = {
  type: typeof OPEN_MODAL;
  ingredient: TIngredientProps
}

type CloseModalAction = {
  type: typeof CLOSE_MODAL;
  ingredient: null;
}

type ModalActions = OpenModalAction | CloseModalAction;

type IngredientState = {
  ingredient: TIngredientProps | null;
}

const initalState: IngredientState = {
  ingredient: null,
}

export const ingredientReducer = (state: IngredientState = initalState, action: ModalActions) => {
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