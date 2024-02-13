/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation } from "react-router-dom";
import "./loader.css";

function Loader() {
  const location = useLocation();
  return (
    <div
      className={`flex justify-center items-center h-screen ${
        location.pathname.includes("/admin") ? "bg-main" : "bg-primary-color"
      }`}
    >
      <div className="_loader"></div>
    </div>
  );
}

export default Loader;
