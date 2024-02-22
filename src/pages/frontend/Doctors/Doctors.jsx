import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "@/services/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faLocationDot,
  faMoneyBill1Wave,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "@/components/frontend/Layout/Layout";
import FilterBox from "@/components/frontend/FilterBox/FilterBox";
import Rating from "@/components/Rating";
import Loader from "@/components/frontend/Loader/Loader";
import { specialities } from "@/data/specialities";
import NoDoctorsFound from "@/assets/images/no_doctors_found.jpg";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance.get("doctors").then((res) => {
      setDoctors(res.data.results);
      if (res.data.next) {
        setIsNext(true);
        setPage(page + 1);
      }
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Loader />;
  }
  const handleLoadMore = () => {
    if (isNext) {
      setLoadMore(true);
      axiosInstance
        .get(`doctors?page=${page}`)
        .then((res) => {
          setDoctors([...doctors, ...res.data.results]);
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
  return (
    <Layout>
      <div className="p-3 md:p-10">
        <div className="block lg:flex lg:gap-5 lg:items-start">
          <FilterBox specialities={specialities} />
          {doctors.length > 0 ? (
            <div className="px-5 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {doctors.map((doctor, index) => (
                  <div
                    key={index}
                    className="relative border bg-slate-50 rounded-lg overflow-hidden"
                  >
                    <div className="h-[250px] overflow-hidden">
                      <img
                        src={
                          doctor?.picture
                            ? doctor?.picture
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSetBue5OCx1GAXLJXROCBEe86h6HcBg29jsg&usqp=CAU"
                        }
                        alt=""
                        className="w-full aspect-square"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-primary font-bold">
                        Dr. {doctor.name}
                      </p>
                      <p className="text-secondary text-sm m-1">
                        <FontAwesomeIcon icon={faStethoscope} />{" "}
                        {doctor?.speciality?.speciality_name}
                      </p>
                      <p className="text-[#6B7280] text-sm m-1">
                        <FontAwesomeIcon
                          icon={faMoneyBill1Wave}
                          className="text-gray-700"
                        />{" "}
                        &#8377;{doctor?.consultation_fee}
                      </p>
                      <p className="text-[#6B7280] text-sm m-1">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="text-gray-700"
                        />{" "}
                        {doctor?.location}
                      </p>
                      <div className="absolute top-0 left-1 m-1 w-max">
                        <Rating value={doctor?.ratings} />
                      </div>
                      <Link
                        to={`/doctors/${
                          doctor?.id
                        }/${doctor?.name.toLowerCase()}`}
                        className="block text-center w-full text-sm bg-secondary text-white py-2 rounded-md my-1"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              {isNext && (
                <div className="flex justify-center items-center my-5">
                  <button
                    disabled={loadMore}
                    onClick={handleLoadMore}
                    className="text-secondary bg-sky-50 text-xs md:text-sm w-[120px] text-center py-2 rounded-2xl"
                  >
                    {loadMore ? (
                      <FontAwesomeIcon
                        className="animate-spin"
                        icon={faSpinner}
                      />
                    ) : (
                      <span>Load More</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-[400px] flex flex-col justify-center items-center gap-3">
              <img
                src={NoDoctorsFound}
                alt=""
                className="w-[200px] pointer-events-none"
              />
              <p className="font-bold text-xl text-secondary">
                No Doctors Found!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Doctors;
