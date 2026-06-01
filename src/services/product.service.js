
import axiosInstance from "../api/axiosInstance";




export const getProducts = () => axiosInstance.get("/getproducts");


export const getProductById = (id) => axiosInstance.get(`/getsingleproducts/${id}`);


export const createProduct = (data) => axiosInstance.post("/createproducts", data);


export const updateProduct = (id, data) => axiosInstance.put(`/editproducts/${id}`, data);


export const updateProductStatus = (id, status) => axiosInstance.put(`/updateproductstatus/${id}`, { isActive: status });


export const deleteProduct = (id) => axiosInstance.delete(`/deleteproducts/${id}`);