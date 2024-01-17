import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadIngredients } from "./actions";
import type { RootState } from "../store";

import { TypeIngredienInfo } from "../../utils/types";

interface IntIngredientsState {
  ingredients: TypeIngredienInfo | Array<TypeIngredienInfo>;
  loading: boolean;
  error: unknown;
}

const initialState: IntIngredientsState = {
  ingredients: [],
  loading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload.data;
      });
  },
});

export const reducer = ingredientsSlice.reducer;

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectLoading = (state: RootState) => state.ingredients.loading;
export const selectError = (state: RootState) => state.ingredients.error;
