import reducer, {
  addIngredient,
  deleteIngredient,
  initialState,
  moveIngredient,
} from "./reducer";
import {
  constructorUniqueIngredientData,
  reverseConstructorUniqueIngredientsData,
  uniqueIngredientData,
  uniqueIngredientDataFirst,
  uniqueIngredientDataSecond,
} from "../../utils/test-constants";

describe("test components reducer", () => {
  it("should handle addIngredient", () => {
    const state = reducer(initialState, {
      type: addIngredient,
      payload: uniqueIngredientData,
    });

    expect(state.orderedIngredients).toEqual(constructorUniqueIngredientData);
  });

  it("should handle deleteIngredient", () => {
    const newInitialState = reducer(initialState, {
      type: addIngredient,
      payload: uniqueIngredientData,
    });

    const state = reducer(newInitialState, {
      type: deleteIngredient,
      payload: uniqueIngredientData.uniqueId,
    });

    expect(state.orderedIngredients).toEqual([]);
  });

  it("should handle moveIngredient", () => {
    const newInitialState = reducer(initialState, {
      type: addIngredient,
      payload: uniqueIngredientDataFirst,
    });

    const newestInitialState = reducer(newInitialState, {
      type: addIngredient,
      payload: uniqueIngredientDataSecond,
    });

    const state = reducer(newestInitialState, {
      type: moveIngredient,
      payload: {
        dragIndex: 0,
        hoverIndex: 1,
      },
    });

    expect(state.orderedIngredients).toEqual(
      reverseConstructorUniqueIngredientsData
    );
  });
});
