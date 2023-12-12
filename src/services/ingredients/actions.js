import api from "../../utils/api";

export const LOADING_INGREDIENTS = "LOADING_INGREDIENTS";
export const ERROR_INGREDIENTS = "ERROR_INGREDIENTS";
export const LOAD_INGREDIENTS_SUCCESS = "LOAD_INGREDIENTS_SUCCESS";

export const loadIngredients = () => (dispatch) => {
  dispatch({ type: LOADING_INGREDIENTS });
  return api
    .getingredients()
    .then((res) => {
      dispatch({
        type: LOAD_INGREDIENTS_SUCCESS,
        payload: res,
      });
    })
    .catch((error) => {
      dispatch({
        type: ERROR_INGREDIENTS,
        payload: error.message,
      });
    });
};
