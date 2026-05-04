"use client";

import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser ,fetchProfile } from "./authThunks";

// 🔥 Load from localStorage
const getUserFromStorage = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const getTokenFromStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || null;
  }
  return null;
};

const getRefreshTokenFromStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refreshToken") || null;
  }
  return null;
};

const initialState = {
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
  refreshToken: getRefreshTokenFromStorage(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },

    setToken: (state, action) => {
      state.token = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },

     setUser: (state, action) => {
    state.user = action.payload;
    localStorage.setItem("user", JSON.stringify(action.payload));
  },

  },

  extraReducers: (builder) => {
    builder
      // 🔐 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // 🆕 REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload.data;

        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
  },
});

export const { logout, setToken,setUser } = authSlice.actions;
export default authSlice.reducer;