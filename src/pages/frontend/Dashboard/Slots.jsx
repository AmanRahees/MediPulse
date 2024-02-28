/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import useAxios from "@/services/useAxios";
import DatePicker from "@/widgets/common/DatePicker";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/widgets/ui/tooltip";
import Board from "@/components/frontend/Board/Board";
import Loader from "@/components/frontend/Loader/Loader";
import { formatTime } from "@/func/time";
import { pyDateFormatter } from "@/func/formatter";

function Slots() {
  const api = useAxios();
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const formattedDate = pyDateFormatter(selectedDate);
    api
      .get(`doctors/slots?date=${formattedDate}`)
      .then((res) => {
        setSlots(res.data);
      })
      .catch(() => {
        setError("No slots available for Today.");
      });
    // eslint-disable-next-line
  }, []);
  const handleDateSelection = (e) => {
    if (e) {
      const adjustedDate = new Date(
        e.getTime() - e.getTimezoneOffset() * 60000
      );
      setSelectedDate(adjustedDate);
    }
  };
  const getSelectedDateSlots = (e) => {
    e.preventDefault();
    const formattedDate = pyDateFormatter(selectedDate);
    api
      .get(`doctors/slots?date=${formattedDate}`)
      .then((res) => {
        setSlots(res.data);
      })
      .catch(() => {
        setError("No slots available for selected date.");
      });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Board>
      <div className="">
        <p className="font-bold text-xl mb-2 text-zinc-800">Slots</p>
        {error && <small className="block text-red-600">{error}</small>}
        <form
          onSubmit={getSelectedDateSlots}
          className="flex gap-1 md:gap-2 my-5"
        >
          <div className="py-2 px-2 md:px-3 rounded-md border bg-slate-50 text-sm">
            Date:
          </div>
          <div className="w-[200px]">
            <DatePicker onChange={handleDateSelection} isMin={true} />
          </div>
          <button className="bg-primary text-white px-2 md:px-3 py-2 text-sm border rounded-md">
            Search
          </button>
        </form>
        <hr />
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 my-5">
          {slots.map((slot, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={`text-sm font-bold text-gray-600 p-2 rounded-md ${
                      slot?.is_booked
                        ? "bg-green-100 text-green-600"
                        : "bg-sky-100"
                    }`}
                    key={index}
                  >
                    {formatTime(slot?.start_time)}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{formatTime(slot?.start_time)}</p>
                  <small className="text-center">
                    <b
                      className={`mr-1 inline-block w-[8px] h-[8px] rounded-xl ${
                        slot?.is_booked ? "bg-green-600" : "bg-sky-500"
                      }`}
                    ></b>
                    {slot?.is_booked ? "Booked" : "Available"}
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
