// src/services/auth.service.js
import axiosInstance from "../api/axiosInstance";

export const authService = {
  login: (credentials) => axiosInstance.post("/adminLogin", credentials),
  logout: () => axiosInstance.post("/logout"),
  getProfile: () => axiosInstance.get("/profile"),
  me: () => axiosInstance.get("/me"),
};