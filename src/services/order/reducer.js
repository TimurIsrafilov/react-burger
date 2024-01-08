import { createSlice } from "@reduxjs/toolkit";
import { loadOrder } from "./actions";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    closeOrder: {
      reducer: (state) => {
        state.order = null;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrder.pending, (state) => {
        // state.loading = true;
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
