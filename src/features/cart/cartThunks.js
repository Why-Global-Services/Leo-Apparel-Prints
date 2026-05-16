// // src/features/cart/cartThunks.js

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   addToCartAPI,
//   getCartAPI,
//   editCartAPI,
//   removeCartAPI,
//   mergeCartAPI,
//   clearCartAPI,
// } from "@/services/cartService";
// import { saveCustomizationAPI } from "@/services/customizationService";

// // Helper function to generate a unique key for cart items
// const getItemUniqueKey = (item) => {
//   // Create a unique key based on productId AND all customization fields
//   const customizationKey = JSON.stringify({
//     jerseyColor: item.customization?.jerseyColor,
//     sleeveColor: item.customization?.sleeveColor,
//     collarColor: item.customization?.collarColor,
//     playerName: item.customization?.playerName,
//     playerNumber: item.customization?.playerNumber,
//     fabric: item.customization?.fabric,
//     size: item.customization?.size || item.size,
//     nameFont: item.customization?.nameFont,
//     nameColor: item.customization?.nameColor,
//     numberFont: item.customization?.numberFont,
//     numberColor: item.customization?.numberColor,
//     nameStyle: item.customization?.nameStyle,
//     textEffect: item.customization?.textEffect,
//   });
  
//   return `${item.productId}_${customizationKey}`;
// };

// // Helper function to convert customization object to array format
// const convertToArrayFormat = (customizationObj) => {
//   if (!customizationObj) return [];
  
//   const customizationArray = [];
  
//   const fieldsToMap = [
//     'jerseyColor', 'sleeveColor', 'collarColor', 'playerName', 
//     'playerNumber', 'fabric', 'size', 'nameFont', 'nameColor', 
//     'numberFont', 'numberColor', 'nameStyle', 'textEffect'
//   ];
  
//   fieldsToMap.forEach((fieldName) => {
//     const value = customizationObj[fieldName];
//     if (value && value !== '' && value !== undefined && value !== null) {
//       customizationArray.push({
//         zoneKey: "jersey",
//         fieldName: fieldName,
//         value: String(value)
//       });
//     }
//   });
  
//   return customizationArray;
// };

// // Add to cart
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async (cartData, { rejectWithValue, getState }) => {
//     try {
//       const { auth } = getState();
//       const isAuthenticated = !!auth?.user;
      
//       console.log("addToCart - isAuthenticated:", isAuthenticated);
//       console.log("addToCart - cartData:", cartData);
      
//       if (isAuthenticated) {
//         // Step 1: Create customization
//         const customizationArray = convertToArrayFormat(cartData.customization || {});
        
//         const customizationData = {
//           productId: cartData.productId,
//           customization: customizationArray,
//         };
        
//         console.log("Creating customization with data:", customizationData);
//         const customizationResponse = await saveCustomizationAPI(customizationData);
//         console.log("Customization response:", customizationResponse);
        
//         const customizationId = customizationResponse.data?._id || customizationResponse._id;
        
//         if (!customizationId) {
//           throw new Error("Failed to create customization");
//         }
        
//         // Step 2: Add to cart
//         const cartPayload = {
//           customizationId: customizationId,
//           quantity: cartData.quantity,
//         };
        
//         console.log("Adding to cart with payload:", cartPayload);
//         const response = await addToCartAPI(cartPayload);
//         console.log("Cart API response:", response);
        
//         return { data: response, isAuthenticated: true };
//       } else {
//         // Guest user - store in localStorage
//         let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        
//         // Generate unique key for the new item
//         const newItemKey = getItemUniqueKey(cartData);
        
//         // Find existing item with the EXACT same customization
//         const existingIndex = guestCart.findIndex(item => 
//           getItemUniqueKey(item) === newItemKey
//         );
        
//         if (existingIndex !== -1) {
//           // Same product with SAME customization - increase quantity
//           guestCart[existingIndex].quantity += cartData.quantity;
//           console.log("Updated existing item quantity");
//         } else {
//           // Different customization - add as new item
//           guestCart.push({
//             ...cartData,
//             id: Date.now().toString(),
//             customizationId: `temp_${Date.now()}_${Math.random()}`,
//             addedAt: new Date().toISOString(),
//           });
//           console.log("Added new item with different customization");
//         }
        
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         console.log("Guest cart saved:", guestCart);
        
//         return { 
//           data: { items: guestCart }, 
//           isAuthenticated: false 
//         };
//       }
//     } catch (err) {
//       console.error("addToCart error:", err);
//       console.error("Error response:", err.response?.data);
//       return rejectWithValue(err.response?.data?.message || err.message || "Failed to add to cart");
//     }
//   }
// );

// // Fetch cart
// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const { auth } = getState();
//       const isAuthenticated = !!auth?.user;
      
//       if (isAuthenticated) {
//         const response = await getCartAPI();
//         console.log("Cart API response:", response);
//         return { data: response, isAuthenticated: true };
//       } else {
//         const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//         console.log("Guest cart items:", guestCart);
//         return { data: { items: guestCart }, isAuthenticated: false };
//       }
//     } catch (err) {
//       console.error("fetchCart error:", err);
//       return rejectWithValue(err.response?.data || "Failed to fetch cart");
//     }
//   }
// );

// // Edit cart item
// export const editCartItem = createAsyncThunk(
//   "cart/editCartItem",
//   async ({ customizationId, quantity }, { rejectWithValue, getState }) => {
//     try {
//       const { auth } = getState();
//       const isAuthenticated = !!auth?.user;
      
//       console.log("editCartItem - customizationId:", customizationId, "quantity:", quantity);
      
//       if (isAuthenticated) {
//         const response = await editCartAPI({ customizationId, quantity });
//         return { data: response, isAuthenticated: true };
//       } else {
//         let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//         const itemIndex = guestCart.findIndex(item => 
//           item.id === customizationId || item.customizationId === customizationId
//         );
        
//         if (itemIndex !== -1) {
//           if (quantity < 1) {
//             guestCart.splice(itemIndex, 1);
//           } else {
//             guestCart[itemIndex].quantity = quantity;
//           }
//           localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         }
        
//         return { data: { items: guestCart }, isAuthenticated: false };
//       }
//     } catch (err) {
//       console.error("editCartItem error:", err);
//       return rejectWithValue(err.response?.data || "Failed to update cart");
//     }
//   }
// );

// // Remove from cart
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async (customizationId, { rejectWithValue, getState }) => {
//     try {
//       const { auth } = getState();
//       const isAuthenticated = !!auth?.user;
      
//       console.log("removeFromCart - customizationId:", customizationId);
      
//       if (isAuthenticated) {
//         const response = await removeCartAPI(customizationId);
//         return { customizationId, data: response, isAuthenticated: true };
//       } else {
//         let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//         guestCart = guestCart.filter(item => 
//           item.id !== customizationId && item.customizationId !== customizationId
//         );
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         return { customizationId, data: { items: guestCart }, isAuthenticated: false };
//       }
//     } catch (err) {
//       console.error("removeFromCart error:", err);
//       return rejectWithValue(err.response?.data || "Failed to remove from cart");
//     }
//   }
// );

// // Merge guest cart with user cart
// export const mergeGuestCart = createAsyncThunk(
//   "cart/mergeGuestCart",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//       console.log("Merging guest cart items:", guestCart);
      
//       if (guestCart.length === 0) {
//         return null;
//       }
      
//       // Process each guest cart item
//       for (const guestItem of guestCart) {
//         const customizationArray = convertToArrayFormat(guestItem.customization || {});
        
//         const customizationData = {
//           productId: guestItem.productId,
//           customization: customizationArray,
//         };
        
//         console.log("Creating customization for merge item:", guestItem.name);
//         const customizationResponse = await saveCustomizationAPI(customizationData);
//         const customizationId = customizationResponse.data?._id || customizationResponse._id;
        
//         if (customizationId) {
//           await addToCartAPI({
//             customizationId: customizationId,
//             quantity: guestItem.quantity,
//           });
//           console.log(`Added item to cart: ${guestItem.name} x ${guestItem.quantity}`);
//         }
//       }
      
//       localStorage.removeItem("guestCart");
//       console.log("Guest cart merged successfully");
      
//       return { success: true };
//     } catch (err) {
//       console.error("mergeGuestCart error:", err);
//       return rejectWithValue(err.response?.data || "Failed to merge cart");
//     }
//   }
// );

// // Clear cart
// export const clearCart = createAsyncThunk(
//   "cart/clearCart",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const { auth } = getState();
//       if (auth?.user) {
//         const response = await clearCartAPI();
//         return response;
//       } else {
//         localStorage.removeItem("guestCart");
//         return { success: true };
//       }
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Failed to clear cart");
//     }
//   }
// );



// src/features/cart/cartThunks.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCartAPI,
  getCartAPI,
  editCartAPI,
  removeCartAPI,
  clearCartAPI,
} from "@/services/cartService";
import { saveCustomizationAPI } from "@/services/customizationService";

// 🔥 Convert customization object → array
const convertToArrayFormat = (customizationObj) => {
  if (!customizationObj) return [];

  const customizationArray = [];

  const fields = [
    "jerseyColor",
    "sleeveColor",
    "collarColor",
    "playerName",
    "playerNumber",
    "fabric",
    "size",
    "nameFont",
    "nameColor",
    "numberFont",
    "numberColor",
    "nameStyle",
    "textEffect",
  ];

  fields.forEach((fieldName) => {
    const value = customizationObj[fieldName];
    if (value) {
      customizationArray.push({
        zoneKey: "jersey",
        fieldName,
        value: String(value),
      });
    }
  });

  return customizationArray;
};

//
// =========================
// ✅ ADD TO CART
// =========================
//
export const addToCart =
  createAsyncThunk(
    "cart/addToCart",

    async (
      cartData,
      { rejectWithValue, getState }
    ) => {

      try {

        const { auth } = getState();

        const isAuthenticated =
          !!auth?.user;

        console.log(
          "🔥 ADD TO CART API"
        );

        // ✅ USE EXISTING CUSTOMIZATION
        const customizationId =
          cartData.customizationId;

        // ✅ ADD TO CART
        const response =
          await addToCartAPI({
            customizationId,
            sizes:
              cartData.sizes || [],
          });

        return {
          data: response,
          isAuthenticated,
        };

      } catch (err) {

        console.error(
          "addToCart error:",
          err
        );

        return rejectWithValue(
          err.response?.data?.message ||
          err.message
        );

      }
    }
  );
//
// =========================
// ✅ FETCH CART
// =========================
//
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const isAuthenticated = !!auth?.user;

      console.log("🔥 FETCH CART API");

      const response = await getCartAPI();

      return { data: response, isAuthenticated };
    } catch (err) {
      console.error("fetchCart error:", err);
      return rejectWithValue(err.response?.data);
    }
  }
);

//
// =========================
// ✅ EDIT CART ITEM
// =========================
//
export const editCartItem = createAsyncThunk(
  "cart/editCartItem",
  async ({ customizationId, sizes }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const isAuthenticated = !!auth?.user;

      console.log("🔥 EDIT CART:", customizationId, sizes);

      const response = await editCartAPI({
        customizationId,
        sizes,
      });

      return { data: response, isAuthenticated };
    } catch (err) {
      console.error("editCartItem error:", err);
      return rejectWithValue(
        err.response?.data || "Failed to update cart"
      );
    }
  }
);

//
// =========================
// ✅ REMOVE FROM CART
// =========================
//
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (customizationId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const isAuthenticated = !!auth?.user;

      console.log("🔥 REMOVE ITEM:", customizationId);

      const response = await removeCartAPI(customizationId);

      return {
        customizationId,
        data: response,
        isAuthenticated,
      };
    } catch (err) {
      console.error("removeFromCart error:", err);
      return rejectWithValue(
        err.response?.data || "Failed to remove item"
      );
    }
  }
);

//
// =========================
// ✅ CLEAR CART
// =========================
//
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🔥 CLEAR CART");

      const response = await clearCartAPI();
      return response;
    } catch (err) {
      console.error("clearCart error:", err);
      return rejectWithValue(
        err.response?.data || "Failed to clear cart"
      );
    }
  }
);