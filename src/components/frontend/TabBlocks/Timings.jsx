import PropTypes from "prop-types";
import { timings } from "@/data/timings";

function Timings() {
  return (
    <>
      <div className="p-5">
        <table className="w-full md:w-max mx-auto text-left border">
          <thead className="border-b">
            <tr>
              <th className="py-2 px-5 md:px-20 bg-blue-50">Days</th>
              <th className="py-2 px-5 md:px-20 bg-blue-50">Time</th>
            </tr>
          </thead>
          <tbody>
            {timings.map((timing, index) => (
              <tr key={index}>
                <td className="py-2 px-5 md:px-20 text-xs md:text-base">
                  {timing.day}
                </td>
                {!timing.closed ? (
                  <td className="py-2 px-5 md:px-20 text-xs md:text-sm">
                    {timing.time}
                  </td>
                ) : (
                  <td className="py-2 px-5 md:px-20 text-right">
                    <span className="bg-red-200 text-red-600 font-bold px-2 py-1 rounded-md text-xs">
                      Closed
                    </span>
                  </td>
                )}
              </tr>
            ))}
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
