import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { TypeUniqueIngredientInfo } from "../../types/types";

interface IntOrderedIngredientState {
  bun: TypeUniqueIngredientInfo | null;
  orderedIngredients: Array<TypeUniqueIngredientInfo>;
}

const initialState: IntOrderedIngredientState = {
  bun: null,
  orderedIngredients: [],
};

export const constructorSlice = createSlice({
  name: "burgercomponents",
  initialState,

  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === "bun") {
        state.bun = action.payload;
      } else {
        state.orderedIngredients.push(action.payload);
      }
    },

    deleteIngredient: (state, action) => {
      state.orderedIngredients = state.orderedIngredients.filter(
        (ingredient: TypeUniqueIngredientInfo) =>
          ingredient.uniqueId !== action.payload
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

type TypeConstructorActionCreators = typeof constructorSlice.actions;
export type TypeBurgerConstructorActions = ReturnType<
  TypeConstructorActionCreators[keyof TypeConstructorActionCreators]
>;

export const reducer = constructorSlice.reducer;
export const { addIngredient, deleteIngredient, moveIngredient } =
  constructorSlice.actions;

export const selectOrderedIngredients = (state: RootState) =>
  state.components.orderedIngredients;
export const selectedBun = (state: RootState) => state.components.bun;

export default reducer;
