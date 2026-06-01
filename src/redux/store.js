import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import productReducer from "@/features/products/productSlice";
import userReducer from "@/features/user/userSlice";
import checkoutReducer from "@/features/checkout/checkoutSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    user : userReducer,
    checkout: checkoutReducer,
  },
});