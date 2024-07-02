import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPublicIpAddress = createAsyncThunk(
  "publicIPAddress/fetchPublicIpAddress",
  async () => {
    const res = await axios.get(`https://api.ipify.org?format=json`);
    const data = await res.data;
    return data.ip;
  }
);

export const publicIpSlice = createSlice({
  name: "publicIPAddress",
  initialState: {
    publicIp: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicIpAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPublicIpAddress.fulfilled, (state, action) => {
        state.publicIp = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPublicIpAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    selectPublicIpAddress: (state) => state.publicIp,
  },
});

export const { getPublicIpFetch, getPublicIpSuccess, getPublicIpFailure } =
  publicIpSlice.actions;

export const { selectPublicIpAddress } = publicIpSlice.selectors;

export default publicIpSlice.reducer;
