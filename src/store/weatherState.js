// weatherSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async ({ latitude, longitude }, thunkAPI) => {
    try {
      const params = {
        latitude,
        longitude,
        current:
          "visibility,temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,dew_point_2m",
        hourly:
          "precipitation_probability,temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,dew_point_2m",
        daily:
          "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant",
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        precipitation_unit: "mm",
        forecast_days: "10",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast`,
        { params }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherData: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weatherData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
