/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { formatLongDate, getWeekDay, getShortWeekDay } from "@/func/days";
import Layout from "@/components/frontend/Layout/Layout";

function Booking() {
  return (
    <Layout>
      <div className="p-3 lg:py-20 lg:px-32">
        <div className="border p-3">
          <div className="flex gap-5 w-full mb-2">
            <img
              src="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-02.jpg"
              alt=""
              className="w-[100px]"
            />
            <div className="">
              <p className="font-bold text-lg">Dr. Aman Rahees</p>
              <p className="text-secondary my-1">
                <FontAwesomeIcon icon={faStethoscope} /> Dentist
              </p>
              <p className="text-[#6B7280] my-2">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-gray-700"
                />{" "}
                Mananthavady, Kerala
              </p>
            </div>
          </div>
          <hr className="my-5" />
          <div className="my-2">
            <p className="text-xl font-bold text-gray-700">
              {formatLongDate(new Date())}
            </p>
            <p className="text-sm">{getWeekDay(new Date())}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Booking;
