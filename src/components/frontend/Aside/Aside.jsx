import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCake,
  faLocationDot,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { Stethoscope } from "lucide-react";
import { apiUrl } from "@/services/constants";
import { Skeleton } from "@/widgets/ui/skeleton";
import { ApprovedIcon } from "@/components/Icons";
import { stringDOB, getAge } from "@/func/DOB";

function Aside({ items, userInfo, loading, role }) {
  const location = useLocation();
  return (
    <aside className="pfl_n1 border">
      {!loading ? (
        <div className="flex flex-col justify-center items-center gap-1 p-5">
          <img
            src={
              userInfo?.picture
                ? `${apiUrl + userInfo.picture}`
                : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
            }
            alt="picture"
            className="w-[80px] aspect-square border rounded-full"
          />
          {role === "doctor" ? (
            <div className="text-center">
              <p className="font-bold text-gray-800">
                Dr. {userInfo?.name}
                {userInfo?.is_approved ? <ApprovedIcon /> : ""}
              </p>
              <small className="font-bold text-secondary">
                <Stethoscope size={15} className="inline-block" />{" "}
                {userInfo?.speciality?.speciality_name
                  ? userInfo.speciality.speciality_name
                  : "-"}
              </small>
            </div>
          ) : (
            <div className="text-center">
              <p className="font-bold text-gray-700">
                {userInfo?.first_name}
                {userInfo?.last_name}
              </p>
              {userInfo?.DOB && (
                <small className="flex justify-center items-center gap-1 text-gray-600">
                  <FontAwesomeIcon icon={faCake} className="mb-1" />{" "}
                  {stringDOB(userInfo?.DOB)}, {getAge(userInfo?.DOB)}
                </small>
              )}
              {userInfo?.city && userInfo?.state && (
                <small className="flex justify-center items-center gap-1 text-gray-600">
                  <FontAwesomeIcon icon={faLocationDot} className="mb-1" />{" "}
                  {userInfo?.city}, {userInfo?.state}
                </small>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-1 p-5">
          <Skeleton className="w-[80px] h-[80px] bg-zinc-200 border rounded-full" />
          <div className="text-center">
            <Skeleton className="bg-zinc-200 h-4 w-[160px] rounded-none my-1" />
            <Skeleton className="bg-zinc-200 h-4 w-[160px] rounded-none my-1" />
            <Skeleton className="bg-zinc-200 h-4 w-[160px] rounded-none my-1" />
          </div>
        </div>
      )}
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

Aside.propTypes = {
  items: PropTypes.array,
  userInfo: PropTypes.object,
  loading: PropTypes.bool,
  role: PropTypes.string,
};

export default Aside;
