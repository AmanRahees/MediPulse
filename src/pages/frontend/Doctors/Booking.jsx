/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/widgets/ui/tooltip";
import {
  formatLongDate,
  getWeekDay,
  getShortWeekDay,
  formatDate,
  formatDateWithoutYear,
} from "@/func/days";
import Layout from "@/components/frontend/Layout/Layout";
import { slotTimes } from "@/data/slotTimes";

function Booking() {
  const [selected, setSelected] = useState();
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
          <div className="grid grid-cols-7 md:grid-cols-7 gap-1 md:gap-5">
            {[1, 2, 3, 4, 5, 6, 7].map((_, index) => {
              const currentDate = new Date();
              currentDate.setDate(currentDate.getDate() + index + 1);
              return (
                <button className="py-1 md:p-2 border rounded-md" key={index}>
                  <p className="font-bold text-[12px] md:text-base">
                    {getShortWeekDay(currentDate)}
                  </p>
                  <small className="text-[10px] md:text-xs text-gray-600 text-ellipsis hidden md:block">
                    {formatDate(currentDate)}
                  </small>
                  <small className="text-[10px] md:text-xs text-gray-600 text-ellipsis md:hidden">
                    {formatDateWithoutYear(currentDate)}
                  </small>
                </button>
              );
            })}
          </div>
          <hr className="my-5" />
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 my-5">
            {slotTimes.map((slot, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className={`text-sm font-bold text-gray-600 p-2 rounded-md ${
                        slot === selected
                          ? "bg-secondary text-white"
                          : slot.status.toLowerCase() === "booked"
                          ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                          : "bg-sky-50"
                      }`}
                      key={index}
                      disabled={
                        slot.status.toLocaleLowerCase() === "booked"
                          ? true
                          : false
                      }
                      onClick={() => setSelected(slot)}
                    >
                      {slot.slot_time}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{slot.slot_time}</p>
                    <small className="text-center">
                      <b
                        className={`mr-1 inline-block w-[8px] h-[8px] rounded-xl ${
                          slot.status.toLowerCase() === "booked"
                            ? "bg-red-600"
                            : "bg-green-600"
                        }`}
                      ></b>
                      {slot.status}
                    </small>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Booking;
