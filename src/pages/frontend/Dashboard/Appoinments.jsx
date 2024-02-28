/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "@/services/useAxios";
import { apiUrl } from "@/services/constants";
import { Check, X } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/widgets/ui/table";
import Board from "@/components/frontend/Board/Board";
import Loader from "@/components/frontend/Loader/Loader";
import { LoadSpinner } from "@/components/Icons";
import { formatDate } from "@/func/days";
import { formatTime } from "@/func/time";

function Appoinments() {
  const api = useAxios();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  useEffect(() => {
    api
      .get("doctors/appointments")
      .then((res) => {
        setAppointments(res.data?.results);
        if (res.data?.next) {
          setIsNext(true);
          setPage(page + 1);
        }
        setLoading(false);
      })
      .catch(() => {});
    // eslint-disable-next-line
  }, []);
  const handleLoadMore = () => {
    if (isNext) {
      setLoadMore(true);
      api
        .get(`doctors/appointments?page=${page}`)
        .then((res) => {
          setAppointments([...appointments, ...res.data.results]);
          if (res.data.next) {
            setIsNext(true);
            setPage(page + 1);
          } else {
            setIsNext(false);
          }
          setLoadMore(false);
        })
        .catch(() => {});
    }
  };
  const handleAppointmentStatus = (id, value) => {
    const updatedData = appointments.map((item) =>
      item.id === id ? { ...item, status: value } : item
    );
    const data = updatedData.find((item) => item.id === id);
    api
      .post(`doctors/appointments/${id}`, data)
      .then(() => {
        setAppointments(updatedData);
        console.log(updatedData);
      })
      .catch(() => {});
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Board>
      <div className="p-1">
        <p className="font-bold text-xl mb-2 text-zinc-800">Appointments</p>
        <Table className="border-b text-nowrap w-max lg:w-full my-2">
          <TableHeader>
            <TableRow className="bg-zinc-100 hover:bg-zinc-100">
              <TableHead className="font-bold text-zinc-600">Patient</TableHead>
              <TableHead className="font-bold text-zinc-600">
                Appt Date
              </TableHead>
              <TableHead className="font-bold text-zinc-600">
                Booking Date
              </TableHead>
              <TableHead className="font-bold text-zinc-600">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((apt_, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        apt_?.patient?.picture
                          ? apiUrl + apt_?.patient?.picture
                          : "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-02.jpg"
                      }
                      alt=""
                      className="w-[40px] rounded-full"
                    />
                    <Link className="">
                      <span className="block max-w-[120px] text-ellipsis overflow-hidden text-gray-900 font-bold hover:text-ternary transition-all duration-300 cursor-pointer">
                        {apt_?.patient?.first_name ?? "Unknown"}{" "}
                        {apt_?.patient?.last_name ?? ""}
                      </span>
                      <small className="block text-secondary">
                        #PT100{apt_?.patient?.id}
                      </small>
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-[12px]">
                    {formatDate(apt_?.appointment_slot?.date)}
                  </p>
                  <small className="font-bold text-teal-500">
                    {formatTime(apt_?.appointment_slot?.start_time)}
                  </small>
                </TableCell>
                <TableCell>
                  <span className="text-xs">
                    {formatDate(apt_?.booked_time)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {apt_?.status === "pending" ? (
                      <>
                        <button
                          onClick={() =>
                            handleAppointmentStatus(apt_?.id, "completed")
                          }
                          className="bg-green-100 text-green-700 py-1 px-2 text-xs rounded-3xl"
                        >
                          <Check size={12} className="inline-block mr-1" />
                          Complete
                        </button>
                        <button
                          onClick={() =>
                            handleAppointmentStatus(apt_?.id, "cancelled")
                          }
                          className="bg-red-100 text-red-700 py-1 px-2 text-xs rounded-3xl"
                        >
                          <X size={12} className="inline-block mr-1" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className={`${
                          apt_?.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        } py-1 px-2 text-xs rounded-3xl`}
                      >
                        {apt_?.status === "completed" ? (
                          <Check size={12} className="inline-block mr-1" />
                        ) : (
                          <X size={12} className="inline-block mr-1" />
                        )}
                        {apt_?.status}
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isNext && (
          <div className="flex justify-center gap-1 my-1">
            <button
              disabled={loadMore}
              onClick={handleLoadMore}
              className="text-secondary bg-sky-50 text-xs md:text-sm w-[120px] text-center py-2 rounded-2xl"
            >
              {loadMore ? <LoadSpinner /> : <span>Load More</span>}
            </button>
          </div>
        )}
      </div>
    </Board>
  );
}

export default Appoinments;
