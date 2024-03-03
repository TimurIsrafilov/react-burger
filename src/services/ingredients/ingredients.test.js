import { loadIngredients } from "./actions";
import reducer, { initialState } from "./reducer";
import { errorMessage, ingredientsData } from "../../utils/test-constants";

describe("test ingredients reducer", () => {
  it("should handle loadIngredients.pending", () => {
    const state = reducer(initialState, loadIngredients.pending());

    expect(state.loading).toBeTruthy();
    expect(state.error).toBeNull();
  });

  it("should handle loadIngredients.rejected", () => {
    const state = reducer(initialState, {
      type: loadIngredients.rejected,
      payload: errorMessage,
    });

    expect(state.loading).toBeFalsy();
    expect(state.error).toBe(errorMessage);
  });

  it("should handle loadIngredients.fulfilled", () => {
    const state = reducer(initialState, {
      type: loadIngredients.fulfilled,
      payload: ingredientsData,
    });

    expect(state.loading).toBeFalsy();
    expect(state.ingredients).toEqual(ingredientsData.data);
  });
});
