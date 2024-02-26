import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "@/services/useAxios";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/widgets/ui/tooltip";
import {
  getShortWeekDay,
  formatDate,
  formatDateWithoutYear,
} from "@/func/days";
import { formatTime } from "@/func/time";
import { pyDateFormatter } from "@/func/formatter";
import Layout from "@/components/frontend/Layout/Layout";
import Rating from "@/components/Rating";
import { DocSpeciality, Location, DocFee } from "@/components/Icons";
import Loader from "@/components/frontend/Loader/Loader";

function Booking() {
  const api = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});
  const [slots, setSlots] = useState([]);
  const [selectedDateId, setSelectedDateId] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + 1);
      const dateObj = pyDateFormatter(newDate);
      try {
        const doctor_data = await api.get(`doctors/${id}`);
        setDoctor(doctor_data.data);
        const slot_data = await api.get(`doctors/${id}/slots/${dateObj}`);
        setSlots(slot_data.data.results);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [id]);
  const handleDateSelection = (idx) => {
    setSelectedSlot({});
    setLoading(true);
    setSelectedDateId(idx);
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + idx);
    const dateObj = pyDateFormatter(newDate);
    api
      .get(`doctors/${id}/slots/${dateObj}`)
      .then((res) => {
        setSlots(res.data.results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const goToPayment = () => {
    navigate("payment");
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Layout>
      <div className="p-3 lg:py-20 lg:px-32">
        <div className="border p-3">
          <div className="flex gap-5 w-full mb-2">
            <img
              src={
                doctor?.picture ??
                "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-02.jpg"
              }
              alt=""
              className="w-[130px] md:w-[200px]"
            />
            <div className="">
              <p className="font-bold text-base md:text-lg">
                Dr. {doctor?.name}
              </p>
              <p className="text-secondary my-1 text-sm md:text-base">
                <DocSpeciality /> {"  "}
                {doctor?.speciality?.speciality_name}
              </p>
              <Rating value={doctor?.ratings} />
              <p className="text-[#6B7280] my-2 text-sm md:text-base">
                <span className="text-gray-700">
                  <DocFee />
                </span>{" "}
                &#8377;{doctor?.consultation_fee ?? "300"}
              </p>
              <p className="text-[#6B7280] my-2 text-sm md:text-base">
                <span className="text-gray-700">
                  <Location />
                </span>{" "}
                {doctor?.location ?? "-"}
              </p>
            </div>
          </div>
          <hr className="my-5" />
          <div className="grid grid-cols-7 md:grid-cols-7 gap-1 md:gap-5">
            {[1, 2, 3, 4, 5, 6, 7].map((index) => {
              const currentDate = new Date();
              currentDate.setDate(currentDate.getDate() + index);
              return (
                <button
                  onClick={() => handleDateSelection(index)}
                  className={`py-1 md:p-2 border rounded-md ${
                    selectedDateId === index ? "bg-primary *:text-white" : ""
                  }`}
                  key={index}
                >
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
          {slots.length > 1 ? (
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 my-5">
              {slots.map((slot, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className={`text-sm font-bold text-gray-600 p-2 rounded-md ${
                          slot === selectedSlot
                            ? "bg-secondary text-white"
                            : slot?.is_booked
                            ? "bg-gray-100 text-neutral-400 cursor-not-allowed"
                            : "bg-sky-50"
                        }`}
                        key={index}
                        disabled={slot?.status ? true : false}
                        onClick={() => {
                          if (!slot?.is_booked) {
                            setSelectedSlot(slot);
                          }
                        }}
                      >
                        {slot?.start_time ? formatTime(slot?.start_time) : "-"}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {slot?.start_time ? formatTime(slot?.start_time) : "-"}
                      </p>
                      <small className="text-center">
                        <b
                          className={`mr-1 inline-block w-[8px] h-[8px] rounded-xl ${
                            slot?.is_booked ? "bg-red-600" : "bg-green-600"
                          }`}
                        ></b>
                        {slot?.is_booked ? "Booked" : "Available"}
                      </small>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          ) : (
            <div className="pb-10">
              <p className="">Doctor is not Availabel on this Day.</p>
            </div>
          )}
        </div>
        <button
          disabled={Object.keys(selectedSlot).length === 0}
          onClick={goToPayment}
          className="font-bold text-xs disabled:bg-gray-300 disabled:cursor-not-allowed md:text-base bg-ternary text-white float-end py-2 px-4 rounded-md my-5"
        >
          Proceed to Pay &rarr;
        </button>
      </div>
    </Layout>
  );
}

export default Booking;
