import { configureStore as createStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { socketMiddleware } from "./middleware/socket-middleware";

import {
  connect as LiveUserOrderWsConnect,
  disconnect as LiveUserOrderWsDisconnect,
  wsConnecting as LiveUserOrderWsConnecting,
  wsOpen as LiveUserOrderWsOpen,
  wsClose as LiveUserOrderWsClose,
  wsError as LiveUserOrderWsError,
  wsMessage as LiveUserOrderWsMessage,
  TypeLiveUserOrderActions,
} from "./live-user-orders/actions";

import {
  connect as LiveAllOrdersWsConnect,
  disconnect as LiveAllOrdersWsDisconnect,
  wsConnecting as LiveAllOrdersWsConnecting,
  wsOpen as LiveAllOrdersWsOpen,
  wsClose as LiveAllOrdersWsClose,
  wsError as LiveAllOrdersWsError,
  wsMessage as LiveAllOrdersWsMessage,
  TypeLiveAllOrdersActions,
} from "./live-all-orders/actions";

const liveUserOrdersMiddleware = socketMiddleware({
  wsConnect: LiveUserOrderWsConnect,
  wsDisconnect: LiveUserOrderWsDisconnect,
  wsConnecting: LiveUserOrderWsConnecting,
  onOpen: LiveUserOrderWsOpen,
  onClose: LiveUserOrderWsClose,
  onError: LiveUserOrderWsError,
  onMessage: LiveUserOrderWsMessage,
});

const liveAllOrdersMiddleware = socketMiddleware({
  wsConnect: LiveAllOrdersWsConnect,
  wsDisconnect: LiveAllOrdersWsDisconnect,
  wsConnecting: LiveAllOrdersWsConnecting,
  onOpen: LiveAllOrdersWsOpen,
  onClose: LiveAllOrdersWsClose,
  onError: LiveAllOrdersWsError,
  onMessage: LiveAllOrdersWsMessage,
});

//@ts-ignore
export const configureStore = (initialState) => {
  //@ts-ignore
  const store = createStore({
    reducer,
    //@ts-ignore
    initialState,
    middleware: (getDefaultMiddleware) =>
      // getDefaultMiddleware({ serializableCheck: false }).concat(
      getDefaultMiddleware().concat(liveUserOrdersMiddleware, liveAllOrdersMiddleware),
  });

  // export const store = configureStore({
  //   reducer,
  //   middleware: (getDefaultMiddleware) => {
  //     return getDefaultMiddleware().concat(liveUserOrdersMiddleware);
  //   }
  // });

  return store;
};
//@ts-ignore
export type RootState = ReturnType<typeof store.getState>;
//@ts-ignore
export type AppDispatch = typeof store.dispatch;

export type AppActions = TypeLiveUserOrderActions;


// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState,unknown, AppActions>;

// export type AppDispatch<ReturnType = void> = (action: AppActions | AppThunk<ReturnType>) => ReturnType;

// export type RootState = ReturnType<typeof reducer>;

// import { combineReducers } from "redux";
// import { liveTableReducer } from "./live-table/reducer";
// import { ThunkAction, configureStore } from "@reduxjs/toolkit";
// import { socketMiddleware } from "./middleware/socket-middleware";

// import {
//   connect as LiveTableWsConnect,
//   disconnect as LiveTableWsDisconnect,
//   wsOpen as LiveTableWsOpen,
//   wsClose as LiveTableWsClose,
//   wsMessage as LiveTableWsMessage,
//   wsError as LiveTableWsError,
//   wsConnecting as LiveTableWsConnecting,
//   TLiveTableActions,
// } from "./live-table/actions";

// import {
//   TypedUseSelectorHook,
//   useDispatch as dispatchHook,
//   useSelector as selectorHook
// } from "react-redux";

// import type {} from "redux-thunk/extend-redux";

// const reducer = combineReducers({
//   liveTable: liveTableReducer
// });

// export type RootState = ReturnType<typeof reducer>;

// const liveTableMiddleware = socketMiddleware({
//   wsConnect: LiveTableWsConnect,
//   wsDisconnect: LiveTableWsDisconnect,
//   wsConnecting: LiveTableWsConnecting,
//   onOpen: LiveTableWsOpen,
//   onError: LiveTableWsError,
//   onClose: LiveTableWsClose,
//   onMessage: LiveTableWsMessage,
// });

// // const liveTableMiddleware2 = socketMiddleware({
// //   wsConnect: LiveTableWsConnectProfile,
// //   wsDisconnect: LiveTableWsDisconnect,
// //   wsConnecting: LiveTableWsConnecting,
// //   onOpen: LiveTableWsOpen,
// //   onError: LiveTableWsError,
// //   onClose: LiveTableWsClose,
// //   onMessage: LiveTableWsMessage,
// // });

// export const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(liveTableMiddleware);
//   }
// });

// export type AppActions = TLiveTableActions;

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState,unknown, AppActions>;

// export type AppDispatch<ReturnType = void> = (action: AppActions | AppThunk<ReturnType>) => ReturnType;

// export const useDispatch: () => AppDispatch = dispatchHook;
// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
