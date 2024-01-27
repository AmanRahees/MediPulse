/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../Navbar/Navbar";
import "./layout.css";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="_layout">{children}</div>
    </div>
  );
}

export default Layout;
