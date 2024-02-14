/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import AuthContext from "@/contexts/AuthContext";
import Layout from "@/components/frontend/Layout/Layout";
import Aside from "@/components/frontend/Aside/Aside";
import {
  getPatientInfo,
  getDoctorInfo,
  getAdminInfo,
} from "@/redux/actions/userActions";
import { patientItems } from "./items";
import { doctortItems } from "./items";
import "./board.css";

Board.propTypes = {
  children: PropTypes.element.isRequired,
};

function Board({ children }) {
  const { userData } = useContext(AuthContext);
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData?.role === "doctor") {
      dispatch(getDoctorInfo(userData));
    } else if (userData?.role === "admin") {
      //
    } else if (userData?.role === "patient") {
      dispatch(getPatientInfo(userData));
    }
  }, [dispatch, userData]);
  return (
    <Layout>
      <div className="p-3 lg:py-20 lg:px-32">
        <main className="pfl_wrapper">
          <Aside
            items={userData.role === "doctor" ? doctortItems : patientItems}
            userInfo={userInfo}
            loading={loading}
            role={userData.role}
          />
          <div className="pfl_n2 border p-5">{children}</div>
        </main>
      </div>
    </Layout>
  );
}

export default Board;
