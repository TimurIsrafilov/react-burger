import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { TypeUniqueIngredientInfo } from "../../types/types";

interface IntOrderedIngredientState {
  bun: string | null;
  orderedIngredients: Array<TypeUniqueIngredientInfo>;
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
    addIngredient: (state, action: PayloadAction<TypeUniqueIngredientInfo>) => {
      state.bun =

        action.payload.item.type === "bun" ? action.payload.item.type : null;

        state.orderedIngredients = action.payload.item.type === "bun"
          ? [
              ...state.orderedIngredients.filter(
                (element: TypeUniqueIngredientInfo) =>
      
                  element.type !== action.payload.item.type
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

type TConstructorActionCreators = typeof constructorSlice.actions;
type TBurgerConstructorActions = ReturnType<TConstructorActionCreators[keyof TConstructorActionCreators]>;

export const reducer = constructorSlice.reducer;
export const { addIngredient, deleteIngredient, moveIngredient } =
  constructorSlice.actions;
   //@ts-ignore
export const selectOrderedIngredients = (state: RootState) => state.burgercomponents.orderedIngredients;
