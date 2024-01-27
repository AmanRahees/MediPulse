/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faClose } from "@fortawesome/free-solid-svg-icons";
import Logo from "@/assets/images/MediPulse-logo.png";
import "./navbar.css";

function Navbar() {
  const location = useLocation();
  const [navShow, setNavShow] = useState(false);
  return (
    <>
      <div className="navbar-lg">
        <div className="nav-container">
          <div className="nav-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="navItems">
            <Link
              to="/"
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to=""
              className={`nav-item ${
                location.pathname === "/doctors" ? "active" : ""
              }`}
            >
              Doctors
            </Link>
            <Link
              to=""
              className={`nav-item ${
                location.pathname === "/services" ? "active" : ""
              }`}
            >
              Services
            </Link>
            <Link
              to=""
              className={`nav-item ${
                location.pathname === "/contact" ? "active" : ""
              }`}
            >
              Contact
            </Link>
          </div>
          <div className="nav-adds">
            <Link to="/login" className="navBtn">
              Login
            </Link>
          </div>
        </div>
      </div>
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
              <Link
                to="/"
                className={`nav-item ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to=""
                className={`nav-item ${
                  location.pathname === "/doctors" ? "active" : ""
                }`}
              >
                Doctors
              </Link>
              <Link
                to=""
                className={`nav-item ${
                  location.pathname === "/services" ? "active" : ""
                }`}
              >
                Services
              </Link>
              <Link
                to=""
                className={`nav-item ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
              >
                Contact
              </Link>
              <Link
                to="/login"
                className={`nav-item ${
                  location.pathname === "/login" ? "active" : ""
                }`}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
