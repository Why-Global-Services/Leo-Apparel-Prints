// src/features/checkout/checkoutThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCheckoutAPI, placeOrderAPI } from "@/services/checkoutService";

export const getCheckout = createAsyncThunk(
  "checkout/getCheckout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCheckoutAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to get checkout details");
    }
  }
);

export const placeOrder = createAsyncThunk(
  "checkout/placeOrder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await placeOrderAPI(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to place order");
    }
  }
);