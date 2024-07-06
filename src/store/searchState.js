import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchData = createAsyncThunk(
  "location/fetchSearchData",
  async ({ query }, thunkAPI) => {
    try {
      let response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
      );
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchData: null,
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchData.fulfilled, (state, action) => {
        state.searchData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSearchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
