import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TIngredientProps from "../../utils/TIngredientProps.types";
import { TIngredientWithKey } from "../../components/BurgerConstructor/BurgerConstructor";

type TBurgerConstructionState = {
  bunItem: TIngredientProps & {type: 'bun'} | null,
  ingredientsList: Array<TIngredientWithKey>
}

const initialState: TBurgerConstructionState = {
  bunItem: null,
  ingredientsList: [],
}

export const burgerConstructionSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredientWithKey>) => {
      state.ingredientsList.push({
        ...action.payload,
      });
    },
    addBun: (state, action: PayloadAction<TIngredientProps>) => {
      state.bunItem = { 
        ...action.payload, 
        type: 'bun' 
      };
    },
    moveIngredient: (state, action: PayloadAction<{dragElIndex: number, hoverElIndex: number}>) => {
      const dragConstructor = [...state.ingredientsList];
      dragConstructor.splice(
        action.payload.dragElIndex,
        0,
        dragConstructor.splice(action.payload.hoverElIndex, 1)[0]
      );
      state.ingredientsList = dragConstructor;
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.ingredientsList.length) {
        state.ingredientsList.splice(action.payload, 1);
      }
    },
    resetIngredients: (state) => {
      state.ingredientsList = [];
      state.bunItem = null;
    },
  }
})

export const { addIngredient, addBun, moveIngredient, deleteIngredient, resetIngredients } = burgerConstructionSlice.actions;
export default burgerConstructionSlice.reducer;