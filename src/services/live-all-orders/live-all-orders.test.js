import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";
import reducer, { initialState } from "./reducer";
import { errorMessage, ordersData } from "../../utils/test-constants";
import { WebsocketStatus } from "../../types/types";

describe("test live-all-orders reducer", () => {
  it("should handle wsConnecting", () => {
    const state = reducer(initialState, wsConnecting);

    expect(state.status).toBe(WebsocketStatus.CONNECTING);
  });

  it("should handle wsOpen", () => {
    const state = reducer(initialState, wsOpen);

    expect(state.status).toBe(WebsocketStatus.ONLINE);
  });

  it("should handle wsClose", () => {
    const state = reducer(initialState, wsClose);

    expect(state.status).toBe(WebsocketStatus.OFFLINE);
  });

  it("should handle wsError", () => {
    const state = reducer(initialState, {
      type: wsError,
      payload: errorMessage,
    });

    expect(state.connectionError).toBe(errorMessage);
  });

  it("should handle wsMessage", () => {
    const state = reducer(initialState, {
      type: wsMessage,
      payload: ordersData,
    });

    expect(state.ordersdata).toEqual(ordersData);
  });
});
