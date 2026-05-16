import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCart,
  editCartItem,
  removeFromCart,
  clearCart,
} from "./cartThunks";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
  isGuest: false,
};

const calculateTotals = (items) => {
 const totalQuantity = items.reduce(
  (sum, item) =>
    sum +
    (item.sizes || []).reduce(
      (s, size) => s + size.quantity,
      0
    ),
  0
);
  const totalPrice = items.reduce((sum, item) => sum + ((item.basePrice || item.price || 0) *
(item.sizes || []).reduce(
  (s, size) => s + size.quantity,
  0
)), 0);
  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
    resetCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.isGuest = false;
      localStorage.removeItem("guestCart");
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        const { data, isAuthenticated } = action.payload;
        
        let items = [];
        if (data?.items) {
          items = data.items;
        } else if (Array.isArray(data)) {
          items = data;
        } else if (data?.cart?.items) {
          items = data.cart.items;
        }
        
        state.items = items;
        state.isGuest = !isAuthenticated;
        
        const { totalQuantity, totalPrice } = calculateTotals(items);
        state.totalQuantity = totalQuantity;
        state.totalPrice = totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        const { data, isAuthenticated } = action.payload;
        
        let items = [];
        if (data?.items) {
          items = data.items;
        } else if (Array.isArray(data)) {
          items = data;
        }
        
        state.items = items;
        state.isGuest = !isAuthenticated;
        
        const { totalQuantity, totalPrice } = calculateTotals(items);
        state.totalQuantity = totalQuantity;
        state.totalPrice = totalPrice;
      })

      // Edit Cart Item
    .addCase(editCartItem.fulfilled, (state, action) => {
  const { data, isAuthenticated } = action.payload;

  let items = [];

  if (data?.items) {
    items = data.items;
  } else {
    // 🔥 manually update item
    items = state.items.map((item) => {
      if (item.customizationId === action.meta.arg.customizationId) {
        return {
          ...item,
          sizes:action.meta.arg.sizes,
        };
      }
      return item;
    });
  }

  state.items = items;
  state.isGuest = !isAuthenticated;

  const { totalQuantity, totalPrice } = calculateTotals(items);
  state.totalQuantity = totalQuantity;
  state.totalPrice = totalPrice;
})

      // Remove from Cart
     .addCase(removeFromCart.fulfilled, (state, action) => {
  const { data, isAuthenticated, customizationId } = action.payload;

  let items = [];

  if (data?.items) {
    items = data.items;
  } else if (Array.isArray(data)) {
    items = data;
  } else {
    // 🔥 manually remove item
    items = state.items.filter((item) => {
      return !(
        item.customizationId === customizationId ||
        item.id === customizationId ||
        item._id === customizationId
      );
    });
  }

  state.items = items;
  state.isGuest = !isAuthenticated;

  const { totalQuantity, totalPrice } = calculateTotals(items);
  state.totalQuantity = totalQuantity;
  state.totalPrice = totalPrice;
})



      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
        state.isGuest = false;
      });
  },
});

export const { clearCartError, resetCart } = cartSlice.actions;
export default cartSlice.reducer;