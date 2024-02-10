import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext";

export const CredentialRoute = () => {
  const { userData } = useContext(AuthContext);
  return !userData ? <Outlet /> : <Navigate to="/" />;
};

export const DoctorRoute = () => {
  let { userData } = useContext(AuthContext);
  if (userData && userData.role === "doctor") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export const PublicRoute = () => {
  let { userData } = useContext(AuthContext);
  return userData ? <Outlet /> : <Navigate to="/login" />;
};
