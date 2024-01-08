import { createSlice } from "@reduxjs/toolkit";

export const constructorSlice = createSlice({
  name: "burger-components",
  initialState: {
    bun: null,
    orderedIngredients: [],
  },

  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        state.bun =
          action.payload.item.type === "bun" ? action.payload.item.type : null;
        state.orderedIngredients =
          action.payload.item.type === "bun"
            ? [
                ...state.orderedIngredients.filter(
                  (element) => element.type !== action.payload.item.type
                ),
                { ...action.payload.item, uniqueId: action.payload.uniqueId },
              ]
            : [
                ...state.orderedIngredients,
                { ...action.payload.item, uniqueId: action.payload.uniqueId },
              ];
      },
    },

    deleteIngredient: {
      reducer: (state, action) => {
        state.orderedIngredients = state.orderedIngredients.filter(
          (ingredient) => ingredient.uniqueId !== action.payload
        );
      },
    },

    moveIngredient: {
      reducer: (state, action) => {
        const ingredients = state.orderedIngredients;
        ingredients.splice(
          action.payload.dragIndex,
          0,
          ingredients.splice(action.payload.hoverIndex, 1)[0]
        );

        state.orderedIngredients = ingredients;
      },
    },
  },
});

export const reducer = constructorSlice.reducer;
export const { addIngredient, deleteIngredient, moveIngredient } =
  constructorSlice.actions;
