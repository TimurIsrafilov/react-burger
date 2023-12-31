import api from "../../utils/api";

export const LOAD_ORDER_SUCCESS = "LOAD_ORDER_SUCCESS";
export const CLOSE_ORDER = "CLOSE_ORDER";
export const ORDER_LOADING = "ORDER_LOADING";
export const ORDER_ERROR = "ORDER_ERROR";

export const loadOrder = (order) => (dispatch) => {
  dispatch({ type: ORDER_LOADING });
  return api
    .getOrderNumber(order)
    .then((res) => {
      dispatch({
        type: LOAD_ORDER_SUCCESS,
        payload: res,
      });
    })
    .catch((error) => {
      dispatch({
        type: ORDER_ERROR,
        payload: error.message,
      });
    });
};

export const closeOrder = () => (dispatch) => {
  dispatch({
    type: CLOSE_ORDER,
  });
};
