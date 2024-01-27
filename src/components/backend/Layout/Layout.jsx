/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./layout.css";

function Layout({ children }) {
  return (
    <div className="layout_">
      <Sidebar />
      <div className="content_container_">
        <div className="float-end">
          <Header />
        </div>
        <div className="p-2 md:px-5">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
