// // src/store/slices/settingsSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const hexToRgb = (hex) => {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '245, 184, 0';
// };

// const applyAccentColor = (color) => {
//   // These CSS variables will be used by ALL components
//   document.documentElement.style.setProperty('--primary-color', color);
//   document.documentElement.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${color}, #E8960A)`);
//   document.documentElement.style.setProperty('--primary-light', `rgba(${hexToRgb(color)}, 0.1)`);
//   document.documentElement.style.setProperty('--primary-hover', `#E8960A`);
//   document.documentElement.style.setProperty('--primary-dark', `#D97706`);
// };

// const loadSettings = () => {
//   const saved = localStorage.getItem('adminSettings');
//   if (saved) {
//     try {
//       return JSON.parse(saved);
//     } catch (e) {
//       console.error('Error parsing saved settings', e);
//     }
//   }
//   return {
//     siteName: "SportsCraft",
//     supportEmail: "support@example.com",
//     accentColor: "#F5B800",
//   };
// };

// const initialState = loadSettings();

// // Apply on load
// if (initialState.accentColor) {
//   applyAccentColor(initialState.accentColor);
// }

// const settingsSlice = createSlice({
//   name: 'settings',
//   initialState,
//   reducers: {
//     updateGeneralSettings: (state, action) => {
//       const { siteName, supportEmail } = action.payload;
//       if (siteName !== undefined) state.siteName = siteName;
//       if (supportEmail !== undefined) state.supportEmail = supportEmail;
//       localStorage.setItem('adminSettings', JSON.stringify(state));
//       document.title = `${state.siteName} - Admin Panel`;
//     },
    
//     updateAppearanceSettings: (state, action) => {
//       state.accentColor = action.payload.accentColor;
//       localStorage.setItem('adminSettings', JSON.stringify(state));
//       applyAccentColor(state.accentColor); // CRITICAL: This updates CSS variables
//     },
//   },
// });

// export const { updateGeneralSettings, updateAppearanceSettings } = settingsSlice.actions;
// export const selectSettings = (state) => state.settings;
// export default settingsSlice.reducer;







// src/store/slices/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '245, 184, 0';
};

const applyAccentColor = (color) => {
  document.documentElement.style.setProperty('--primary-color', color);
  document.documentElement.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${color}, #E8960A)`);
  document.documentElement.style.setProperty('--primary-light', `rgba(${hexToRgb(color)}, 0.1)`);
};

// Function to apply sidebar gradient
const applySidebarGradient = (gradient) => {
  if (gradient) {
    document.documentElement.style.setProperty('--sidebar-gradient', gradient);
  }
};

// Function to apply topnav style
const applyTopNavStyle = (styleKey, customColor = null) => {
  const TOPNAV_STYLES = {
    glass: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    solid: {
      background: '#FFFFFF',
      backdropFilter: 'none',
      border: 'none'
    },
    gradient: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backdropFilter: 'none',
      border: 'none'
    },
    dark: {
      background: '#1E293B',
      backdropFilter: 'none',
      border: 'none'
    },
    transparent: {
      background: 'transparent',
      backdropFilter: 'none',
      border: 'none'
    }
  };

  let style;
  if (styleKey === 'custom' && customColor) {
    style = {
      background: customColor,
      backdropFilter: 'none',
      border: 'none'
    };
  } else {
    style = TOPNAV_STYLES[styleKey] || TOPNAV_STYLES.glass;
  }

  document.documentElement.style.setProperty('--topnav-bg', style.background);
  document.documentElement.style.setProperty('--topnav-backdrop', style.backdropFilter);
  document.documentElement.style.setProperty('--topnav-border', style.border);
};

const loadSettings = () => {
  const saved = localStorage.getItem('adminSettings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        siteName: parsed.siteName || "SportsCraft",
        supportEmail: parsed.supportEmail || "support@example.com",
        accentColor: parsed.accentColor || "#F5B800",
        themeName: parsed.themeName || "classic",
        sidebarGradient: parsed.sidebarGradient || 'linear-gradient(135deg, #09185b 0%, #0B3C6D 50%, #1E3A8A 100%)',
        topNavStyle: parsed.topNavStyle || 'glass',
        customTopNavBg: parsed.customTopNavBg || '#FFFFFF'
      };
    } catch (e) {
      console.error('Error parsing saved settings', e);
    }
  }
  return {
    siteName: "SportsCraft",
    supportEmail: "support@example.com",
    accentColor: "#F5B800",
    themeName: "classic",
    sidebarGradient: 'linear-gradient(135deg, #09185b 0%, #0B3C6D 50%, #1E3A8A 100%)',
    topNavStyle: 'glass',
    customTopNavBg: '#FFFFFF'
  };
};

const initialState = loadSettings();

// Apply all settings on load
applyAccentColor(initialState.accentColor);
applySidebarGradient(initialState.sidebarGradient);
applyTopNavStyle(initialState.topNavStyle, initialState.customTopNavBg);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateGeneralSettings: (state, action) => {
      const { siteName, supportEmail } = action.payload;
      if (siteName !== undefined) state.siteName = siteName;
      if (supportEmail !== undefined) state.supportEmail = supportEmail;
      localStorage.setItem('adminSettings', JSON.stringify(state));
      document.title = `${state.siteName} - Admin Panel`;
    },
    
    updateAppearanceSettings: (state, action) => {
      // Update accent color
      if (action.payload.accentColor !== undefined) {
        state.accentColor = action.payload.accentColor;
        applyAccentColor(state.accentColor);
      }
      
      // Update sidebar gradient
      if (action.payload.sidebarGradient !== undefined) {
        state.sidebarGradient = action.payload.sidebarGradient;
        applySidebarGradient(state.sidebarGradient);
      }
      
      // Update top nav style
      if (action.payload.topNavStyle !== undefined) {
        state.topNavStyle = action.payload.topNavStyle;
        applyTopNavStyle(state.topNavStyle, state.customTopNavBg);
      }
      
      // Update custom top nav background
      if (action.payload.customTopNavBg !== undefined) {
        state.customTopNavBg = action.payload.customTopNavBg;
        if (state.topNavStyle === 'custom') {
          applyTopNavStyle('custom', state.customTopNavBg);
        }
      }
      
      if (action.payload.themeName !== undefined) {
        state.themeName = action.payload.themeName;
      }
      
      localStorage.setItem('adminSettings', JSON.stringify(state));
    },
    
    resetSettings: (state) => {
      state.siteName = "SportsCraft";
      state.supportEmail = "support@example.com";
      state.accentColor = "#F5B800";
      state.themeName = "classic";
      state.sidebarGradient = 'linear-gradient(135deg, #09185b 0%, #0B3C6D 50%, #1E3A8A 100%)';
      state.topNavStyle = 'glass';
      state.customTopNavBg = '#FFFFFF';
      
      localStorage.setItem('adminSettings', JSON.stringify(state));
      applyAccentColor(state.accentColor);
      applySidebarGradient(state.sidebarGradient);
      applyTopNavStyle(state.topNavStyle, state.customTopNavBg);
      document.title = `${state.siteName} - Admin Panel`;
    }
  },
});

export const { updateGeneralSettings, updateAppearanceSettings, resetSettings } = settingsSlice.actions;
export const selectSettings = (state) => state.settings;
export default settingsSlice.reducer;