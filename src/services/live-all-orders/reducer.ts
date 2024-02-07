import { createReducer } from "@reduxjs/toolkit";
import { TypeLiveOrdersData, WebsocketStatus } from "../../types/live-order-types"
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";

export type TypeLiveAllOrdersStore = {
  status: WebsocketStatus;
  live_all_orders: TypeLiveOrdersData;
  connectionError: string;
}

const initialState: TypeLiveAllOrdersStore = {
  status: WebsocketStatus.OFFLINE,
  //@ts-ignore
  live_all_orders: {},
  connectionError: "",
  orders: [],
};

export const liveAllOrdersReducer = createReducer(initialState, (builder) => {
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
      state.live_all_orders = action.payload;
                    //@ts-ignore
                    state.orders = action.payload.orders;
    })
});


export const reducer = liveAllOrdersReducer;