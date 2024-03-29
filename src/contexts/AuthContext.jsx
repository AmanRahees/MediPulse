import { useState, useEffect, createContext, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/services/axios";
import Loader from "@/components/frontend/Loader/Loader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [userData, setUserData] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const UserLogin = async (email, password, state) => {
    axiosInstance
      .post(`accounts/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          setAuthTokens(data);
          setUserData(jwtDecode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
          navigate("/");
        }
      })
      .catch(() => {
        setError("Invalid Email or Password!");
        state(false);
      });
  };

  const AdminLogin = async (email, password, state) => {
    axiosInstance
      .post(`admin/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          setAuthTokens(data);
          setUserData(jwtDecode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
          navigate("/admin/dashboard");
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          setError("Permission Denied!");
          state(false);
        } else {
          setError("Invalid Email or Password!");
          state(false);
        }
      });
  };

  const Logout = () => {
    setAuthTokens(null);
    setUserData(null);
    localStorage.removeItem("authTokens");
  };

  let refreshToken = useCallback(async () => {
    await axiosInstance
      .post("accounts/token/refresh", {
        refresh: authTokens?.refresh,
      })
      .then((response) => {
        let data = response.data;
        console.log("Refresh Success");
        if (response.status === 200) {
          setAuthTokens(data);
          setUserData(jwtDecode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
        } else {
          Logout();
        }
      })
      .catch(() => {
        Logout();
      });
    if (loading) {
      setLoading(false);
    }
  }, [authTokens, loading]);

  useEffect(() => {
    let lifeTime = 1000 * 60 * 9;
    let interval = setInterval(() => {
      if (authTokens) {
        refreshToken();
        console.log("Refreshing...");
      }
    }, lifeTime);
    return () => clearInterval(interval);
  }, [authTokens, refreshToken]);

  let context = {
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    userData: userData,
    setUserData: setUserData,
    UserLogin: UserLogin,
    AdminLogin: AdminLogin,
    Logout: Logout,
    loading: loading,
    setLoading: setLoading,
    error: error,
  };
  return (
    <AuthContext.Provider value={context}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
