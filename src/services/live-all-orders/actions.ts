import { createAction } from "@reduxjs/toolkit";
import { LiveAllOrdersAction } from "../../types/live-all-orders-types";

export const connect = createAction<string, "LIVE_ALL_ORDERS_CONNECT">(
  "LIVE_ALL_ORDERS_CONNECT"
);
export const disconnect = createAction("LIVE_ALL_ORDERS_DISCONNECT");

export const wsConnecting = createAction("LIVE_ALL_ORDERS_WS_CONNECTING");
export const wsOpen = createAction("LIVE_ALL_ORDERS_WS_OPEN");
export const wsClose = createAction("LIVE_ALL_ORDERS_WS_CLOSE");
export const wsError = createAction<string, "LIVE_ALL_ORDERS_WS_ERROR">(
  "LIVE_ALL_ORDERS_WS_ERROR"
);
export const wsMessage = createAction<
  LiveAllOrdersAction,
  "LIVE_ALL_ORDERS_WS_MESSAGE"
>("LIVE_ALL_ORDERS_WS_MESSAGE");

export type TypeLiveAllOrdersActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsError>
  | ReturnType<typeof wsMessage>;
