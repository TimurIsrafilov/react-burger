import {
  LOAD_ORDER_SUCCESS,
  CLOSE_ORDER,
  ORDER_LOADING,
  ORDER_ERROR,
} from "./actions";

const initialState = {
  order: null,
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
      };
    case CLOSE_ORDER: {
      return {
        ...state,
        order: null,
      };
    }
    case ORDER_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ORDER_ERROR: {
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
