import { ADD_INGREDIENTS, DELETE_INGREDIENTS } from "./actions";

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
              ]
            : [...state.orderedIngredients, action.payload.item],
      };
    }
    case DELETE_INGREDIENTS: {
      return {
        ...state,
        orderedIngredients: state.orderedIngredients.filter(
          (ingredient) => ingredient.id !== action.payload
        ),
      };
    }
    default:
      return state;
  }
};
