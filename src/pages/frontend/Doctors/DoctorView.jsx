import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext";
import axiosInstance from "@/services/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMoneyBill1Wave,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/widgets/ui/tabs";
import Layout from "@/components/frontend/Layout/Layout";
import Loader from "@/components/frontend/Loader/Loader";
import { Overview, Reviews, Timings } from "@/components/frontend/TabBlocks";
import Rating from "@/components/Rating";
import "./doctors.css";

function DoctorView() {
  const { id } = useParams();
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`doctors/${id}`)
      .then((res) => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch(() => {});
  }, [id]);
  if (loading) {
    return <Loader />;
  }
  return (
    <Layout>
      <div className="p-3 lg:py-20 lg:px-32">
        <div className="md:flex md:justify-between border p-3 rounded-md">
          <div className="md:flex items-start gap-5">
            <img
              src={
                doctor?.picture ??
                "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-02.jpg"
              }
              alt=""
              className="w-full md:w-[200px] aspect-square rounded-md border"
            />
            <div className="my-5">
              <p className="font-bold text-2xl md:text-lg">
                Dr. {doctor?.name}
              </p>
              <p className="text-secondary my-1">
                <FontAwesomeIcon icon={faStethoscope} />{" "}
                {doctor?.speciality?.speciality_name}
              </p>
              <Rating value={doctor?.ratings} />
              <div className="flex gap-2 my-5">
                {doctor?.clinic_images.map((image, idx) => (
                  <img
                    src={image?.clinic_image}
                    alt=""
                    className="w-[50px] rounded-md"
                    key={idx}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {doctor?.services.map((service, idx) => (
                  <small
                    className="block py-1 px-3 border rounded-md"
                    key={idx}
                  >
                    {service}
                  </small>
                ))}
              </div>
            </div>
          </div>
          <div className="my-auto">
            <p className="text-[#6B7280] my-2">
              <FontAwesomeIcon icon={faComment} className="text-primary" /> 35
              Feedback
            </p>
            <p className="text-[#6B7280] my-2">
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                className="text-primary"
              />{" "}
              &#8377;{doctor?.consultation_fee}
            </p>
            <p className="text-[#6B7280] my-2 w-[200px]  text-ellipsis overflow-hidden line-clamp-1">
              <FontAwesomeIcon icon={faLocationDot} className="text-primary" />{" "}
              {doctor?.location}
            </p>
            {doctor?.account?.id !== userData?.user_id && (
              <button
                onClick={() => navigate("booking")}
                className="bg-secondary w-full md:w-[200px] text-white py-2 rounded-md mt-2"
              >
                Book Appoinment
              </button>
            )}
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
            <Overview doctor={doctor} />
          </TabsContent>
          <TabsContent value="reviews">
            <Reviews doctor={doctor} />
          </TabsContent>
          <TabsContent value="timings">
            <Timings doctor={doctor} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

export default DoctorView;
