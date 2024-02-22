/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "@/services/useAxios";
import { apiUrl } from "@/services/constants";
import Layout from "@/components/backend/Layout/Layout";
import Breadcrumb from "@/components/backend/Elements/Breadcrumb";
import AlertInfo from "@/widgets/common/AlertInfo";
import Loader from "@/components/frontend/Loader/Loader";
import Rating from "@/components/Rating";
import {
  DocFee,
  Mail,
  Phone,
  Location,
  ApprovedIcon,
  DocSpeciality,
} from "@/components/Icons";
import { getYear, totalYears } from "@/func/days";
import "./doctor.css";

function DocOverview() {
  const api = useAxios();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState({});
  const pathToPage = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      title: "Doctors",
      path: "/admin/doctors",
    },
    {
      title: doctor?.name,
      path: `/admin/doctors/overview/${id}`,
    },
  ];
  useEffect(() => {
    api
      .get(`admin/doctors/${id}`)
      .then((res) => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch(() => {});
    // eslint-disable-next-line
  }, [id]);
  const handleApprove = () => {
    api
      .post(`admin/doctors/${id}`)
      .then((res) => {
        setDoctor({ ...doctor, is_approved: true });
      })
      .catch(() => {});
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Layout>
      <h1 className="pageHeading_">Overview</h1>
      <Breadcrumb pathToPage={pathToPage} />
      {!doctor?.is_approved && (
        <AlertInfo
          type="info"
          message={
            <div>
              {doctor?.name} is waiting for your approval.
              <div className="flex gap-2 justify-end mt-1">
                <button className="bg-teal-600 text-white px-2 py-1 rounded-md text-xs">
                  message
                </button>
                <button
                  onClick={handleApprove}
                  className="bg-green-500 text-white px-2 py-1 rounded-md text-xs"
                >
                  Approve
                </button>
              </div>
            </div>
          }
          classValues="bg-white text-sky-600 border-zinc-200 my-5"
        />
      )}
      <div className="mx-2 md:mx-0 py-3">
        <div className="block md:flex items-start gap-5">
          <img
            src={
              doctor?.picture
                ? apiUrl + doctor?.picture
                : "https://doccure.dreamstechnologies.com/html/template/admin/assets/img/doctors/doctor-thumb-02.jpg"
            }
            alt="picture"
            className="w-full md:w-[250px] aspect-square"
          />
          <div className="my-4 lg:my-0">
            <p className="flex items-center gap-1 font-bold text-2xl">
              Dr. {doctor?.name} {doctor?.is_approved && <ApprovedIcon />}
            </p>
            <p className="flex items-center gap-1 my-1">
              <span className="text-primary">
                <DocSpeciality />{" "}
              </span>
              {doctor?.speciality?.speciality_name ? (
                <span className="text-primary font-bold">
                  {doctor?.speciality?.speciality_name}
                </span>
              ) : (
                <small>Not Set</small>
              )}
            </p>
            <Rating value={doctor?.ratings} />
            <p className="flex items-center gap-2 my-1">
              <span className="text-primary">
                <Mail />{" "}
              </span>
              <span className="text-accent">{doctor?.account?.email}</span>
            </p>
            <p className="flex items-center gap-2 my-1">
              <span className="text-primary">
                <Phone />{" "}
              </span>
              {doctor?.phone ? (
                <span>{doctor?.phone}</span>
              ) : (
                <small>Not Set</small>
              )}
            </p>
            <p className="flex items-center gap-2 my-1">
              <span className="text-primary">
                <DocFee />{" "}
              </span>
              {doctor?.consultation_fee ? (
                <span>&#8377;{doctor?.consultation_fee}</span>
              ) : (
                <small>Not Set</small>
              )}
            </p>
            <p className="flex items-center gap-2 my-1">
              <span className="text-primary">
                <Location />{" "}
              </span>
              {doctor?.location ? (
                <span>{doctor?.location}</span>
              ) : (
                <small>Not Set</small>
              )}
            </p>
            <p className="flex items-center gap-2 my-1">
              {doctor?.services ? (
                doctor?.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="bg-primary text-white px-2 py-1 text-sm my-1"
                  >
                    {service}
                  </span>
                ))
              ) : (
                <small>Not Set</small>
              )}
            </p>
          </div>
        </div>
        <h1 className="text-primary text-2xl mt-4">About</h1>
        <p className="flex items-center gap-2 my-4">
          {doctor?.about ? (
            <span className="indent-5">{doctor?.about}</span>
          ) : (
            <small>NA</small>
          )}
        </p>
        <h1 className="text-primary text-2xl mt-4">Clinic Info</h1>
        <p className="my-4">
          <label className="text-accent">Clinic Name: </label>
          {doctor?.about ? (
            <span className="font-bold">{doctor?.clinic_name}</span>
          ) : (
            <small>Not Set</small>
          )}
        </p>
        <p className=" my-4">
          <label className="text-accent">Clinic Address: </label>
          {doctor?.about ? (
            <span className="font-bold">{doctor?.clinic_address}</span>
          ) : (
            <small>Not Set</small>
          )}
        </p>
        <div className="flex flex-wrap items-center gap-2 my-4">
          {doctor?.clinic_images.map((item, idx) => (
            <img
              src={apiUrl + item.clinic_image}
              alt=""
              key={idx}
              className="w-[50px]"
            />
          ))}
        </div>
        <h1 className="text-primary text-2xl mt-4">Education</h1>
        {doctor?.education.length > 0 ? (
          <div className="timeline">
            {doctor?.education.map((item, idx) => (
              <div className="tml_container" key={idx}>
                <p className="font-bold hover:text-ternary transition-colors duration-300 w-max">
                  {item.degree}
                </p>
                <small className="block">{item.institute}</small>
                <small>
                  {getYear(item.date_from)} - {getYear(item.date_to)}
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p>NA</p>
        )}
        <h1 className="text-primary text-2xl mt-4">Experience</h1>
        {doctor?.experience.length > 0 ? (
          <div className="timeline">
            {doctor?.experience.map((item, idx) => (
              <div className="tml_container" key={idx}>
                <p className="font-bold hover:text-ternary transition-colors duration-300 w-max">
                  {item.position}
                </p>
                <small className="block">{item.hospital_name}</small>
                <small>
                  {getYear(item.date_from)} -
                  {!item.present ? getYear(item.date_to) : " Present"}
                  <span className="mx-1 text-[10px]">
                    • {totalYears(item.date_from)}
                  </span>
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p>NA</p>
        )}
        <h1 className="text-primary text-2xl mt-4">Awards</h1>
        {doctor?.awards.length > 0 ? (
          <div className="timeline">
            {doctor?.awards.map((item, idx) => (
              <div className="tml_container" key={idx}>
                <p className="font-bold hover:text-ternary transition-colors duration-300 w-max">
                  {item.award_name}
                </p>
                <small>{getYear(item.award_year)}</small>
              </div>
            ))}
          </div>
        ) : (
          <p>NA</p>
        )}
      </div>
    </Layout>
  );
}

export default DocOverview;
