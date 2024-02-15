import { useContext } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import AuthContext from "@/contexts/AuthContext";
import Layout from "@/components/frontend/Layout/Layout";
import Aside from "@/components/frontend/Aside/Aside";
import { patientItems } from "./items";
import { doctortItems } from "./items";
import "./board.css";

Board.propTypes = {
  children: PropTypes.element.isRequired,
};

function Board({ children }) {
  const { userData } = useContext(AuthContext);
  const { userInfo, loading } = useSelector((state) => state.user);
  return (
    <Layout>
      <div className="p-3 lg:py-20 lg:px-32">
        <main className="pfl_wrapper">
          <Aside
            items={userData.role === "doctor" ? doctortItems : patientItems}
            userInfo={userInfo}
            loading={loading}
            role={userData.role}
          />
          <div className="pfl_n2 border p-5 overflow-hidden">{children}</div>
        </main>
      </div>
    </Layout>
  );
}

export default Board;
