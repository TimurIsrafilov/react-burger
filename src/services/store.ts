import { configureStore as createStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
//@ts-ignore
export const configureStore = (initialState) => {
  //@ts-ignore
  const store = createStore({ reducer }, initialState, (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
  );

  return store;
};
//@ts-ignore
export type RootState = ReturnType<typeof store.getState>;
//@ts-ignore
export type AppDispatch = typeof store.dispatch;
