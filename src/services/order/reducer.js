import { LOADING_ORDERS, ERROR_ORDERS, LOAD_ORDERS_SUCCESS, CLOSE_ORDERS } from "./actions";

const initialState = {
  orderInfo: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ORDERS: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ERROR_ORDERS: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case LOAD_ORDERS_SUCCESS:
      return {
        ...state,
        orderInfo: action.payload,
        loading: false,
      };
      case CLOSE_ORDERS: {
        return {
          ...state,
          orderInfo: null,
        };
      }
    default:
      return state;
  }
};
