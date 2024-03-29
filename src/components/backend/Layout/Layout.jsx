/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import AuthContext from "@/contexts/AuthContext";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import ExpiredAlert from "../Elements/ExpiredAlert";
import "./layout.css";

function Layout({ children }) {
  const [isToken, setIsToken] = useState(true);
  const { authTokens } = useContext(AuthContext);
  return (
    <div className="layout_">
      <Sidebar />
      <div className="content_container_">
        <div className="float-end">
          <Header />
        </div>
        <div className="p-2 md:px-5">{children}</div>
      </div>
      {!isToken && <ExpiredAlert />}
    </div>
  );
}

export default Layout;
