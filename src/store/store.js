// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingsSlice';
// Remove uiReducer import

const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    // Remove ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/login/fulfilled'],
      },
    }),
  devTools: import.meta.env.DEV,
});

export default store;