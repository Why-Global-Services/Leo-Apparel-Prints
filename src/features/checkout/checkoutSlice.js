// src/features/checkout/checkoutSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getCheckout, placeOrder } from "./checkoutThunks";

const initialState = {
  checkoutData: null,
  cartItems: [],
  address: null,
  paymentMethod: null,
  shippingMethod: null,
  summary: {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  loading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },
    clearCheckout: (state) => {
      state.checkoutData = null;
      state.cartItems = [];
      state.address = null;
      state.summary = { subtotal: 0, shipping: 0, tax: 0, total: 0 };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Checkout
      .addCase(getCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutData = action.payload;
        state.cartItems = action.payload.cartItems || [];
        state.address = action.payload.address || null;
        state.summary = action.payload.summary || { subtotal: 0, shipping: 0, tax: 0, total: 0 };
      })
      .addCase(getCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutData = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPaymentMethod, setShippingMethod, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;