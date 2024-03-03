import { TypeUniqueIngredientInfo } from "../../types/types";
import { AppThunk } from "../store";

export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const DELETE_INGREDIENTS = "DELETE_INGREDIENTS";

type TypeAddIngredientAction = {
  type: typeof ADD_INGREDIENTS;
  payload: TypeUniqueIngredientInfo;
};

type TypeDeleteIngredientAction = {
  type: typeof DELETE_INGREDIENTS;
  payload: string;
};

export type TypeIngredientActions =
  | TypeAddIngredientAction
  | TypeDeleteIngredientAction;

export const addIngredient =
  (item: TypeUniqueIngredientInfo): AppThunk =>
  (dispatch) => {
    dispatch({
      type: ADD_INGREDIENTS,
      payload: item,
    });
  };

export const deleteIngredient =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch({
      type: DELETE_INGREDIENTS,
      payload: id,
    });
  };
