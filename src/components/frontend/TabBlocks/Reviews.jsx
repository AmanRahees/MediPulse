import PropTypes from "prop-types";
import Rating from "@/components/Rating";
import { calculateDaysAgo } from "@/func/days";
import { reviews } from "@/data/reviews";

function Reviews() {
  return (
    <>
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
                  <small className="block">{calculateDaysAgo(item.date)}</small>
                  <Rating value={item.rating} />
                  <p className="my-1 text-sm md:text-base">{item.comments}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="">No Reviews</p>
        )}
      </div>
    </>
  );
}

Reviews.propTypes = {
  doctor: PropTypes.object.isRequired,
};

export default Reviews;
