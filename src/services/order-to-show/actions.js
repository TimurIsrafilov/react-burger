import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const loadOrderToShow = createAsyncThunk("order/loadOrderToShow", async (orderNumber) => {
  return api.getOrderByNumber(orderNumber);
});
