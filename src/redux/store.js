import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import walletReducer from "./reducers/walletReducer";
import slotReducer from "./reducers/slotReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    wallet: walletReducer,
    slot: slotReducer,
  },
});
