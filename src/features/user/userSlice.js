import { createSlice } from "@reduxjs/toolkit";
import { fetchAddresses,updateAddress,deleteAddress } from "./userThunks";

const initialState = {
  addresses: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
 extraReducers: (builder) => {
  builder
    .addCase(fetchAddresses.fulfilled, (state, action) => {
      state.addresses = action.payload.data || [];
    })

    .addCase(updateAddress.fulfilled, (state, action) => {
      state.addresses = action.payload.data;
    })

    .addCase(deleteAddress.fulfilled, (state, action) => {
      state.addresses = action.payload.data;
    });
}
  
});

export default userSlice.reducer;