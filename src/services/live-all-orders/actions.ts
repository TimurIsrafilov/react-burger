import { createAction } from "@reduxjs/toolkit";
import { LiveAllOrdersActions } from "../../types/live-orders-types";

export const connect = createAction<string, "LIVE_ORDERS_CONNECT">(
  "LIVE_ORDERS_CONNECT"
);
export const disconnect = createAction("LIVE_ORDERS_DISCONNECT");

export const wsConnecting = createAction("LIVE_ORDERS_WS_CONNECTING");
export const wsOpen = createAction("LIVE_ORDERS_WS_OPEN");
export const wsClose = createAction("LIVE_ORDERS_WS_CLOSE");
export const wsError = createAction<string, "LIVE_ORDERS_WS_ERROR">(
  "LIVE_ORDERS_WS_ERROR"
);
export const wsMessage = createAction<
  LiveAllOrdersActions,
  "LIVE_ORDERS_WS_MESSAGE"
>("LIVE_ORDERS_WS_MESSAGE");

export type TypeLiveAllOrdersActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsError>
  | ReturnType<typeof wsMessage>;
