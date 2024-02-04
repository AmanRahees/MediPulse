/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/widgets/ui/select";
import Board from "@/components/frontend/Board/Board";
import { SLOT_DURATIONS, DAYS } from "@/services/constants";

function Timings() {
  return (
    <Board>
      <div>
        <p className="font-bold text-xl mb-2 text-zinc-800">Schedule Timings</p>
        <form className="relative my-3">
          <Label>Timing Slot Duration</Label>
          <div className="flex gap-2 my-1">
            <Select name="slot_duration" defaultValue="10 mins">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SLOT_DURATIONS.map((duration, index) => (
                    <SelectItem key={index} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <button className="bg-primary text-white px-2 rounded-md text-sm">
              Update
            </button>
          </div>
        </form>
        <hr />
        <div className="p-3">
          <p className="font-bold text-lg text-zinc-700 mb-2">Time Slots</p>
          <div className="flex gap-3 py-2">
            <p className="w-[120px]">Day</p>
            <p className="w-[120px]">Time</p>
          </div>
          {DAYS.map((day, index) => (
            <div className="flex items-center gap-3 py-2" key={index}>
              <p className="text-gray-700 text-sm w-[120px]">{day}</p>
              {/* <div className="flex justify-between items-center px-5 gap-5 rounded-md text-sm w-max">
                <p className="text-gray-600">10:00 AM - 01:00 PM</p>
                <button className="text-red-500 transition-all duration-300 px-2 rounded-full hover:scale-105">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div> */}
              <div className="flex justify-between items-center px-5 gap-5 rounded-md text-sm w-max">
                <small className="bg-red-200 text-red-600 px-2 rounded-xl">
                  Closed
                </small>
                <button className="text-primary transition-all duration-300 px-2 rounded-full text-xs w-max">
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Board>
  );
}

export default Timings;

{
  /* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 p-3">
            {DAYS.map((day, index) => (
              <button
                className={`border px-3 py-2 text-sm rounded transition-all duration-300 ${
                  selectedDay === day
                    ? "bg-primary text-white"
                    : "text-gray-600 bg-white hover:bg-sky-100"
                }`}
                key={index}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
          <hr />
          <div className="p-3">
            <div className="flex justify-between mb-3">
              <p className="font-bold text-lg text-zinc-700">Time Slots</p>
              <button className="flex gap-1 items-center text-secondary hover:text-ternary font-bold transition-colors duration-300">
                <FontAwesomeIcon icon={faCirclePlus} />
                Add Slot
              </button>
            </div>
            <p className="text-gray-600">Not Available</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              <div className="flex justify-between items-center bg-secondary py-2 px-5 gap-2 rounded-md text-sm w-max">
                <p className="text-white">10:00 AM - 01:00 PM</p>
                <button className="text-white hover:text-red-500 transition-all duration-300">
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
              <div className="flex justify-between items-center bg-secondary py-2 px-5 gap-2 rounded-md text-sm w-max">
                <p className="text-white">10:00 AM - 01:00 PM</p>
                <button className="text-white hover:text-red-500 transition-all duration-300">
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
            </div>
          </div> */
}
