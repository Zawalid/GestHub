import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer";

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
