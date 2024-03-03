import { createSlice } from "@reduxjs/toolkit";
import { loadOrderToShow } from "./actions";
import type { RootState } from "../store";

import { TypeLiveOrderData } from "../../types/types";

interface IntOrderToShowState {
  ordertoshow: TypeLiveOrderData | null;
  loading: boolean;
  error: unknown;
}

export const initialState: IntOrderToShowState = {
  ordertoshow: null,
  loading: false,
  error: null,
};

export const orderToShowSlice = createSlice({
  name: "order-to-show",
  initialState,
  reducers: {
    closeOrderToShow: (state) => {
      state.ordertoshow = null;
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
        state.ordertoshow = action.payload.orders?.[0] ?? null;
      });
  },
});

export const reducer = orderToShowSlice.reducer;
export const { closeOrderToShow } = orderToShowSlice.actions;

export const selectOrder = (state: RootState) => state.ordertoshow.ordertoshow;
export const selectLoading = (state: RootState) => state.ordertoshow.loading;
export const selectError = (state: RootState) => state.ordertoshow.error;

export default reducer;
