import { createReducer } from "@reduxjs/toolkit";
import {
  WebsocketStatus,
  TypeLiveOrderData,
  TypeLiveOrdersData,
} from "../../types/types";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";

export type TypeLiveAllOrdersStore = {
  status: WebsocketStatus;
  orders: Array<TypeLiveOrderData>;
  ordersdata: TypeLiveOrdersData | null;
  connectionError: string;
};

const initialState: TypeLiveAllOrdersStore = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  ordersdata: null,
  connectionError: "",
};

export const liveAllOrdersReducer = createReducer(initialState, (builder) => {
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
      state.ordersdata = action.payload;
      state.orders = action.payload.orders;
    });
});

export const reducer = liveAllOrdersReducer;

export default reducer;
