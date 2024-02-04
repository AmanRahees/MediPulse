import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCake,
  faLocationDot,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

Aside.propTypes = {
  items: PropTypes.array,
};

function Aside({ items }) {
  const location = useLocation();
  return (
    <aside className="pfl_n1 border">
      <div className="flex flex-col justify-center items-center gap-1 p-5">
        <img
          src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
          alt=""
          className="w-[80px] border rounded-full"
        />
        <div className="text-center">
          <p className="font-bold text-gray-700">Aman Rahees</p>
          <small className="flex justify-center items-center gap-1 text-gray-600">
            <FontAwesomeIcon icon={faCake} className="mb-1" /> 04 June 2004, 19
            years
          </small>
          <small className="flex justify-center items-center gap-1 text-gray-600">
            <FontAwesomeIcon icon={faLocationDot} className="mb-1" />{" "}
            Mananthavady, Kerala
          </small>
        </div>
      </div>
      <hr />
      <div className="">
        {items.map((item, index) => (
          <Link
            className={`flex items-center gap-2 text-sm border-b py-3 px-4 hover:text-secondary font-bold ${
              location.pathname === item.path
                ? "text-secondary"
                : "text-zinc-600"
            }`}
            to={item.path}
            key={index}
          >
            {item?.icon} {item?.title}
          </Link>
        ))}
      </div>
      <button className="flex items-center gap-2 text-sm border-b py-3 px-4 font-bold text-zinc-600 hover:text-red-600 w-full">
        <FontAwesomeIcon icon={faPowerOff} className="text-base" /> Logout
      </button>
    </aside>
  );
}

export default Aside;