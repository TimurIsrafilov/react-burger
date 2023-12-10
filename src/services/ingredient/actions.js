export const SHOW_INGREDIENTS = "SHOW_INGREDIENTS";
export const CLOSE_INGREDIENTS = "CLOSE_INGREDIENTS";

export const showIngredient = (item) => (dispatch) => {
  dispatch({
    type: SHOW_INGREDIENTS,
    payload: item,
  });
};

export const closeIngredient = () => (dispatch) => {
  dispatch({
    type: CLOSE_INGREDIENTS,
  });
};
