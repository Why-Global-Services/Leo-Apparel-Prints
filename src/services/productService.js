// import axiosClient from "@/lib/axios";

// // Get all products (user-side)
// export const getAllProductsAPI = async () => {
//   const res = await axiosClient.get("/v1/admin/getproducts");
//   console.log("API Response for products:", res.data); // Debug log
//   return res.data;
// };

// // Get single product by ID
// export const getProductByIdAPI = async (id) => {
//   const res = await axiosClient.get(`/v1/admin/getsingleproducts/${id}`);
//   return res.data;
// };










// import axiosClient from "@/lib/axios";

// // Get all products (user-side)
// export const getAllProductsAPI = async () => {
//   try {
//     const res = await axiosClient.get("/v1/admin/getproducts");
//     console.log("API Response for products:", res.data);
//     console.log("Products list:", res.data?.products || res.data);
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// };

// // Get single product by ID
// export const getProductByIdAPI = async (id) => {
//   try {
//     console.log("Fetching product with ID:", id);
//     const res = await axiosClient.get(`/v1/admin/getsingleproducts/${id}`);
//     console.log("Product API response:", res);
//     console.log("Product data:", res.data);
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching single product:", error);
//     console.error("Error response:", error.response);
//     throw error;
//   }
// };



import axiosClient from "@/lib/axios";

// GET ALL PRODUCTS WITH FILTER
export const getAllProductsAPI = async (params) => {
  try {

    const res = await axiosClient.get(
      "/v1/admin/getproducts",
      {
        params,
      }
    );

    console.log("Filtered Products:", res.data);

    return res.data;

  } catch (error) {

    console.log(error);
    throw error;

  }
};

// GET SINGLE PRODUCT
export const getProductByIdAPI = async (id) => {
  try {

    const res = await axiosClient.get(
      `/v1/admin/getsingleproducts/${id}`
    );

    return res.data;

  } catch (error) {

    throw error;

  } 
};