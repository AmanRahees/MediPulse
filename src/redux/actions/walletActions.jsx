import { createAction } from "@reduxjs/toolkit";

export const makeWalletRequest = createAction("makeWalletRequest");

export const getWallet = createAction("getWallet");

export const updateWallet = createAction("updateWallet");
