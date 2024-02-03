/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import ExpiredAlert from "../Elements/ExpiredAlert";
import "./layout.css";

function Layout({ children }) {
  const [expiredAlert, setExpiredAlert] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="_layout">{children}</div>
      {expiredAlert && <ExpiredAlert />}
    </div>
  );
}

export default Layout;
