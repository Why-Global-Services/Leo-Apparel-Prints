// src/store/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  activeItem: 'dashboard',
  toasts: [],
};

let toastId = 0;

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
      document.body.setAttribute('data-theme', state.theme);
    },

    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme);
      document.body.setAttribute('data-theme', state.theme);
    },

    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    toggleMobileSidebar(state) {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },

    closeMobileSidebar(state) {
      state.mobileSidebarOpen = false;
    },

    setActiveItem(state, action) {
      state.activeItem = action.payload;
    },

    addToast(state, action) {
      const { message, type = 'info', duration = 3000 } = action.payload;
      state.toasts.push({ id: ++toastId, message, type, duration });
    },

    removeToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  toggleMobileSidebar,
  closeMobileSidebar,
  setActiveItem,
  addToast,
  removeToast,
} = uiSlice.actions;

// Selectors
export const selectTheme = (state) => state.ui.theme;
export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed;
export const selectMobileSidebarOpen = (state) => state.ui.mobileSidebarOpen;
export const selectActiveItem = (state) => state.ui.activeItem;
export const selectToasts = (state) => state.ui.toasts;

export default uiSlice.reducer;