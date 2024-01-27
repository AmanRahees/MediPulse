/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/frontend/Layout/Layout";
import Loader from "@/components/frontend/Loader/Loader";
import banner from "@/assets/images/medical_banner.jpg";
import "./home.css";

function Home() {
  const [loading, setLoading] = useState(false);
  if (loading) {
    return <Loader />;
  }
  return (
    <Layout>
      <div className="_hero-section">
        <img src={banner} alt="" className="w-full" />
        <div className="_hero-content">
          <div className="absolute top-10 left-8 md:top-1/2 md:left-52 md:-translate-y-1/2">
            <h1>YOUR HEALTH IS OUR PRIORITY</h1>
            <p className="mb-5">
              We offer best healthcare for you and your family.
            </p>
            <Link className="px-5 py-3 bg-secondary text-white rounded-xl">
              Take Appoinment
            </Link>
          </div>
        </div>
      </div>
      <p className="_contentBox bg-sky-100">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nihil,
        laborum ex velit optio rem labore ipsum illum? Blanditiis vel officia,
        amet repellat ullam optio fuga aliquid delectus dicta ex!
      </p>
    </Layout>
  );
}

export default Home;
