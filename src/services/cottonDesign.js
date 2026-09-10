import axiosInstance from "../api/axiosInstance";

// CREATE
export const createCottonDesign = (data) =>
  axiosInstance.post("/createCottonDesign", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 60000,
  });

// GET ALL
export const getCottonDesigns = () => axiosInstance.get("/getCottonDesigns");

// GET ONE
export const getCottonDesign = (id) =>
  axiosInstance.get(`/getCottonDesign/${id}`);

// UPDATE
export const updateCottonDesign = (id, data) =>
  axiosInstance.put(`/updateCottonDesign/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 60000,
  });

export const updateCottonDesignStatus = (id, status) =>
  axiosInstance.put(`/updateCottonDesignStatus/${id}`, {
    isActive: status,
  });

// DELETE
export const deleteCottonDesign = (id) =>
  axiosInstance.delete(`/deleteCottonDesign/${id}`);
