import { configureStore as createStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

export const configureStore = (initialState) => {
  const store = createStore({ reducer }, initialState, (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
  );

  return store;
};
