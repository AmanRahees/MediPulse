/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Board from "@/components/frontend/Board/Board";

function Patients() {
  return (
    <Board>
      <div>
        <p className="font-bold text-xl mb-2 text-zinc-800">My Patients</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((patient, index) => (
            <div className="_docPCI" key={index}>
              <div className="flex flex-col items-center justify-center">
                <img
                  src="https://doccure.dreamstechnologies.com/html/template/assets/img/patients/patient2.jpg"
                  alt=""
                  className="w-[80px] h-[80px] rounded-full border"
                />
                <div className="my-1 text-center text-gray-600">
                  <p className="font-bold text-gray-900">Aman Rahees</p>
                  <small className="block">
                    <h1 className="inline">Patient ID : </h1>#P1001
                  </small>
                  <small className="block">
                    <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                    Mananthavady, Kerala
                  </small>
                </div>
              </div>
              <hr />
              <div className="my-2 mx-5 text-gray-600">
                <p className="flex justify-between items-center text-sm mb-2">
                  <b className="text-gray-900">Phone</b> +91 6235761798
                </p>
                <p className="flex justify-between items-center text-sm mb-2">
                  <b className="text-gray-900">Age</b> 28 years, Male
                </p>
                <p className="flex justify-between items-center text-sm mb-2">
                  <b className="text-gray-900">Blood Group</b> A+
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Board>
  );
}

export default Patients;
