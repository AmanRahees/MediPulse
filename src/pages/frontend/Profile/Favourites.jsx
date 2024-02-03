/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faMoneyBill1Wave,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Bookmark } from "lucide-react";
import Board from "@/components/frontend/Board/Board";

function Favourites() {
  return (
    <Board>
      <div>
        <h1 className="my-1 text-2xl">Favourites</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {[1, 2, 3, 4, 5, 6].map((doctor, index) => (
            <div
              key={index}
              className="relative border bg-slate-50 rounded-lg overflow-hidden"
            >
              <div className="h-[200px] md:h-[150px] overflow-hidden">
                <img
                  src="https://raw.githubusercontent.com/devmuhib/Youtube-2023/MERN-Medicare-Booking-Website/frontend/src/assets/images/doctor-img02.png"
                  alt=""
                  className="w-full aspect-square hover:scale-110 transition-all duration-300"
                />
              </div>
              <div className="p-3">
                <h1 className="text-primary">Dr. Aman Rahees</h1>
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
                <div className="flex items-center gap-1">
                  <Link className="block text-center w-full text-sm bg-secondary text-white py-2 rounded-md my-1">
                    Book Now
                  </Link>
                  <button className="border border-secondary p-2 rounded-md">
                    <Bookmark
                      className="fill-secondary text-secondary active:fill-white"
                      size={18}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Board>
  );
}

export default Favourites;
