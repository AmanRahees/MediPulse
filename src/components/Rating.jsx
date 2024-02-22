import PropTypes from "prop-types";
import { RatingStar } from "@/components/Icons";

function Rating({ value }) {
  let background = () => {
    if (value >= 3.5) {
      return "bg-green-500";
    } else if (value <= 3.4 && value >= 2.8) {
      return "bg-yellow-400";
    } else if (value <= 2.7 && value >= 1.5) {
      return "bg-orange-500";
    } else {
      return "bg-[#fa0000]";
    }
  };
  return (
    <div
      className={`${background()} w-max px-2 py-1 rounded-md text-white text-xs my-2`}
    >
      <RatingStar /> {value}
    </div>
  );
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Rating;
