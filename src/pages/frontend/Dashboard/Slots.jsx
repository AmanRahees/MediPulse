/* eslint-disable no-unused-vars */
import React from "react";
import DatePicker from "@/widgets/common/DatePicker";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/widgets/ui/tooltip";
import Board from "@/components/frontend/Board/Board";
import { slotTimes } from "@/data/slotTimes";

function Slots() {
  return (
    <Board>
      <div className="">
        <p className="font-bold text-xl mb-2 text-zinc-800">Slots</p>
        <form className="flex gap-1 md:gap-2 my-5">
          <div className="py-2 px-2 md:px-3 rounded-md border bg-slate-50 text-sm">
            Date:
          </div>
          <div className="w-[200px]">
            <DatePicker />
          </div>
          <button className="bg-primary text-white px-2 md:px-3 py-2 text-sm border rounded-md">
            Search
          </button>
        </form>
        <hr />
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 my-5">
          {slotTimes.map((slot, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={`text-sm font-bold text-gray-600 p-2 rounded-md ${
                      slot.status.toLowerCase() === "booked"
                        ? "bg-green-100 text-green-600"
                        : "bg-sky-100"
                    }`}
                    key={index}
                  >
                    {slot.slot_time}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>09:10 P.M</p>
                  <small className="text-center">
                    <b
                      className={`mr-1 inline-block w-[8px] h-[8px] rounded-xl ${
                        slot.status.toLowerCase() === "booked"
                          ? "bg-green-600"
                          : "bg-sky-500"
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
    </Board>
  );
}

export default Slots;
