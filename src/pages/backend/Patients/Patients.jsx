/* eslint-disable no-unused-vars */
import React from "react";
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

function Patients() {
  const pathToPage = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      title: "Patients",
      path: "/admin/patients",
    },
  ];
  return (
    <Layout>
      <h1 className="pageHeading_">Patients</h1>
      <Breadcrumb pathToPage={pathToPage} />
      <div className="my-5 p-3 bg-white">
        <Table className="border-b text-nowrap w-max lg:w-full">
          <TableHeader>
            <TableRow className="bg-main hover:bg-main">
              <TableHead className="font-bold text-white">
                Patient Name
              </TableHead>
              <TableHead className="font-bold text-white">Email</TableHead>
              <TableHead className="font-bold text-white">Gender</TableHead>
              <TableHead className="font-bold text-white">
                Member Since
              </TableHead>
              <TableHead className="font-bold text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src="https://doccure.dreamstechnologies.com/html/template/admin/assets/img/doctors/doctor-thumb-02.jpg"
                    alt=""
                    className="w-[40px] rounded-full"
                  />
                  <p>Dr. Aman Rahees</p>
                </div>
              </TableCell>
              <TableCell>aman@gmail.com</TableCell>
              <TableCell>Male</TableCell>
              <TableCell>Jan 28, 2024</TableCell>
              <TableCell>
                {/* <button className="bg-blue-200 text-blue-700 py-1 px-2 text-xs rounded-2xl">
                  Requested
                </button> */}
                <button className="bg-green-200 text-green-700 py-1 px-2 text-xs rounded-2xl">
                  Active
                </button>
                {/* <button className="bg-red-200 text-red-700 py-1 px-2 text-xs rounded-2xl">
                  Revoked
                </button> */}
              </TableCell>
            </TableRow>
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
    </Layout>
  );
}

export default Patients;
