import { PayloadAction } from "@reduxjs/toolkit";
import { TypeUserData, TypeUserInfo } from "../../types/types";
import api from "../../utils/api";
import { AppDispatch } from "../store";

export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const USER_LOADING = "USERS_LOADING";
export const USER_ERROR = "USERS_ERROR";
export const SET_USER = "SET_USER";
export const USER_AUTH_CHECKED = "USER_AUTH_CHECKED";

export const setAuthChecked = (value: boolean) => (dispatch: any) => {
  dispatch({ type: USER_AUTH_CHECKED, payload: value });
};

export const setUser = (userData: TypeUserInfo | null) => ({
  type: SET_USER,
  payload: userData,
});

export const getUser = () => {
  return (dispatch: any) => {
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

export const createUser = (userData: TypeUserInfo) => (dispatch: any) => {
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

export const updateUser = (values: TypeUserInfo) => (dispatch: any) => {
  dispatch({
    type: USER_LOADING,
  });
  return api
    .changeUserData(values)
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

export const loginUser = (values: TypeUserInfo) => {
  return (dispatch: any) => {
    dispatch({ type: USER_LOADING });
    return api
      .login(values)
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

export const logoutUser = () => (dispatch: any) => {
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

export const checkUserAuth = () => {
  return (dispatch: any) => {
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
