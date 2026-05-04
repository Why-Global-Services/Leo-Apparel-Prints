import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "@/lib/axios";

export const fetchAddresses = createAsyncThunk(
  "user/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get("/v1/user/getAddress");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const addAddress = createAsyncThunk(
  "user/addAddress",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("/v1/user/addAddress", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);



export const updateAddress = createAsyncThunk(
  "user/updateAddress",
  async ({ addressId, data }) => {
    const res = await axiosClient.put(
      `/v1/user/updateAddress/${addressId}`,
      data
    );
    return res.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async (addressId) => {
    const res = await axiosClient.delete(
      `/v1/user/deleteAddress/${addressId}`
    );
    return res.data;
  }
);