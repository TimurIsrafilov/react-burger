import { createReducer } from "@reduxjs/toolkit";
import {
  WebsocketStatus,
  TypeLiveOrderData,
  TypeLiveOrdersData,
} from "../../types/types";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";

export type TypeLiveUserOrderStore = {
  status: WebsocketStatus;
  orders: Array<TypeLiveOrderData>;
  orders_data: TypeLiveOrdersData | {};
  connectionError: string;
};

const initialState: TypeLiveUserOrderStore = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  orders_data: {},
  connectionError: "",
};

export const liveUserOrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders_data = action.payload;
      state.orders = action.payload.orders;
    });
});

export const reducer = liveUserOrdersReducer;
