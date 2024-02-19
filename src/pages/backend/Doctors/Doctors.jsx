/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import useAxios from "@/services/useAxios";
import { apiUrl } from "@/services/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/widgets/ui/table";
import Layout from "@/components/backend/Layout/Layout";
import Breadcrumb from "@/components/backend/Elements/Breadcrumb";
import Loader from "@/components/frontend/Loader/Loader";

function Doctors() {
  const api = useAxios();
  const pathToPage = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      title: "Doctors",
      path: "/admin/doctors",
    },
  ];
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    api
      .get("admin/doctors")
      .then((response) => {
        setDoctors(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <Layout>
      <h1 className="pageHeading_">Doctors</h1>
      <Breadcrumb pathToPage={pathToPage} />
      {doctors.length > 0 ? (
        <div className="my-5 p-3 bg-white">
          <Table className="border-b text-nowrap w-max lg:w-full">
            <TableHeader>
              <TableRow className="bg-main hover:bg-main">
                <TableHead className="font-bold text-white">
                  Doctor Name
                </TableHead>
                <TableHead className="font-bold text-white">Email</TableHead>
                <TableHead className="font-bold text-white">
                  Speciality
                </TableHead>
                <TableHead className="font-bold text-white">Earned</TableHead>
                <TableHead className="font-bold text-white">Rating</TableHead>
                <TableHead className="font-bold text-white">
                  Member Since
                </TableHead>
                <TableHead className="font-bold text-white">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          doctor?.picture
                            ? apiUrl + doctor?.picture
                            : "https://doccure.dreamstechnologies.com/html/template/admin/assets/img/doctors/doctor-thumb-02.jpg"
                        }
                        alt=""
                        className="w-[40px] rounded-full"
                      />
                      <p>Dr. {doctor?.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{doctor?.account}</TableCell>
                  <TableCell>Cardiologist</TableCell>
                  <TableCell>$0</TableCell>
                  <TableCell>4.2</TableCell>
                  <TableCell>Jan 28 2024</TableCell>
                  <TableCell>
                    {/* <button className="bg-blue-200 text-blue-700 py-1 px-2 text-xs rounded-2xl">
                  Requested
                </button> */}
                    <button className="bg-green-200 text-green-700 py-1 px-2 text-xs rounded-2xl">
                      Approved
                    </button>
                    {/* <button className="bg-red-200 text-red-700 py-1 px-2 text-xs rounded-2xl">
                  Revoked
                </button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end items-center gap-1 my-2">
            <button className="bg-main text-white text-xs py-2 px-5 rounded-lg">
              Prev
            </button>
            <button className="bg-main text-white text-xs py-2 px-5 rounded-lg">
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center my-20">
          <div className="flex flex-col gap-3">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="block text-red-600 text-6xl md:text-8xl"
            />
            No Doctors Found!
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Doctors;
