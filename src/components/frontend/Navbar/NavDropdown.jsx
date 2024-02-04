/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Power, User, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/widgets/ui/dropdown-menu";

const NavDrop = () => {
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
                Aman Rahees
              </p>
              <small className="text-gray-500">Patient</small>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-1">
          <Link to="/profile">
            <User className="inline-block text-zinc-700" size={20} /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-1">
          <Link to="">
            <Settings className="inline-block text-zinc-700" size={20} />{" "}
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-1 text-red-600">
            <Power className="inline-block" size={20} /> Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDrop;