// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { loginAPI } from "@/services/authService";

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (data, { rejectWithValue }) => {
//     try {
//       return await loginAPI(data);
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );








// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { loginAPI } from "@/services/authService";

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (data, { rejectWithValue }) => {
//     try {
//       return await loginAPI(data);
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );















// src/features/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI,forgotPasswordAPI,verifyResetOtpAPI,resetPasswordAPI } from "@/services/authService";


export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginAPI(data);

      console.log("LOGIN RESPONSE:", res); // ✅ debug

      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);


export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      return await registerAPI(data);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Register failed");
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${apiUrl}/v1/google`;
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await forgotPasswordAPI(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const verifyResetOtp = createAsyncThunk(
  "auth/verifyResetOtp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await verifyResetOtpAPI(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await resetPasswordAPI(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);