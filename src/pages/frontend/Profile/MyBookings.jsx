import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "@/services/useAxios";
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

function MyBookings() {
  const api = useAxios();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  useEffect(() => {
    api
      .get("patients/appointments")
      .then((res) => {
        setAppointments(res.data?.results);
        if (res.data.next) {
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
        .get(`patients/appointments?page=${page}`)
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
  if (loading) {
    return <Loader />;
  }
  return (
    <Board>
      <div className="p-1">
        <h1 className="text-2xl my-1">My Appointments</h1>
        <Table className="border-b text-nowrap w-max lg:w-full my-2">
          <TableHeader>
            <TableRow className="bg-zinc-100 hover:bg-zinc-100">
              <TableHead className="font-bold text-zinc-600">Doctor</TableHead>
              <TableHead className="font-bold text-zinc-600">
                Appt Date
              </TableHead>
              <TableHead className="font-bold text-zinc-600">
                Booking Date
              </TableHead>
              <TableHead className="font-bold text-zinc-600">Amount</TableHead>
              <TableHead className="font-bold text-zinc-600">Status</TableHead>
              <TableHead className="font-bold text-zinc-600">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((apt_, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <div className="flex gap-2">
                    <img
                      src={
                        apt_?.doctor?.picture
                          ? apt_?.doctor?.picture
                          : "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-02.jpg"
                      }
                      alt=""
                      className="w-[40px] rounded-full"
                    />
                    <Link
                      to={`/doctors/${
                        apt_?.doctor?.id
                      }/${apt_?.doctor?.name.toLowerCase()}`}
                    >
                      <span className="block max-w-[120px] text-ellipsis overflow-hidden">
                        {apt_?.doctor?.name ?? "Unknown"}
                      </span>
                      <small className="block text-secondary">
                        {apt_?.doctor?.speciality?.speciality_name}
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
                <TableCell>&#8377;{apt_?.amount}</TableCell>
                <TableCell>
                  <small className="bg-orange-100 text-orange-700 py-1 px-2 rounded-3xl">
                    {apt_?.status}
                  </small>
                </TableCell>
                <TableCell>
                  <button className="bg-emerald-100 text-emerald-500 px-2 py-1 rounded">
                    View &rarr;
                  </button>
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

export default MyBookings;
