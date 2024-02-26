import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import walletReducer from "./reducers/walletReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    wallet: walletReducer,
  },
});
