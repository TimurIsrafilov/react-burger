import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IntIngredientState {
  ingredient: string | null;
}

const initialState: IntIngredientState = {
  ingredient: null,
};

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    showIngredient: null,
  },
  reducers: {
    showIngredient: (state, action) => {
      state.showIngredient = action.payload;
    },
    closeIngredient: (state) => {
      state.showIngredient = null;
    },
  },
});

export const reducer = ingredientSlice.reducer;
export const { showIngredient, closeIngredient } = ingredientSlice.actions;

export const selectIngredient = (state: RootState) =>
  state.ingredient.ingredient;
