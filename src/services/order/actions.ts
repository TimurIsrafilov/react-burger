import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const loadOrder = createAsyncThunk(
  "order/loadOrder",
  async (order: Array<string>) => {
    return api.getOrderNumber(order);
  }
);
