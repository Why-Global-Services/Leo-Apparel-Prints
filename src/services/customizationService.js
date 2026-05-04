// src/services/customizationService.js

import axiosClient from "@/lib/axios";

// Save customization before adding to cart
export const saveCustomizationAPI = async (customizationData) => {
  // Convert customization array to JSON string as backend expects
  const payload = {
    productId: customizationData.productId,
    customization: JSON.stringify(customizationData.customization || [])
  };
  
  console.log("Sending customization payload:", payload);
  
  const res = await axiosClient.post("/v1/user/customization", payload);
  return res.data;
};