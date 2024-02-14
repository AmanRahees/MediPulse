/* eslint-disable no-unused-vars */
import { createReducer } from "@reduxjs/toolkit";
import {
  getAdminInfo,
  getDoctorInfo,
  getPatientInfo,
} from "@/redux/actions/userActions";

const initialState = {
  userInfo: {},
  loading: false,
  error: null,
};

const userReducer = createReducer(initialState, (builder) => {
  // patient
  builder.addCase(getPatientInfo.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(getPatientInfo.fulfilled, (state, action) => {
    state.userInfo = action.payload;
    state.loading = false;
  });
  builder.addCase(getPatientInfo.rejected, (state) => {
    state.loading = false;
  });
  // Doctor
  builder.addCase(getDoctorInfo.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(getDoctorInfo.fulfilled, (state, action) => {
    state.userInfo = action.payload;
    state.loading = false;
  });
  builder.addCase(getDoctorInfo.rejected, (state) => {
    state.loading = false;
  });
  // admin
  builder.addCase(getAdminInfo.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(getAdminInfo.fulfilled, (state, action) => {
    state.userInfo = action.payload;
    state.loading = false;
  });
  builder.addCase(getAdminInfo.rejected, (state) => {
    state.loading = false;
  });
});

export default userReducer;
