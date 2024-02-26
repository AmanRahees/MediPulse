/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxios from "@/services/useAxios";
import { STRIPE_PUBLISHABLE_KEY } from "@/services/constants";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import Layout from "@/components/frontend/Layout/Layout";
import Rating from "@/components/Rating";
import { DocSpeciality, Location } from "@/components/Icons";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function Payment({ slot }) {
  const api = useAxios();
  return (
    <Elements stripe={stripePromise}>
      <Layout>
        <div className="p-3 lg:py-10 lg:px-32">
          <div className="flex flex-wrap flex-col-reverse lg:flex-row justify-between items-start gap-5">
            <div className="w-full lg:w-3/5 border">
              <h1 className="text-lg md:text-xl text-gray-800 p-4 md:p-5">
                Payment Details
              </h1>
              <hr />
              <form className="p-4 md:p-8">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative mb-4">
                    <Label className="block mb-2">Cardholder Name</Label>
                    <Input type="email" />
                  </div>
                  <div className="relative mb-4">
                    <Label className="block mb-2">Email</Label>
                    <Input type="email" />
                  </div>
                </div>
                <div className="relative">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="">
                      <Label className="block mb-2">Credit or Debit Card</Label>
                      <CardElement
                        id="card-element"
                        // onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-primary text-white w-[200px] py-2 rounded-[8px]"
                  >
                    Pay
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full lg:w-2/6 border">
              <h1 className="text-lg md:text-xl text-gray-800 p-4 md:p-5">
                Booking Summary
              </h1>
              <hr />
              <div className="p-5 md:p-5">
                <div className="flex items-start gap-3 mb-5">
                  <img
                    src="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-02.jpg"
                    alt=""
                    className="w-20"
                  />
                  <div className="">
                    <p className="font-bold text-base md:text-lg text-ellipsis overflow-hidden line-clamp-1">
                      Dr. Morales aman
                    </p>
                    <small className="flex items-center gap-1 text-secondary">
                      <DocSpeciality />
                      Dentist
                    </small>
                    <Rating value={4} />
                    <small className="flex items-center gap-1">
                      <span className="text-gray-700">
                        <Location />
                      </span>
                      Mananthavady, Kerala
                    </small>
                  </div>
                </div>
                <p className="flex gap-2 text-sm mb-5">
                  <span className="text-gray-600">
                    <b className="text-xs text-black">Date :</b>16 Nov 2023
                  </span>
                  <span className="text-gray-600">
                    <b className="text-xs text-black">Time :</b>10:00 AM{" "}
                  </span>
                </p>
                <hr />
                <div className="mt-8">
                  <p className="flex justify-between text-sm my-3">
                    <span className="font-bold">Consulting Fee</span>
                    <span className="">&#8377;500</span>
                  </p>
                  <p className="flex justify-between text-sm my-3">
                    <span className="font-bold">Booking Fee</span>
                    <span className="">&#8377;100</span>
                  </p>
                  <hr />
                  <div className="flex justify-between mt-5">
                    <h1 className="font-bold text-lg text-gray-800">Total</h1>
                    <p className="font-bold text-secondary">&#8377;600</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Elements>
  );
}

Payment.propTypes = {
  slot: PropTypes.object,
};

export default Payment;
