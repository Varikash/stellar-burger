import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  bunItem: null,
  ingredientsList: [],
}

export const burgerConstructionSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const key = uuidv4();
      state.ingredientsList.push({
        ...action.payload,
        key
      });
    },
    addBun: (state, action) => {
      state.bunItem = { 
        ...action.payload, 
        type: 'bun' 
      };
    },
    moveIngredient: (state, action) => {
      const dragConstructor = [...state.ingredientsList];
      dragConstructor.splice(
        action.payload.dragElIndex,
        0,
        dragConstructor.splice(action.payload.hoverElIndex, 1)[0]
      );
      state.ingredientsList = dragConstructor;
      state.highlightedIndex = action.payload.hoverElIndex;
    },
    deleteIngredient: (state, action) => {
      state.ingredientsList.splice(action.index, 1);
    },
    resetIngredients: (state) => {
      state.ingredientsList = [];
      state.highlightedIndex = null;
    },
    resetHighlightedIndex: (state) => {
      state.highlightedIndex = null;
    }
  }
})

export const { addIngredient, addBun, moveIngredient, deleteIngredient, resetIngredients } = burgerConstructionSlice.actions;
export default burgerConstructionSlice.reducer;