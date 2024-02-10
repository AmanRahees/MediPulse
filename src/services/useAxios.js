/* eslint-disable no-unused-vars */
import { useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AuthContext from "@/contexts/AuthContext";
import { apiUrl } from "./constants";
import dayjs from "dayjs";

function useAxios() {
  const { authTokens, setUserData, setAuthTokens, Logout } =
    useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: `${apiUrl}/api/`,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(authTokens?.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const response = await axios
      .post(`${apiUrl}/api/accounts/token/refresh`, {
        refresh: authTokens.refresh,
      })
      .catch((error) => {
        Logout();
      });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUserData(jwtDecode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });
  return axiosInstance;
}

export default useAxios;
