import { PayloadAction } from "@reduxjs/toolkit";
import { TypeUserData, TypeUserInfo, TypeUserLogout } from "../../types/types";
import api from "../../utils/api";
import { AppThunk } from "../store";

export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const USER_LOADING = "USERS_LOADING";
export const USER_ERROR = "USERS_ERROR";
export const SET_USER = "SET_USER";
export const USER_AUTH_CHECKED = "USER_AUTH_CHECKED";

type TypeAddUserSuccessAction = {
  type: typeof ADD_USER_SUCCESS;
  payload: TypeUserInfo;
};

type TypeDeleteUserSuccessAction = {
  type: typeof DELETE_USER_SUCCESS;
  payload: TypeUserLogout;
};

type TypeUserLoadingAction = {
  type: typeof USER_LOADING;
  // payload: boolean;
};

type TypeUserErrorAction = {
  type: typeof USER_ERROR;
  payload: string;
};

type TypeSetUserAction = {
  type: typeof SET_USER;
  payload: TypeUserData;
};

type TypeUserAuthCheckedAction = {
  type: typeof USER_AUTH_CHECKED;
  payload: boolean;
};

export type TypeUserActions =
  | TypeAddUserSuccessAction
  | TypeDeleteUserSuccessAction
  | TypeUserLoadingAction
  | TypeUserErrorAction
  | TypeSetUserAction
  | TypeUserAuthCheckedAction;

export const setAuthChecked =
  (value: boolean): AppThunk =>
  (dispatch) => {
    dispatch({ type: USER_AUTH_CHECKED, payload: value });
  };

export const setUser = (userData: TypeUserInfo | any) => ({
  type: SET_USER,
  payload: userData,
});

export const getUser = (): AppThunk => {
  return (dispatch) => {
    return api
      .getUser()
      .then((res) => {
        dispatch(setUser(res.user));
      })
      .catch((error) => {
        dispatch({
          type: USER_ERROR,
          payload: error.message,
        });
      });
  };
};

export const createUser =
  (userData: TypeUserInfo): AppThunk =>
  (dispatch) => {
    dispatch({
      type: USER_LOADING,
    });
    return api
      .register(userData)
      .then((res) => {
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: res.user,
        });
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch((error) => {
        dispatch({
          type: USER_ERROR,
          payload: error.message,
        });
      });
  };

export const updateUser =
  (userData: TypeUserInfo): AppThunk =>
  (dispatch) => {
    dispatch({
      type: USER_LOADING,
    });
    return api
      .changeUserData(userData)
      .then((res) => {
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_ERROR,
          payload: error.message,
        });
      });
  };

export const loginUser = (userData: TypeUserInfo): AppThunk => {
  return (dispatch) => {
    dispatch({ type: USER_LOADING });
    return api
      .login(userData)
      .then((res) => {
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: res.user,
        });
        dispatch(setAuthChecked(true));
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch((error) => {
        dispatch({
          type: USER_ERROR,
          payload: error.message,
        });
      });
  };
};

export const logoutUser = (): AppThunk => (dispatch) => {
  dispatch({ type: USER_LOADING });
  return api
    .logout()
    .then((res) => {
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: res,
      });
      localStorage.clear();
    })
    .catch((error) => {
      dispatch({
        type: USER_ERROR,
        payload: error.message,
      });
    });
};

export const checkUserAuth = (): AppThunk => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};
