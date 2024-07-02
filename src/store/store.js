import { configureStore } from "@reduxjs/toolkit";

import publicIPAddressReducer from "./publicIPAddress/publicIPAddressState";

let middleware = [];

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middleware.push(logger);
}

export const makeStore = () => {
  return configureStore({
    reducer: {
      publicIPAddress: publicIPAddressReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};
