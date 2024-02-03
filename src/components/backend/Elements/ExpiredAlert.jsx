/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

function ExpiredAlert() {
  return (
    <div className="absolute w-full h-screen top-0 bg-[#00000088]">
      <div className="flex justify-center items-center h-full">
        <div className="relative bg-white border border-gray-300 p-3 w-[350px] md:w-[500px] rounded-md h-[160px]">
          <div className="flex items-start gap-5 m-4">
            <p className="p-3 bg-yellow-200 rounded-full">
              <AlertTriangle className="text-yellow-600 w-[20px] h-[20px]" />
            </p>
            <div className="">
              <h1 className="text-lg">You Token has Expired</h1>
              <p className="text-gray-600 text-sm md:text-sm">
                Please log in again to continue using the app.
              </p>
            </div>
          </div>
          <Link
            to="/admin/login"
            className="absolute bottom-5 right-5 border border-gray-300 py-2 px-3 rounded-md text-gray-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ExpiredAlert;
