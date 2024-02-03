/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faLocationDot,
  faMoneyBill1Wave,
  faStar,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "@/components/frontend/Layout/Layout";
import FilterBox from "@/components/frontend/FilterBox/FilterBox";
import { specialities, doctors } from "@/data/specialities";

function Doctors() {
  const [isMore, setIsMore] = useState(false);
  const handleLoadMore = () => {
    setIsMore(!isMore);
  };
  return (
    <Layout>
      <div className="p-3 md:p-10">
        <div className="block lg:flex lg:gap-5 lg:items-start">
          <FilterBox specialities={specialities} />
          <div className="px-5 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="relative border bg-slate-50 rounded-lg overflow-hidden"
                >
                  <div className="h-[250px] overflow-hidden">
                    <img
                      src={doctor.picture}
                      alt=""
                      className="w-full aspect-square"
                    />
                  </div>
                  <div className="p-3">
                    <h1 className="text-primary">Dr. {doctor.doctor_name}</h1>
                    <p className="text-secondary text-sm m-1">
                      <FontAwesomeIcon icon={faStethoscope} /> Dentist
                    </p>
                    <p className="text-[#6B7280] text-sm m-1">
                      <FontAwesomeIcon
                        icon={faMoneyBill1Wave}
                        className="text-gray-700"
                      />{" "}
                      &#8377;300
                    </p>
                    <p className="text-[#6B7280] text-sm m-1">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-gray-700"
                      />{" "}
                      Mananthavady, India
                    </p>
                    <p className="bg-yellow-400 absolute top-2 left-1 text-xs m-1 w-max p-2 text-white rounded-lg">
                      <FontAwesomeIcon icon={faStar} /> 4.5
                    </p>
                    <Link className="block text-center w-full text-sm bg-secondary text-white py-2 rounded-md my-1">
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center my-5">
              <button
                disabled={isMore}
                onClick={handleLoadMore}
                className="text-secondary bg-sky-50 text-xs md:text-sm w-[120px] text-center py-2 rounded-2xl"
              >
                {isMore ? (
                  <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
                ) : (
                  <span>Load More</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Doctors;
