// "use client";

// import { createSlice } from "@reduxjs/toolkit";

// // 🔥 Load from localStorage
// const getCartFromStorage = () => {
//   if (typeof window !== "undefined") {
//     const data = localStorage.getItem("cart");
//     return data ? JSON.parse(data) : [];
//   }
//   return [];
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: getCartFromStorage(),
//   },

//   reducers: {
//     // 🛒 ADD TO CART
//     addToCart: (state, action) => {
//       const existing = state.items.find(
//         (item) => item.id === action.payload.id
//       );

//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }

//       localStorage.setItem("cart", JSON.stringify(state.items));
//     },

//     // ❌ REMOVE
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(
//         (item) => item.id !== action.payload
//       );

//       localStorage.setItem("cart", JSON.stringify(state.items));
//     },

//     // 🔄 UPDATE QTY
//     updateQuantity: (state, action) => {
//       const item = state.items.find(
//         (i) => i.id === action.payload.id
//       );

//       if (item) {
//         item.quantity = action.payload.quantity;
//       }

//       localStorage.setItem("cart", JSON.stringify(state.items));
//     },

//     // 🧹 CLEAR CART
//     clearCart: (state) => {
//       state.items = [];
//       localStorage.removeItem("cart");
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   updateQuantity,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;














// cartSlice.js
"use client";

import { createSlice } from "@reduxjs/toolkit";

// 🔥 Load from localStorage
const getCartFromStorage = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

// Helper function to generate a unique key for cart item based on product and design
const getCartItemKey = (item) => {
  // Create a unique key based on productId and all design options
  const designKey = item.design ? JSON.stringify(item.design) : '';
  return `${item.productId}-${item.size}-${designKey}`;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getCartFromStorage(),
  },

  reducers: {
    // 🛒 ADD TO CART
    addToCart: (state, action) => {
      const newItem = action.payload;
      const itemKey = getCartItemKey(newItem);
      
      // Find existing item with same productId, size, and design
      const existing = state.items.find(item => {
        const existingKey = getCartItemKey(item);
        return existingKey === itemKey;
      });

      if (existing) {
        // Update quantity of existing item
        existing.quantity += newItem.quantity;
      } else {
        // Add new item with unique ID
        state.items.push({ 
          ...newItem, 
          id: Date.now(), // Simple unique ID for cart
          quantity: newItem.quantity 
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // ❌ REMOVE
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // 🔄 UPDATE QTY
    updateQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // 🧹 CLEAR CART
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;