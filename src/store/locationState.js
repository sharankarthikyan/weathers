import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLocationData = createAsyncThunk(
  "location/fetchLocationData",
  async ({ latitude, longitude }, thunkAPI) => {
    try {
      let response;
      if (latitude != null && longitude != null) {
        response = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
        );
      } else {
        response = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client`
        );
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locationData: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    setLocationData(state, action) {
      state.locationData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLocationData.fulfilled, (state, action) => {
        state.locationData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchLocationData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setLocationData } = locationSlice.actions;
export default locationSlice.reducer;
