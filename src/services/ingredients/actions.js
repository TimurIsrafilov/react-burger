import api from "../../utils/api";

export const LOAD_INGREDIENTS_SUCCESS = "LOAD_INGREDIENTS_SUCCESS";
export const INGREDIENTS_LOADING = "INGREDIENTS_LOADING";
export const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";

export const loadIngredients = () => (dispatch) => {
  dispatch({ type: INGREDIENTS_LOADING });
  return api
    .getingredients()
    .then((res) => {
      dispatch({
        type: LOAD_INGREDIENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: INGREDIENTS_ERROR,
        payload: error.message,
      });
    });
};
