import { configureStore } from "@reduxjs/toolkit";

import locationReducer from "./locationState";
import weatherReducer from "./weatherState";

let middleware = [];

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middleware.push(logger);
}

export const makeStore = () => {
  return configureStore({
    reducer: {
      location: locationReducer,
      weather: weatherReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};
