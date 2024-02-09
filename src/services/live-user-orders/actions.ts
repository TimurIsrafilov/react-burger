import { createAction } from "@reduxjs/toolkit";
import { LiveUserOrdersAction } from "../../types/live-user-order-types";

export const connect = createAction<string, "LIVE_USER_ORDERS_CONNECT">(
  "LIVE_USER_ORDERS_CONNECT"
);
export const disconnect = createAction("LIVE_USER_ORDERS_DISCONNECT");

export const wsConnecting = createAction("LIVE_USER_ORDERS_WS_CONNECTING");
export const wsOpen = createAction("LIVE_USER_ORDERS_WS_OPEN");
export const wsClose = createAction("LIVE_USER_ORDERS_WS_CLOSE");
export const wsError = createAction<string, "LIVE_USER_ORDERS_WS_ERROR">(
  "LIVE_USER_ORDERS_WS_ERROR"
);
export const wsMessage = createAction<
  LiveUserOrdersAction,
  "LIVE_USER_ORDERS_WS_MESSAGE"
>("LIVE_USER_ORDERS_WS_MESSAGE");

export type TypeLiveUserOrderActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsError>
  | ReturnType<typeof wsMessage>;
