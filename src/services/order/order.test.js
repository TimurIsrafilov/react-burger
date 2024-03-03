import { loadOrder } from "./actions";
import reducer, { initialState } from "./reducer";
import { errorMessage, orderData } from "../../utils/test-constants";

describe("test order reducer", () => {
  it("should handle loadOrder.pending", () => {
    const state = reducer(initialState, loadOrder.pending());

    expect(state.loading).toBeTruthy();
    expect(state.error).toBeNull();
  });

  it("should handle loadOrder.rejected", () => {
    const state = reducer(initialState, {
      type: loadOrder.rejected,
      payload: errorMessage,
    });

    expect(state.loading).toBeFalsy();
    expect(state.error).toBe(errorMessage);
  });

  it("should handle loadOrder.fulfilled", () => {
    const state = reducer(initialState, {
      type: loadOrder.fulfilled,
      payload: orderData,
    });

    expect(state.loading).toBeFalsy();
    expect(state.order).toEqual(orderData);
  });
});
