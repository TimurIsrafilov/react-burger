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
      return {
        ...state,
        orderedIngredients: [...state.orderedIngredients]
          .splice(action.payload.dragIndex, 1)
          .splice(
            action.payload.hoverIndex,
            0,
            state.orderedIngredients[action.payload.dragIndex]
          ),
      };
    }

    default:
      return state;
  }
};
