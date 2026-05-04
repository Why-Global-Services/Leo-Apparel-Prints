// src/services/cartService.js

import axiosClient from "@/lib/axios";

// Add to cart
export const addToCartAPI = async (cartData) => {
  const res = await axiosClient.post("/v1/user/cart", cartData);
  return res.data;
};

// Get cart
export const getCartAPI = async () => {
  const res = await axiosClient.get("/v1/user/getCart");
  return res.data;
};

// Edit cart item
export const editCartAPI = async (cartData) => {
  const res = await axiosClient.put("/v1/user/editCartData", cartData);
  return res.data;
};

// Remove from cart
export const removeCartAPI = async (customizationId) => {
  const res = await axiosClient.delete(`/v1/user/removeCart`, { data: { customizationId } });
  return res.data;
};

// Merge guest cart with user cart
export const mergeCartAPI = async (items) => {
  const res = await axiosClient.post("/v1/user/mergeCart", { items });
  return res.data;
};

// Clear cart after checkout
export const clearCartAPI = async () => {
  const res = await axiosClient.delete("/v1/user/clearCart");
  return res.data;
};