/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faClose } from "@fortawesome/free-solid-svg-icons";
import NavDropdown from "./NavDropdown";
import Logo from "@/assets/images/MediPulse-logo.png";
import { NavItems } from "./NavItems";
import "./navbar.css";

function Navbar() {
  const location = useLocation();
  const [navShow, setNavShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <div className="navbar-lg">
        <div className="nav-container">
          <div className="nav-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="navItems">
            {NavItems.map((item, index) => (
              <>
                {item.ItemPath === "/" ? (
                  <Link
                    to={item.ItemPath}
                    key={index}
                    className={`nav-item ${
                      location.pathname === item.ItemPath ? "active" : ""
                    }`}
                  >
                    {item.ItemName}
                  </Link>
                ) : (
                  <Link
                    to={item.ItemPath}
                    key={index}
                    className={`nav-item ${
                      location.pathname.includes(item.ItemPath) ? "active" : ""
                    }`}
                  >
                    {item.ItemName}
                  </Link>
                )}
              </>
            ))}
          </div>
          <div className="nav-adds">
            {isLogin ? (
              <NavDropdown />
            ) : (
              <Link to="/login" className="navBtn">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      {/*  */}
      <div className="navbar-sm">
        <div className="nav-container">
          <div className="nav-logo">
            <img src={Logo} alt="" />
          </div>
          <button onClick={() => setNavShow(!navShow)} className="p-2">
            <FontAwesomeIcon icon={faBarsStaggered} />
          </button>
          <div className={`navItems ${navShow ? "active" : ""}`}>
            <div className="flex flex-col w-full p-3 gap-2">
              <div className="flex justify-end">
                <button className="" onClick={() => setNavShow(!navShow)}>
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
              {NavItems.map((item, index) => (
                <Link
                  to={item.ItemPath}
                  key={index}
                  className={`nav-item ${
                    location.pathname === item.ItemPath ? "active" : ""
                  }`}
                >
                  {item.ItemName}
                </Link>
              ))}
              {isLogin ? (
                <div className="text-right">
                  <NavDropdown />
                </div>
              ) : (
                <Link to="/login" className="nav-item">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
