// import { createSlice } from "@reduxjs/toolkit";
// import { loginUser } from "./authThunks";

// const initialState = {
//   user: null,
//   token: null,
//   role: null,
//   loading: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.role = null;
//     },
//     setToken: (state, action) => {
//       state.token = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.accessToken;
//         state.role = action.payload.user.role;
//       })
//       .addCase(loginUser.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export const { logout, setToken } = authSlice.actions;
// export default authSlice.reducer;









"use client";

import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunks";

// 🔥 Load from localStorage (for persistence)
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

// ✅ Initial State
const initialState = {
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
  loading: false,
  error: null,
};

// ✅ Slice
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // 🔐 Logout
    logout: (state) => {
      state.user = null;
      state.token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },

    // 🔄 Set Token (for interceptor / refresh)
    setToken: (state, action) => {
      state.token = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // ⏳ Pending
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Success
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;

        // 🔥 Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("token", action.payload.accessToken);
        }
      })

      // ❌ Failed
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

// 🔥 EXPORTS
export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;