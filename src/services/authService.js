import axiosClient from "@/lib/axios";

// 🔥 REAL API CALL
export const registerAPI = async (data) => {
  const res = await axiosClient.post("/v1/user/register", data);
  return res.data;
};

export const loginAPI = async (data) => {
  const res = await axiosClient.post("/v1/user/login", data);
  return res.data;
};


export const googleRedirect = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  window.location.href = `${apiUrl}/v1/user/google`;
};


export const forgotPasswordAPI = (data) =>
  axiosClient.post("/v1/user/forgot-password", data);

export const verifyResetOtpAPI = (data) =>
  axiosClient.post("/v1/user/verify-reset-otp", data);

export const resetPasswordAPI = (data) =>
  axiosClient.post("/v1/user/reset-password", data);