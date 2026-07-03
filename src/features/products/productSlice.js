// import { createSlice } from "@reduxjs/toolkit";
// import { fetchAllProducts, fetchProductById } from "./productThunks";

// const initialState = {
//   // All products
//   items: [],
//   loading: false,
//   error: null,

//   // Single product
//   selectedProduct: null,
//   selectedProductLoading: false,
//   selectedProductError: null,
// };

// const productSlice = createSlice({
//   name: "products",
//   initialState,

//   reducers: {
//     clearSelectedProduct: (state) => {
//       state.selectedProduct = null;
//       state.selectedProductError = null;
//     },

//     clearProductError: (state) => {
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       // ── Fetch All ──
//       .addCase(fetchAllProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchAllProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ── Fetch Single ──
//       .addCase(fetchProductById.pending, (state) => {
//         state.selectedProductLoading = true;
//         state.selectedProductError = null;
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.selectedProductLoading = false;
//         state.selectedProduct = action.payload;
//       })
//       .addCase(fetchProductById.rejected, (state, action) => {
//         state.selectedProductLoading = false;
//         state.selectedProductError = action.payload;
//       });
//   },
// });

// export const { clearSelectedProduct, clearProductError } = productSlice.actions;
// export default productSlice.reducer;








import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductById ,fetchFilterOptions} from "./productThunks";

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedProduct: null,
  selectedProductLoading: false,
  selectedProductError: null,
  filterOptions: {
    sports: [],
    apparels: [],
    segments: [],
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.selectedProductError = null;
    },
    clearProductError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single
      .addCase(fetchProductById.pending, (state) => {
        state.selectedProductLoading = true;
        state.selectedProductError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProductLoading = false;
        state.selectedProduct = action.payload;
        console.log("Product saved to Redux state:", action.payload);
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedProductLoading = false;
        state.selectedProductError = action.payload;
      })

      .addCase(fetchFilterOptions.fulfilled, (state, action) => {
          console.log("Filter API Error:", action.payload);
      state.filterOptions = action.payload;
    })
  },
});

export const { clearSelectedProduct, clearProductError } = productSlice.actions;
export default productSlice.reducer;