/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axios";

export const getPatientInfo = createAsyncThunk(
  "user/getPatientInfo",
  async (userData) => {
    const response = await axiosInstance.get(
      `contexts/patientInfo/${userData?.user_id}`
    );
    return response.data;
  }
);

export const getDoctorInfo = createAsyncThunk(
  "user/getDoctorInfo",
  async (userData) => {
    const response = await axiosInstance.get(
      `contexts/doctorInfo/${userData?.user_id}`
    );
    return response.data;
  }
);

export const getAdminInfo = createAsyncThunk(
  "user/getAdminInfo",
  async (userData) => {
    const response = await axiosInstance.get(
      `contexts/adminInfo/${userData?.user_id}`
    );
    return response.data;
  }
);
