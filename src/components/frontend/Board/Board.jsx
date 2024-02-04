/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import Layout from "@/components/frontend/Layout/Layout";
import Aside from "@/components/frontend/Aside/Aside";
import { patientItems } from "./items";
import { doctortItems } from "./items";
import "./board.css";

Board.propTypes = {
  children: PropTypes.element.isRequired,
};

function Board({ children }) {
  return (
    <Layout>
      <div className="p-3 lg:py-20 lg:px-32">
        <main className="pfl_wrapper">
          <Aside items={doctortItems} />
          <div className="pfl_n2 border p-5">{children}</div>
        </main>
      </div>
    </Layout>
  );
}

export default Board;
