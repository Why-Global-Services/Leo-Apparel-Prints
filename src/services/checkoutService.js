// src/services/checkoutService.js
import axiosClient from "@/lib/axios";

// Get checkout details
export const getCheckoutAPI = async () => {
  const response = await axiosClient.get("/v1/user/getCheckout");
  return response.data;
};

// Place order
export const placeOrderAPI = async (data) => {
  console.log("Placing order with data:", data);
  const response = await axiosClient.post("/v1/user/placeOrder", data);
  return response.data;
};