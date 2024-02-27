/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Layout from "@/components/frontend/Layout/Layout";
import { formatDate } from "@/func/days";
import { formatTime } from "@/func/time";

function PaymentSuccess({ doctor, slot }) {
  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-[500px]">
        <div className="flex flex-col items-center mx-3">
          <FontAwesomeIcon
            icon={faCircleCheck}
            size="4x"
            className="text-green-500 successCheck rounded-full"
          />
          <p className="font-bold text-lg md:text-2xl text-gray-800 mt-5 mb-2">
            Appointment booked Successfully!
          </p>
          <span className="text-center text-sm md:w-80">
            Appointment booked with <b>Dr. {doctor?.name}</b> on{" "}
            <b>
              {formatDate(slot?.date)} - {formatTime(slot?.start_time)}
            </b>
          </span>
          <Link
            to="/"
            className="bg-green-500 text-white my-4 py-2 px-4 text-sm rounded-md"
          >
            Go to Home &rarr;
          </Link>
        </div>
      </div>
    </Layout>
  );
}

PaymentSuccess.propTypes = {
  doctor: PropTypes.object.isRequired,
  slot: PropTypes.object.isRequired,
};

export default PaymentSuccess;
