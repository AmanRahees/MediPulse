/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMoneyBill1Wave,
  faStar,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/widgets/ui/tabs";
import { calculateDaysAgo } from "@/func/days";
import Layout from "@/components/frontend/Layout/Layout";
import "./doctors.css";
import { reviews } from "@/data/reviews";
import { timings } from "@/data/timings";

function DoctorView() {
  return (
    <Layout>
      <div className="p-3 lg:py-20 lg:px-32">
        <div className="md:flex md:justify-between border p-3 rounded-md">
          <div className="md:flex items-start gap-5">
            <img
              src="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-02.jpg"
              alt=""
              className="w-full md:w-[200px] aspect-square rounded-md border"
            />
            <div className="my-5">
              <p className="font-bold text-2xl md:text-lg">Dr. Aman Rahees</p>
              <p className="text-secondary my-1">
                <FontAwesomeIcon icon={faStethoscope} /> Dentist
              </p>
              <small className="bg-yellow-400 text-white my-1 px-3 py-1 w-max rounded-md">
                <FontAwesomeIcon icon={faStar} /> 4.1
              </small>
              <div className="flex gap-2 my-5">
                <img
                  src="https://doccure.dreamstechnologies.com/html/template/assets/img/features/feature-01.jpg"
                  alt=""
                  className="w-[50px] rounded-md"
                />
                <img
                  src="https://doccure.dreamstechnologies.com/html/template/assets/img/features/feature-01.jpg"
                  alt=""
                  className="w-[50px] rounded-md"
                />
                <img
                  src="https://doccure.dreamstechnologies.com/html/template/assets/img/features/feature-01.jpg"
                  alt=""
                  className="w-[50px] rounded-md"
                />
                <img
                  src="https://doccure.dreamstechnologies.com/html/template/assets/img/features/feature-01.jpg"
                  alt=""
                  className="w-[50px] rounded-md"
                />
              </div>
              <div className="flex gap-2">
                <small className="block py-1 px-3 border rounded-md">
                  Dental Cleaning
                </small>
                <small className="block py-1 px-3 border rounded-md">
                  Dental Cleaning
                </small>
              </div>
            </div>
          </div>
          <div className="my-auto">
            <p className="text-[#6B7280] my-2">
              <FontAwesomeIcon icon={faComment} className="text-gray-700" /> 35
              Feedback
            </p>
            <p className="text-[#6B7280] my-2">
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                className="text-gray-700"
              />{" "}
              &#8377;500
            </p>
            <p className="text-[#6B7280] my-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-gray-700" />{" "}
              Mananthavady, Kerala
            </p>
            <button className="bg-secondary w-full md:w-[200px] text-white py-2 rounded-md mt-2">
              Book Appoinment
            </button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full my-20">
          <TabsList className="w-full grid grid-cols-3 bg-transparent">
            <TabsTrigger
              value="overview"
              className="border-b-2 data-[state=active]:border-secondary data-[state=active]:text-secondary font-bold text-base py-2"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="border-b-2 data-[state=active]:border-secondary data-[state=active]:text-secondary font-bold text-base py-2"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="timings"
              className="border-b-2 data-[state=active]:border-secondary data-[state=active]:text-secondary font-bold text-base py-2"
            >
              Timings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="p-5">
              <h1 className="text-xl md:text-3xl">About Me</h1>
              <p className="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti officia corporis officiis amet provident, quas suscipit
                ipsa quae, hic inventore dolorem quia dolor. Odit ullam aperiam,
                amet quia fugiat tenetur.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="flex justify-end">
              <button className="py-1 px-3 bg-secondary text-white rounded-md mt-3">
                Write a Review
              </button>
            </div>
            <div className="review_wrap p-5">
              {reviews.length > 0 ? (
                reviews.map((item, index) => (
                  <div key={index} className="_reviewItem">
                    <div className="flex items-start gap-3">
                      <img
                        src={item.patient.picture}
                        alt=""
                        className="w-[40px] rounded-full border"
                      />
                      <div className="">
                        <p className="font-bold">{item.patient.name}</p>
                        <small className="block">
                          {calculateDaysAgo(item.date)}
                        </small>
                        <small className="block bg-yellow-400 text-white w-max py-[1px] px-2 rounded-md mt-1">
                          <FontAwesomeIcon icon={faStar} /> {item.rating}
                        </small>
                        <p className="my-1 text-sm md:text-base">
                          {item.comments}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="">No Reviews</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="timings">
            <div className="p-5">
              <table className="w-full md:w-max mx-auto text-left border">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-5 md:px-20 bg-blue-50">Days</th>
                    <th className="py-2 px-5 md:px-20 bg-blue-50">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {timings.map((timing, index) => (
                    <tr key={index}>
                      <td className="py-2 px-5 md:px-20 text-xs md:text-base">
                        {timing.day}
                      </td>
                      {!timing.closed ? (
                        <td className="py-2 px-5 md:px-20 text-xs md:text-sm">
                          {timing.time}
                        </td>
                      ) : (
                        <td className="py-2 px-5 md:px-20 text-right">
                          <span className="bg-red-200 text-red-600 font-bold px-2 py-1 rounded-md text-xs">
                            Closed
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

export default DoctorView;
