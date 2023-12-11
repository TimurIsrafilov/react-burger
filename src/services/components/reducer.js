import { v4 as uuidv4 } from "uuid";

import {
  ADD_INGREDIENTS,
  DELETE_INGREDIENTS,
  MOVE_INGREDIENTS,
} from "./actions";

const initialState = {
  bun: null,
  orderedIngredients: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENTS: {
      return {
        ...state,
        bun:
          action.payload.item.type === "bun" ? action.payload.item.type : null,
        orderedIngredients:
          action.payload.item.type === "bun"
            ? [
                ...state.orderedIngredients.filter(
                  (element) => element.type !== action.payload.item.type
                ),
                action.payload.item,
              ].map((v) => ({ ...v, uniqueId: uuidv4() }))
            : [...state.orderedIngredients, action.payload.item].map((v) => ({
                ...v,
                uniqueId: uuidv4(),
              })),
      };
    }

    case DELETE_INGREDIENTS: {
      return {
        ...state,
        orderedIngredients: state.orderedIngredients.filter(
          (ingredient) => ingredient.uniqueId !== action.payload
        ),
      };
    }

    case MOVE_INGREDIENTS: {
      const ingredients = [...state.orderedIngredients];
      ingredients.splice(
        action.payload.dragIndex,
        0,
        ingredients.splice(action.payload.hoverIndex, 1)[0]
      );
      return {
        ...state,
        orderedIngredients: ingredients,
      };
    }

    default:
      return state;
  }
};
