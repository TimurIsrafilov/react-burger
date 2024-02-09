import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadOrderToShow } from "./actions";
import type { RootState } from "../store";

import { TypeLiveOrderData } from "../../types/types";

interface IntOrderToShowState {
  order_to_show: TypeLiveOrderData | null;
  loading: boolean;
  error: unknown;
}

const initialState: IntOrderToShowState = {
  order_to_show: null,
  loading: false,
  error: null,
};

const orderToShowSlice = createSlice({
  name: "order-to-show",
  initialState,
  reducers: {
    closeOrderToShow: (state) => {
      state.order_to_show = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrderToShow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOrderToShow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadOrderToShow.fulfilled, (state, action) => {
        state.loading = false;
        state.order_to_show = action.payload.orders[0];
      });
  },
});

export const reducer = orderToShowSlice.reducer;
export const { closeOrderToShow } = orderToShowSlice.actions;

export const selectOrder = (state: RootState) =>
  state.order_to_show.order_to_show;
export const selectLoading = (state: RootState) => state.order_to_show.loading;
export const selectError = (state: RootState) => state.order_to_show.error;
