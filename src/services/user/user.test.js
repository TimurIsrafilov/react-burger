import * as actions from "./actions";
import reducer, { initialState } from "./reducer";
import { authStatus, errorMessage, userData } from "../../utils/test-constants";

describe("test user reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_USER_SUCCESS", () => {
    const state = reducer(undefined, {
      type: actions.ADD_USER_SUCCESS,
      payload: userData,
    });

    expect(state.user).toEqual(userData);
    expect(state.loading).toBeFalsy();
  });

  it("should handle DELETE_USER_SUCCESS", () => {
    const state = reducer(undefined, { type: actions.DELETE_USER_SUCCESS });

    expect(state.user).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  it("should handle USER_LOADING", () => {
    const state = reducer(undefined, { type: actions.USER_LOADING });

    expect(state.loading).toBeTruthy();
    expect(state.error).toBeNull();
  });

  it("should handle USER_ERROR", () => {
    const state = reducer(undefined, {
      type: actions.USER_ERROR,
      payload: errorMessage,
    });

    expect(state.loading).toBeFalsy();
    expect(state.error).toBe(errorMessage);
  });

  it("should handle SET_USER", () => {
    const state = reducer(undefined, {
      type: actions.SET_USER,
      payload: userData,
    });

    expect(state.user).toEqual(userData);
  });

  it("should handle USER_AUTH_CHECKED", () => {
    const state = reducer(undefined, {
      type: actions.USER_AUTH_CHECKED,
      payload: authStatus,
    });

    expect(state.isAuthChecked).toEqual(authStatus);
  });
});
