import { createReducer } from "@reduxjs/toolkit";
import {
  getAdminInfo,
  getDoctorInfo,
  getPatientInfo,
  updateUserInfo,
  makeUserRequest,
} from "@/redux/actions/userActions";

const initialState = {
  userInfo: {},
  loading: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(makeUserRequest, (state) => {
    state.loading = true;
  });
  // patient
  builder.addCase(getPatientInfo, (state, action) => {
    state.userInfo = action.payload;
    state.loading = false;
  });
  // Doctor
  builder.addCase(getDoctorInfo, (state, action) => {
    state.userInfo = action.payload;
    state.loading = false;
  });
  // admin
  builder.addCase(getAdminInfo, (state, action) => {
    state.userInfo = action.payload;
    state.loading = false;
  });
  // update for all
  builder.addCase(updateUserInfo, (state, action) => {
    state.loading = true;
    state.userInfo = action.payload;
    state.loading = false;
  });
});

export default userReducer;
