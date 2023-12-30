import api from "../../utils/api";

export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const USER_LOADING = "USERS_LOADING";
export const USER_ERROR = "USERS_ERROR";
export const SET_USER = "SET_USER";
export const USER_AUTH_CHECKED = "USER_AUTH_CHECKED";

export const setAuthChecked = (value) => (dispatch) => {
  dispatch({ type: USER_AUTH_CHECKED, payload: value });
};

export const setUser = (userData) => ({
  type: SET_USER,
  payload: userData,
});

export const getUser = () => {
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

export const createUser = (userData) => (dispatch) => {
  dispatch({ type: USER_LOADING });
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

export const loginUser = (userData) => (dispatch) => {
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

export const logoutUser = () => (dispatch) => {
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
