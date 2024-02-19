import { createReducer } from "@reduxjs/toolkit";
import {
  getWallet,
  makeWalletRequest,
  updateWallet,
} from "@/redux/actions/walletActions";

const initialState = {
  wallet: {},
  transactions: [],
  loading: false,
};

const walletReducer = createReducer(initialState, (builder) => {
  builder.addCase(makeWalletRequest, (state) => {
    state.loading = true;
  });
  builder.addCase(getWallet, (state, action) => {
    state.userInfo = action.payload;
    state.loading = false;
  });
  builder.addCase(updateWallet, (state, action) => {
    state.loading = true;
    state.userInfo = action.payload;
    state.loading = false;
  });
});

export default walletReducer;
