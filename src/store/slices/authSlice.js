// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/auth.service';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      const { token, admin } = response.data;

      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(admin));

      return { token, user: admin };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  try {
    await authService.logout();
  } catch (_) { /* ignore */ }
  localStorage.removeItem('token');
  localStorage.removeItem('user');
});

export const fetchMeThunk = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const response = await authService.me();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch user');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginThunk.fulfilled, (s, action) => {
        s.loading = false;
        s.user = action.payload.user;
        s.token = action.payload.token;
        s.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (s) => {
        s.user = null;
        s.token = null;
        s.isAuthenticated = false;
      })
      .addCase(fetchMeThunk.fulfilled, (s, action) => {
        s.user = action.payload;
        s.isAuthenticated = true;
      });
  },
});

export const { clearError, setUser, setToken, logout } = authSlice.actions;
export const selectAuth = (s) => s.auth;
export const selectUser = (s) => s.auth.user;
export const selectToken = (s) => s.auth.token;
export const selectIsAuthenticated = (s) => s.auth.isAuthenticated;
export const selectAuthLoading = (s) => s.auth.loading;
export const selectAuthError = (s) => s.auth.error;

export default authSlice.reducer;