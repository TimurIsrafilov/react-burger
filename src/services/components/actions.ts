import { TypeUniqueIngredienInfo } from "../../types/types";

export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const DELETE_INGREDIENTS = "DELETE_INGREDIENTS";

export const addIngredient =
  (item: TypeUniqueIngredienInfo) =>
  (
    dispatch: (arg0: { type: string; payload: TypeUniqueIngredienInfo }) => void
  ) => {
    dispatch({
      type: ADD_INGREDIENTS,
      payload: item,
    });
  };

export const deleteIngredient =
  (id: string) =>
  (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: DELETE_INGREDIENTS,
      payload: id,
    });
  };
