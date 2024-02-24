import { createAction } from "@reduxjs/toolkit";

export const makeUserRequest = createAction("makeUserRequest");

export const getPatientInfo = createAction("getPatientInfo");

export const getDoctorInfo = createAction("getDoctorInfo");

export const updateSchedules = createAction("updateSchedules");

export const getAdminInfo = createAction("getAdminInfo");

export const updateUserInfo = createAction("updateUserInfo");
