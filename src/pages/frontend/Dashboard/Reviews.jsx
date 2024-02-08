/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { calculateDaysAgo } from "@/func/days";
import Board from "@/components/frontend/Board/Board";
import { reviews } from "@/data/reviews";

function Reviews() {
  return (
    <Board>
      <div className="">
        <p className="font-bold text-xl mb-2 text-zinc-800">Reviews</p>
        <div className="my-5">
          <div className="flex flex-col gap-2">
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
        </div>
      </div>
    </Board>
  );
}

export default Reviews;
