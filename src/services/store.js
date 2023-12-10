// рабочий вариант
import { configureStore as createStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

export const configureStore = (initialState) => {
  const store = createStore({reducer}, initialState, getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}));

  return store;
};

//  новый
// import { configureStore as createStore } from "@reduxjs/toolkit";
// import { reducer } from "./reducer";

// // import { applyMiddleware } from "redux";

// // import { customMiddleware } from "./middleware/custom-middleware";
// // import thunkMiddleware from "redux-thunk";
// // import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

// import { getDefaultMiddleware } from "@reduxjs/toolkit";

// const customizedMiddleware = getDefaultMiddleware({serializableCheck: false});

// //const middleware = customMiddleware();

// export const configureStore = (initialState) => {
//   const store = createStore({ reducer }, initialState, customizedMiddleware);

//   return store;
// };
