import PropTypes from "prop-types";
import { DAYS } from "@/services/constants";
import { formatTime } from "@/func/time";

function Timings({ doctor }) {
  return (
    <>
      <div className="p-5">
        <table className="w-full md:w-max mx-auto text-left border">
          <thead className="border-b">
            <tr>
              <th className="py-2 px-5 md:px-20 bg-blue-50">Days</th>
              <th className="py-2 px-5 md:px-20 bg-blue-50 text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day, index) => {
              const schedule = doctor?.schedules?.find(
                (schedule) => schedule.day === day
              );
              return (
                <tr key={index}>
                  <td className="py-2 px-5 md:px-20 text-xs md:text-sm font-bold text-primary">
                    {day}
                  </td>
                  {schedule ? (
                    <td className="py-2 px-5 md:px-20 text-xs text-gray-500">
                      {formatTime(schedule?.start_time)}-
                      {formatTime(schedule?.end_time)}
                    </td>
                  ) : (
                    <td className="py-2 px-5 md:px-20 text-right">
                      <span className="bg-red-200 text-red-600 font-bold px-2 py-1 rounded-md text-[10px]">
                        Closed
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

Timings.propTypes = {
  doctor: PropTypes.object.isRequired,
};

export default Timings;
