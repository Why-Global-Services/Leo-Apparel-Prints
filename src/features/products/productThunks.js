// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   getAllProductsAPI,
//   getProductByIdAPI,
// } from "@/services/productService";

// export const fetchAllProducts = createAsyncThunk(
//   "products/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await getAllProductsAPI();
//       // API returns array directly from aggregate
//       return Array.isArray(res) ? res : res.data || [];
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Failed to fetch products");
//     }
//   }
// );

// export const fetchProductById = createAsyncThunk(
//   "products/fetchById",
//   async (id, { rejectWithValue }) => {
//     try {
//       const res = await getProductByIdAPI(id);
//       console.log("single products res",res.data)
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Product not found");
//     }
//   }
// );




import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProductsAPI,
  getProductByIdAPI,
} from "@/services/productService";

// export const fetchAllProducts = createAsyncThunk(
//   "products/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await getAllProductsAPI();
//       return Array.isArray(res) ? res : res.data || [];
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Failed to fetch products");
//     }
//   }
// );


export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",

  async (filters, { rejectWithValue }) => {
    try {

      const res = await getAllProductsAPI(filters);

      return Array.isArray(res)
        ? res
        : res.data || [];

    } catch (err) {

      return rejectWithValue(
        err.response?.data || "Failed to fetch products"
      );

    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getProductByIdAPI(id);
      console.log("single products full response:", res);
      console.log("single products data:", res.data);
      
      // The product might be in different places depending on your API response
      const productData = res.data?.product || res.product || res.data;
      console.log("Extracted product:", productData);
      
      return productData;
    } catch (err) {
      console.error("Error fetching product:", err);
      return rejectWithValue(err.response?.data || "Product not found");
    }
  }
);