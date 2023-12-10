import { SHOW_INGREDIENTS, CLOSE_INGREDIENTS } from "./actions";

const initialState = {
  showIngredient: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENTS: {
      return {
        ...state,
        showIngredient: action.payload,
      };
    }
    case CLOSE_INGREDIENTS: {
      return {
        ...state,
        showIngredient: null,
      };
    }
    default:
      return state;
  }
};
