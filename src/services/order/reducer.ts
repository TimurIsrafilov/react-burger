import { createSlice } from "@reduxjs/toolkit";
import { loadOrder } from "./actions";
import type { RootState } from "../store";

import { TypeOrderData } from "../../types/types";

interface IntOrderState {
  order: TypeOrderData | null;
  loading: boolean;
  error: unknown;
}

const initialState: IntOrderState = {
  order: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    closeOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      });
  },
});

export const reducer = orderSlice.reducer;
export const { closeOrder } = orderSlice.actions;

export type TypeOrderActions = ReturnType<typeof closeOrder>;

export const selectOrder = (state: RootState) => state.order.order;
export const selectOrderLoading = (state: RootState) => state.order.loading;
export const selectOrderError = (state: RootState) => state.order.error;

export default reducer;
