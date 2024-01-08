import { createSlice } from "@reduxjs/toolkit";

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    showIngredient: null,
  },
  reducers: {
    showIngredient: {
      reducer: (state, action) => {
        state.showIngredient = action.payload;
      },
    },
    closeIngredient: {
      reducer: (state) => {
        state.showIngredient = null;
      },
    },
  },
});

export const reducer = ingredientSlice.reducer;
export const { showIngredient, closeIngredient } = ingredientSlice.actions;
