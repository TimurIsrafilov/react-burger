import {
  ADD_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  USER_LOADING,
  USER_ERROR,
  USER_AUTH_CHECKED,
  SET_USER,
} from "./actions";

const initialState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    default:
      return state;
  }
};
