import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TypeWsAction = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

const RECONNECT_PERIOD = 5000;

export const socketMiddleware = (
  wsActions: TypeWsAction,
  withTokenRefresh = false
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";
    const {
      wsConnect,
      wsDisconnect,
      wsSendMessage,
      wsConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;

      if (wsConnect.match(action)) {
        socket = new WebSocket(
          action.payload +
            (localStorage.getItem("accessToken")
              ? //@ts-ignore
                `?token=${localStorage.getItem("accessToken").slice(7)}`
              : "")
        );

        url = action.payload;
        isConnected = true;
        dispatch(wsConnecting());

        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("Error"));
        };

        socket.onclose = () => {
          dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, RECONNECT_PERIOD);
          }
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };
      }

      if (socket && wsSendMessage?.match(action)) {
        socket.send(JSON.stringify(action.payload));
      }

      if (socket && wsDisconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
