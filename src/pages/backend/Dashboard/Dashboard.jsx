/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Stethoscope, User, Table2, Wallet } from "lucide-react";
import Layout from "@/components/backend/Layout/Layout";

function Dashboard() {
  const GetToday = () => {
    let date = new Date();
    let options = { day: "numeric", month: "short", year: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  return (
    <Layout>
      <h1 className="pageHeading_">Dashboard</h1>
      <small className="block font-bold">{GetToday()}</small>

      <div className="my-5 grid grid-cols-1 md:grid-cols-4 gap-3">
        <Link className="relative border bg-main text-white h-36 p-5 rounded-md shadow">
          <p className="font-bold text-xl">Income</p>
          <span className="absolute top-5 right-5 p-3 rounded-full bg-green-400 text-main">
            <Wallet />
          </span>
          <h1 className="absolute bottom-5 right-5 text-2xl">$293874</h1>
        </Link>
        <Link className="relative border bg-main text-white h-36 p-5 rounded-md shadow">
          <p className="font-bold text-xl">Doctors</p>
          <span className="absolute top-5 right-5 p-3 rounded-full bg-sky-400 text-main">
            <Stethoscope />
          </span>
          <h1 className="absolute bottom-5 right-5 text-2xl">20+</h1>
        </Link>
        <Link className="relative border bg-main text-white h-36 p-5 rounded-md shadow">
          <p className="font-bold text-xl">Patients</p>
          <span className="absolute top-5 right-5 p-3 rounded-full bg-indigo-400 text-main">
            <Stethoscope />
          </span>
          <h1 className="absolute bottom-5 right-5 text-2xl">350+</h1>
        </Link>
        <Link className="relative border bg-main text-white h-36 p-5 rounded-md shadow">
          <p className="font-bold text-xl">Appointments</p>
          <span className="absolute top-5 right-5 p-3 rounded-full bg-fuchsia-400 text-main">
            <Table2 />
          </span>
          <h1 className="absolute bottom-5 right-5 text-2xl">175+</h1>
        </Link>
      </div>
    </Layout>
  );
}

export default Dashboard;
