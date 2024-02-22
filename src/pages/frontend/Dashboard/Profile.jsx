import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthContext from "@/contexts/AuthContext";
import { apiUrl } from "@/services/constants";
import Board from "@/components/frontend/Board/Board";
import AlertInfo from "@/widgets/common/AlertInfo";
import { Skeleton } from "@/widgets/ui/skeleton";
import {
  RatingStar,
  DocSpeciality,
  Location,
  DocFee,
  Mail,
  Phone,
  Clinic,
  ClinicAddress,
  School,
  Hospital,
  Award,
  ApprovedIcon,
} from "@/components/Icons";
import { formatDate } from "@/func/days";
import { getYear } from "date-fns";

function Profile() {
  const { userData } = useContext(AuthContext);
  const { userInfo, loading } = useSelector((state) => state.user);
  return (
    <Board>
      <div className="">
        {!userInfo?.is_approved && (
          <AlertInfo
            type="warningInfo"
            message="To get Approval please complete your profile. We'll review manually and approve within 3 days."
            classValues="text-yellow-600 bg-yellow-50 border-yellow-100 mb-5"
          />
        )}
        <p className="font-bold text-xl mb-2 text-sky-800">
          Basic Information{" "}
          <Link
            to="/doctor/dashboard/profile/edit"
            className="text-ternary text-sm"
          >
            Edit
          </Link>
        </p>
        <hr />
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 my-4">
          {!loading ? (
            <img
              src={
                userInfo?.picture
                  ? `${apiUrl + userInfo.picture}`
                  : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
              }
              alt="picture"
              className="w-[200px] lg:w-[300px] aspect-square rounded-md"
            />
          ) : (
            <Skeleton className="w-[200px] lg:w-[300px] aspect-square rounded-md bg-zinc-200" />
          )}
          <div className="block w-full">
            {!loading ? (
              <p className="flex items-center gap-1 my-1 text-xl font-bold">
                Dr. {userInfo?.name} <ApprovedIcon />
              </p>
            ) : (
              <Skeleton className="w-[250px] h-8 bg-zinc-200 my-1" />
            )}
            {!loading ? (
              <p className="text-secondary my-1">
                <DocSpeciality /> {userInfo?.speciality?.speciality_name}
              </p>
            ) : (
              <Skeleton className="w-[200px] h-4 bg-zinc-200 my-1" />
            )}
            {!loading ? (
              <p className="bg-yellow-400 w-max px-2 py-1 rounded-md text-white text-xs my-2">
                <RatingStar /> 5
              </p>
            ) : (
              <Skeleton className="w-[200px] h-4 bg-zinc-200 my-1" />
            )}
            {!loading ? (
              <p className="text-gray-700 my-1">
                <Mail /> {userData?.email}
              </p>
            ) : (
              <Skeleton className="w-[200px] h-4 bg-zinc-200 my-1" />
            )}
            {!loading ? (
              <p className="text-gray-700 my-1">
                <Phone /> {userInfo?.phone ?? "Not Set"}
              </p>
            ) : (
              <Skeleton className="w-[200px] h-4 bg-zinc-200 my-1" />
            )}
            {!loading ? (
              <p className="text-gray-700 my-1">
                <DocFee /> &#8377;{userInfo?.consultation_fee}
              </p>
            ) : (
              <Skeleton className="w-[200px] h-4 bg-zinc-200 my-1" />
            )}
            {!loading ? (
              <p className="text-gray-700 my-1">
                <Location /> {userInfo?.location ?? "Not Set"}
              </p>
            ) : (
              <Skeleton className="w-[200px] h-4 bg-zinc-200 my-1" />
            )}
            {!loading ? (
              <div className="flex flex-wrap gap-2">
                {userInfo?.service &&
                  userInfo?.services.map((service, idx) => (
                    <small
                      className="block py-1 px-3 border rounded-md"
                      key={idx}
                    >
                      Dental Cleaning
                    </small>
                  ))}
              </div>
            ) : (
              <Skeleton className="w-[300px] h-8 bg-zinc-200 my-1" />
            )}
          </div>
        </div>
        {!loading ? (
          <p className="indent-5 text-sm">{userInfo?.about}</p>
        ) : (
          <Skeleton className="w-full h-28 bg-zinc-200 my-1" />
        )}
        <p className="font-bold text-xl mb-2 text-sky-800 my-4">
          Clinic Information
        </p>
        <hr className="my-4" />
        {!loading ? (
          <p className="text-secondary my-1 text-xl font-bold capitalize">
            <Clinic /> {userInfo?.clinic_name}
          </p>
        ) : (
          <Skeleton className="w-[300px] h-8 bg-zinc-200 my-1" />
        )}
        {!loading ? (
          <p className="text-gray-700 my-1 capitalize">
            <ClinicAddress /> {userInfo?.clinic_address}
          </p>
        ) : (
          <Skeleton className="w-[200px] h-4 bg-zinc-200 my-1" />
        )}
        {!loading ? (
          <div className="flex flex-wrap gap-2 my-2">
            {userInfo?.clinic_images &&
              userInfo?.clinic_images.map((img, index) => (
                <img
                  key={index}
                  src={apiUrl + img?.clinic_image}
                  alt=""
                  className="w-[60px]"
                />
              ))}
          </div>
        ) : (
          <Skeleton className="w-[400px] h-20 bg-zinc-200 my-1" />
        )}
        <p className="font-bold text-xl mb-2 text-sky-800 my-4">Education</p>
        <hr className="my-4" />
        {userInfo?.education &&
          userInfo?.education.map((edu, index) => (
            <div className="w-full md:px-5 my-5" key={index}>
              <p className="flex justify-between gap-3">
                <span className="font-bold text-lg text-zinc-700">
                  {edu?.degree}
                </span>
                <small className="block text-nowrap">
                  {getYear(edu?.date_from)}-{getYear(edu?.date_to)}
                </small>
              </p>
              <p className="text-gray-700 capitalize">
                <School /> {edu?.institute}
              </p>
            </div>
          ))}
        <p className="font-bold text-xl mb-2 text-sky-800 my-4">Experience</p>
        <hr className="my-4" />
        {userInfo?.experience &&
          userInfo?.experience.map((exp, index) => (
            <div className="w-full md:px-5 my-5" key={index}>
              <p className="flex justify-between gap-3">
                <span className="font-bold text-lg text-zinc-700 capitalize">
                  {exp?.position}
                </span>
                <small className="block text-nowrap">
                  {getYear(exp?.date_from)}-
                  {exp?.present ? "Present" : exp?.date_to}
                </small>
              </p>
              <p className="text-gray-700 capitalize">
                <Hospital /> {exp?.hospital_name}
              </p>
            </div>
          ))}
        <p className="font-bold text-xl mb-2 text-sky-800 my-4">Awards</p>
        <hr className="my-4" />
        {userInfo?.awards &&
          userInfo?.awards.map((award, index) => (
            <div className="w-full md:px-5 my-5" key={index}>
              <p className="text-zinc-700">
                <Award />{" "}
                <span className="text-lg font-bold">{award?.award_name}</span>
              </p>
              <small className="block text-nowrap">
                {formatDate(award?.award_year)}
              </small>
            </div>
          ))}
      </div>
    </Board>
  );
}

export default Profile;
