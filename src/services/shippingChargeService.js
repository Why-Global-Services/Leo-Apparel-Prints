import axiosInstance from "../api/axiosInstance";

// Create / Update Shipping Charge
export const createOrUpdateShippingChargeAPI = async (data) => {
  const res = await axiosInstance.post("/shipping-charge", data);

  return res.data;
};

// Get Shipping Charge
export const getShippingChargeAPI = async () => {
  const res = await axiosInstance.get("/shipping-charge");

  return res.data;
};
