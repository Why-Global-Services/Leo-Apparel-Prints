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
import { loginAPI } from "@/services/authService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      return await loginAPI(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Add this function to get Google OAuth URL
export const getGoogleAuthUrl = createAsyncThunk(
  "auth/getGoogleAuthUrl",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/google/url', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to get Google auth URL');
      }
      
      const data = await response.json();
      return data.url;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Alternative: Simple redirect version without API call
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      // Direct redirect to Google OAuth
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      window.location.href = `${apiUrl}/api/auth/google`;
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Send OTP to email 
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.post("/auth/forgot-password", { email });
      // return response.data;
 
      // ── REMOVE THIS MOCK when your backend is ready ──
      await new Promise((r) => setTimeout(r, 1000));
      return { message: "OTP sent successfully", email };
      // ─────────────────────────────────────────────────
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);


// Verify OTP
export const verifyForgotPasswordOtp = createAsyncThunk(
  "auth/verifyForgotPasswordOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.post("/auth/verify-otp", { email, otp });
      // return response.data; // usually returns a reset token
 
      // ── REMOVE THIS MOCK when your backend is ready ──
      await new Promise((r) => setTimeout(r, 800));
      if (otp === "123456") {
        // simulate wrong OTP for testing
        return rejectWithValue("Invalid OTP");
      }
      return { message: "OTP verified", resetToken: "mock-reset-token-xyz" };
      // ─────────────────────────────────────────────────
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Invalid or expired OTP"
      );
    }
  }
);
 
// Reset Password 
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, newPassword, resetToken }, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.post("/auth/reset-password", {
      //   email,
      //   otp,
      //   newPassword,
      //   resetToken,   // if your backend uses a token from step 2
      // });
      // return response.data;
 
      // ── REMOVE THIS MOCK when your backend is ready ──
      await new Promise((r) => setTimeout(r, 1000));
      return { message: "Password reset successfully" };
      // ─────────────────────────────────────────────────
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to reset password"
      );
    }
  }
);
 
 

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO USE IN ForgotPasswordModal.jsx:
// ─────────────────────────────────────────────────────────────────────────────
//
// import { useDispatch } from "react-redux";
// import { forgotPassword, verifyForgotPasswordOtp, resetPassword } from "@/features/auth/authThunks";
//
// const dispatch = useDispatch();
//
// // Step 1 — Send OTP
// const result = await dispatch(forgotPassword({ email }));
// if (forgotPassword.fulfilled.match(result)) { setStep(2); }
// else { setErrors({ email: result.payload }); }
//
// // Step 2 — Verify OTP
// const result = await dispatch(verifyForgotPasswordOtp({ email, otp: otp.join("") }));
// if (verifyForgotPasswordOtp.fulfilled.match(result)) {
//   setResetToken(result.payload.resetToken); // store if needed
//   setStep(3);
// } else { setErrors({ otp: result.payload }); }
//
// // Step 3 — Reset Password
// const result = await dispatch(resetPassword({ email, otp: otp.join(""), newPassword, resetToken }));
// if (resetPassword.fulfilled.match(result)) { setStep(4); }
// else { setErrors({ newPassword: result.payload }); }
// ─────────────────────────────────────────────────────────────────────────────
 