import { createReducer } from "@reduxjs/toolkit";
import { TypeLiveOrdersData, WebsocketStatus } from "../../types/live-order-types"
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";

export type TLiveUserOrderStore = {
  status: WebsocketStatus;
  live_user_orders: TypeLiveOrdersData;
  connectionError: string;
}

const initialState: TLiveUserOrderStore = {
  status: WebsocketStatus.OFFLINE,
  //@ts-ignore
  live_user_orders: {},
  connectionError: "",
  orders: [],
};

export const liveUserOrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, state => {
      state.status = WebsocketStatus.ONLINE;
    })
    .addCase(wsClose, state => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
          //@ts-ignore
      state.live_user_orders = action.payload;
              //@ts-ignore
      state.orders = action.payload.orders;
    })
});


export const reducer = liveUserOrdersReducer;