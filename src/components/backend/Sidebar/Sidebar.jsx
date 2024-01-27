/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AlignLeft, Activity } from "lucide-react";
import { SidebarItems } from "./Elements";
import "./sidebar.css";

function Sidebar() {
  const location = useLocation();
  const [xtnd, setXtnd] = useState(true);
  return (
    <div className={`sidebar_ ${!xtnd ? "active" : ""}`}>
      <div className="sidebar-container_">
        <div className="sidebarTop_">
          <h1 className="sidebar-logo">
            <Activity className="inline-block text-highlight" />
            Medi
            <span
              className="text-highlight font-bold"
              style={{ fontFamily: "Montserrat Bold" }}
            >
              Pulse
            </span>
          </h1>
          <button onClick={() => setXtnd(!xtnd)} className="text-white">
            <AlignLeft />
          </button>
        </div>
        <div className="sidebar-elements_">
          {SidebarItems.map((item, index) => (
            <Link
              to={item.ItemPath}
              key={index}
              className={`sidebarItem_ ${
                location.pathname === item.ItemPath ? "active" : ""
              }`}
            >
              <item.Icon /> <span>{item.ItemName}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
