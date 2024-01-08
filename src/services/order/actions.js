import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const loadOrder = createAsyncThunk(
  "order/loadOrder", async (order) => {
  return api.getOrderNumber(order);
});
