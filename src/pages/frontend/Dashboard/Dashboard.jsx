/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faBedPulse,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import Board from "@/components/frontend/Board/Board";
import "./dashboard.css";

function Dashboard() {
  return (
    <Board>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 mb-5">
          <div className="_docDCI">
            <div className="grid place-items-center w-[80px] h-[80px] border-8 border-blue-400 rounded-full">
              <FontAwesomeIcon
                icon={faBedPulse}
                className="text-2xl text-blue-400"
              />
            </div>
            <div className="">
              <p className="">Patients</p>
              <p className="font-bold text-2xl">140</p>
            </div>
          </div>
          <div className="_docDCI">
            <div className="grid place-items-center w-[80px] h-[80px] border-8 border-teal-200 rounded-full">
              <FontAwesomeIcon
                icon={faCalendarCheck}
                className="text-2xl text-teal-200"
              />
            </div>
            <div className="">
              <p className="">Appointments</p>
              <p className="font-bold text-2xl">260</p>
            </div>
          </div>
          <div className="_docDCI">
            <div className="grid place-items-center w-[80px] h-[80px] border-8 border-green-400 rounded-full">
              <FontAwesomeIcon
                icon={faBriefcase}
                className="text-2xl text-green-400"
              />
            </div>
            <div className="">
              <p className="">Earnings</p>
              <p className="font-bold text-2xl">5000</p>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </Board>
  );
}

export default Dashboard;
