import {
  LOADING_INGREDIENTS,
  ERROR_INGREDIENTS,
  LOAD_INGREDIENTS_SUCCESS,
} from "./actions";

const initialState = {
  ingredients: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_INGREDIENTS: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ERROR_INGREDIENTS: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case LOAD_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload.data,
        loading: false,
      };
    default:
      return state;
  }
};
