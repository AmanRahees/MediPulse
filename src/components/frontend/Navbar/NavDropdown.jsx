/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useAxios from "@/services/useAxios";
import { LogOut, User, Wallet, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/widgets/ui/dropdown-menu";
import {
  getPatientInfo,
  getDoctorInfo,
  makeUserRequest,
} from "@/redux/actions/userActions";

const NavDropdown = ({ user, userLogout }) => {
  const api = useAxios();
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(makeUserRequest());
    if (user?.role === "doctor") {
      api
        .get(`contexts/doctorInfo/${user?.user_id}`)
        .then((response) => {
          dispatch(getDoctorInfo(response.data));
        })
        .catch(() => {});
    } else if (user?.role === "admin") {
      //
    } else if (user?.role === "patient") {
      api
        .get(`contexts/patientInfo/${user?.user_id}`)
        .then((response) => {
          dispatch(getPatientInfo(response.data));
        })
        .catch(() => {});
    }
    // eslint-disable-next-line
  }, [dispatch, user]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none p-1">
        <img
          src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
          alt=""
          className="w-[40px] aspect-square rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-max mr-5 border-gray-300">
        <DropdownMenuLabel>
          <div className="flex gap-2 items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqWIPKg9kRQhn9r3qgpcRSACAXvg-dbTOWQiDN6b5ahLRZ-AU_ioL_uXv5Un0kNGPNhE&usqp=CAU"
              alt=""
              className="w-10 rounded-full"
            />
            <div>
              <p className="font-bold text-main text-ellipsis line-clamp-1 overflow-hidden max-w-[120px]">
                {user?.username}
              </p>
              <small className="text-gray-500 capitalize">{user?.role}</small>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link
          to={user?.role === "doctor" ? "/doctor/dashboard" : `/profile`}
          className="w-full h-full"
        >
          {user?.role === "doctor" ? (
            <DropdownMenuItem className="flex items-center gap-1 cursor-pointer">
              <LayoutDashboard
                className="inline-block text-zinc-700"
                size={20}
              />
              Dashboard
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="flex items-center gap-1 cursor-pointer">
              <User className="inline-block text-zinc-700" size={20} /> Profile
            </DropdownMenuItem>
          )}
        </Link>
        <Link
          to={
            user?.role === "doctor"
              ? "/doctor/dashboard/wallet"
              : `/profile/wallet`
          }
        >
          <DropdownMenuItem className="flex justify-between items-center w-full cursor-pointer">
            <span className="flex gap-1">
              <Wallet className="inline-block text-zinc-700" size={20} />
              Wallet
            </span>
            <b className="block text-xs text-zinc-500">&#8377;5000.00</b>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <button className="w-full" onClick={userLogout}>
          <DropdownMenuItem className="flex items-center gap-1 text-red-600 focus:text-red-600 w-full">
            <LogOut className="inline-block" size={20} /> Logout
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

NavDropdown.propTypes = {
  user: PropTypes.object.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default NavDropdown;
