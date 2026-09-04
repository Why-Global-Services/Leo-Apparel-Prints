import { createSlice } from "@reduxjs/toolkit";
import { fetchAddresses,updateAddress,deleteAddress } from "./userThunks";

const initialState = {
  addresses: [],
};

const getAddressesFromResponse = (payload) => {
  const data = payload?.data ?? payload;
  if (Array.isArray(data)) return data;
  return Array.isArray(data?.address) ? data.address : [];
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
 extraReducers: (builder) => {
  builder
    .addCase(fetchAddresses.fulfilled, (state, action) => {
      state.addresses = getAddressesFromResponse(action.payload);
    })

    .addCase(updateAddress.fulfilled, (state, action) => {
      state.addresses = getAddressesFromResponse(action.payload);
    })

    .addCase(deleteAddress.fulfilled, (state, action) => {
      state.addresses = getAddressesFromResponse(action.payload);
    });
}
  
});

export default userSlice.reducer;