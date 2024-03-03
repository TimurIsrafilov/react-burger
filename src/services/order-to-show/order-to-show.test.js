import { loadOrderToShow } from "./actions";
import reducer, { initialState } from "./reducer";
import { errorMessage, orderToShowData } from "../../utils/test-constants";

describe("test order-to-show reducer", () => {
  it("should handle loadOrderToShow.pending", () => {
    const state = reducer(initialState, loadOrderToShow.pending());

    expect(state.loading).toBeTruthy();
    expect(state.error).toBeNull();
  });

  it("should handle loadOrderToShow.rejected", () => {
    const state = reducer(initialState, {
      type: loadOrderToShow.rejected,
      payload: errorMessage,
    });

    expect(state.loading).toBeFalsy();
    expect(state.error).toBe(errorMessage);
  });

  it("should handle loadOrderToShow.fulfilled", () => {
    const state = reducer(initialState, {
      type: loadOrderToShow.fulfilled,
      payload: orderToShowData,
    });

    expect(state.loading).toBeFalsy();
    expect([state.ordertoshow]).toEqual(orderToShowData.orders);
  });
});
