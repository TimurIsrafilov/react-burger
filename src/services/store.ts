import { configureStore } from "@reduxjs/toolkit";
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

export const store: any = configureStore({
  reducer,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      liveUserOrdersMiddleware,
      liveAllOrdersMiddleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppUserActions = TypeLiveUserOrderActions;

export type AppAllActions = TypeLiveAllOrdersActions;
