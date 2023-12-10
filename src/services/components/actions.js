export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const DELETE_INGREDIENTS = "DELETE_INGREDIENTS";

export const addIngredient = (item) => (dispatch) => {
      dispatch({
          type: ADD_INGREDIENTS,
          payload: item,
      });
};

export const deleteIngredient = (id) => (dispatch) => {
      dispatch({
          type: DELETE_INGREDIENTS,
          payload: id,
      });
};
