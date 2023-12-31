import {
  LOAD_INGREDIENTS_SUCCESS,
  INGREDIENTS_LOADING,
  INGREDIENTS_ERROR,
} from "./actions";

const initialState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        loading: false,
      };
    case INGREDIENTS_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case INGREDIENTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
