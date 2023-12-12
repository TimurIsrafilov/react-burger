import api from "../../utils/api";

export const LOADING_ORDERS = "LOADING_ORDERS";
export const ERROR_ORDERS = "ERROR_ORDERS";
export const LOAD_ORDERS_SUCCESS = "LOAD_ORDERS_SUCCESS";
export const CLOSE_ORDERS = "CLOSE_ORDERS";

export const loadOrder = (order) => (dispatch) => {
  dispatch({ type: LOADING_ORDERS });
  return api
    .getOrderNumber(order)
    .then((res) => {
      dispatch({
        type: LOAD_ORDERS_SUCCESS,
        payload: res,
      });
    })
    .catch((error) => {
      dispatch({
        type: ERROR_ORDERS,
        payload: error.message,
      });
    });
};

export const closeOrder = () => (dispatch) => {
  dispatch({
    type: CLOSE_ORDERS,
  });
};
