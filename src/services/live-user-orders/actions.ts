import { createAction } from "@reduxjs/toolkit";
import { LiveUserOrderActions } from "../../types/live-order-types";

export const connect = createAction<string, "LIVE_ORDER_CONNECT">(
  "LIVE_ORDER_CONNECT"
);
export const disconnect = createAction("LIVE_ORDER_DISCONNECT");

export const wsConnecting = createAction("LIVE_ORDER_WS_CONNECTING");
export const wsOpen = createAction("LIVE_ORDER_WS_OPEN");
export const wsClose = createAction("LIVE_ORDER_WS_CLOSE");
export const wsError = createAction<string, "LIVE_ORDER_WS_ERROR">(
  "LIVE_ORDER_WS_ERROR"
);
export const wsMessage = createAction<
  LiveUserOrderActions,
  "LIVE_ORDER_WS_MESSAGE"
>("LIVE_ORDER_WS_MESSAGE");

export type TypeLiveUserOrderActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsError>
  | ReturnType<typeof wsMessage>;
