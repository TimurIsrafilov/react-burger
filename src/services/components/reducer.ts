import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { TypeUniqueIngredienInfo } from "../../utils/types";

interface IntOrderedIngredientState {
  bun: string | null;
  orderedIngredients: Array<TypeUniqueIngredienInfo>;
}

const initialState: IntOrderedIngredientState = {
  bun: null,
  orderedIngredients: [],
};

export const constructorSlice = createSlice({
  name: "burgercomponents",
  initialState: {
    bun: null,
    orderedIngredients: [],
  },

  reducers: {
    addIngredient: (state, action) => {
      state.bun =
        action.payload.item.type === "bun" ? action.payload.item.type : null;
    //@ts-ignore
      state.orderedIngredients =
        action.payload.item.type === "bun"
          ? [
              ...state.orderedIngredients.filter(
              //@ts-ignore
                (element) => element.type !== action.payload.item.type
              ),
              { ...action.payload.item, uniqueId: action.payload.uniqueId },
            ]
          : [
              ...state.orderedIngredients,
              { ...action.payload.item, uniqueId: action.payload.uniqueId },
            ];
    },

    deleteIngredient: (state, action) => {
      state.orderedIngredients = state.orderedIngredients.filter(
      //@ts-ignore
        (ingredient) => ingredient.uniqueId !== action.payload
      );
    },

    moveIngredient: (state, action) => {
      const ingredients = state.orderedIngredients;
      ingredients.splice(
        action.payload.dragIndex,
        0,
        ingredients.splice(action.payload.hoverIndex, 1)[0]
      );

      state.orderedIngredients = ingredients;
    },
  },
});

export const reducer = constructorSlice.reducer;
export const { addIngredient, deleteIngredient, moveIngredient } =
  constructorSlice.actions;

export const selectOrderedIngredients = (state: RootState) =>
  state.burgercomponents.orderedIngredients;
