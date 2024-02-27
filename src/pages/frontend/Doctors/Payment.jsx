/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "@/services/constants";
import Layout from "@/components/frontend/Layout/Layout";
import PaymentForm from "@/components/frontend/PaymentForm/PaymentForm";
import PaymentSuccess from "@/components/frontend/PaymentForm/PaymentSuccess";
import Rating from "@/components/Rating";
import { DocSpeciality, Location } from "@/components/Icons";
import { formatDate } from "@/func/days";
import { formatTime } from "@/func/time";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function Payment() {
  const navigate = useNavigate();
  const { id, name } = useParams();
  const { selectedDoctor, selectedSlot } = useSelector((state) => state.slot);
  const { userInfo } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (!selectedSlot || Object.keys(selectedSlot).length === 0) {
      navigate(`/doctors/${id}/${name}/booking`);
    }
  }, [navigate, selectedSlot, name, id]);
  if (isSuccess) {
    return <PaymentSuccess doctor={selectedDoctor} slot={selectedSlot} />;
  }
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
              <PaymentForm
                doctor={selectedDoctor}
                slot={selectedSlot}
                patient={userInfo}
                setIsSuccess={setIsSuccess}
              />
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
                      Dr. {selectedDoctor?.name}
                    </p>
                    <small className="flex items-center gap-1 text-secondary">
                      <DocSpeciality />
                      {selectedDoctor?.speciality?.speciality_name}
                    </small>
                    <Rating value={selectedDoctor?.ratings ?? 5} />
                    <small className="flex items-center gap-1">
                      <span className="text-gray-700">
                        <Location />
                      </span>
                      {selectedDoctor?.location}
                    </small>
                  </div>
                </div>
                <p className="flex gap-2 text-sm mb-5">
                  <span className="text-gray-600">
                    <b className="text-xs text-black">Date : </b>
                    {formatDate(selectedSlot?.date)}
                  </span>
                  <span className="text-gray-600">
                    <b className="text-xs text-black">Time : </b>
                    {formatTime(selectedSlot?.start_time)}{" "}
                  </span>
                </p>
                <hr />
                <div className="mt-8">
                  <p className="flex justify-between text-sm my-3">
                    <span className="font-bold">Consulting Fee</span>
                    <span className="">
                      &#8377;{selectedDoctor?.consultation_fee}
                    </span>
                  </p>
                  <p className="flex justify-between text-sm my-3">
                    <span className="font-bold">Booking Fee</span>
                    <span className="">&#8377;100</span>
                  </p>
                  <hr />
                  <div className="flex justify-between mt-5">
                    <h1 className="font-bold text-lg text-gray-800">Total</h1>
                    <p className="font-bold text-secondary">
                      &#8377;{selectedDoctor?.consultation_fee + 100}
                    </p>
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

export default Payment;
