import axiosInstance from "../api/axiosInstance";

export const getCategories = () =>
  axiosInstance.get("/getAllCategory");

export const createCategory = (data) =>
  axiosInstance.post("/createCategory", data);

export const updateCategory = (id, data) =>
  axiosInstance.put(`/editcategory/${id}`, data);

export const deleteCategory = (id) =>
  axiosInstance.delete(`/deleteCategory/${id}`);