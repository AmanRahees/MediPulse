/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/widgets/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/widgets/ui/dropdown-menu";
import { ScrollArea } from "@/widgets/ui/scroll-area";
import { User, Settings, Power, Bell, Mail } from "lucide-react";
import { Notification } from "@/data/notification";
import "./header.css";

function Header() {
  return (
    <header className="adm-header_">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-white" asChild>
          <div className="relative bg-zinc-800 p-2 rounded-full cursor-pointer">
            <small className="absolute top-0 right-0 rounded-full bg-highlight w-3 h-3 text-center"></small>
            <Bell />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-max md:mr-24 bg-main text-white border-zinc-800">
          <DropdownMenuLabel>
            <div className="flex justify-between items-center py-1">
              <p className="">Notifications</p>
              <button className="text-green-600 font-light">Clear All</button>
            </div>
          </DropdownMenuLabel>
          <hr className="border-zinc-800" />
          <ScrollArea className="h-64 p-1">
            {Notification.map((item, index) => (
              <div key={index} className="m-1">
                <div className="flex items-center gap-3 p-2 rounded-md">
                  <div className="bg-zinc-800 p-2 rounded-md">
                    <Mail />
                  </div>
                  <div className="w-52">
                    <span className="text-[12px] overflow-ellipsis overflow-hidden line-clamp-2">
                      {item.message}
                    </span>
                    <small className="text-gray-500 text-[10px]">
                      4 min ago
                    </small>
                  </div>
                </div>
                <hr className="border-zinc-800" />
              </div>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* ------------------------------------------------------------------------------------------ */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqWIPKg9kRQhn9r3qgpcRSACAXvg-dbTOWQiDN6b5ahLRZ-AU_ioL_uXv5Un0kNGPNhE&usqp=CAU"
              alt=""
              className="w-10 rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-max mr-5 bg-main border-zinc-800">
          <DropdownMenuLabel>
            <div className="flex gap-2 items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqWIPKg9kRQhn9r3qgpcRSACAXvg-dbTOWQiDN6b5ahLRZ-AU_ioL_uXv5Un0kNGPNhE&usqp=CAU"
                alt=""
                className="w-10 rounded-full"
              />
              <div>
                <p className="font-bold text-white">Aman Rahees</p>
                <small className="text-gray-500">Administrator</small>
              </div>
            </div>
          </DropdownMenuLabel>
          <hr className="my-1 border-zinc-800" />
          <DropdownMenuGroup className="px-1">
            <DropdownMenuItem className="focus:bg-main">
              <Link className="flex items-center gap-2 text-gray-500 hover:text-highlight rounded-md">
                <User />
                <span className="font-bold">Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-main">
              <Link className="flex items-center gap-2 text-gray-500 hover:text-highlight rounded-md">
                <Settings />
                <span className="font-bold">Settings</span>
              </Link>
            </DropdownMenuItem>
            <hr className="my-1 border-zinc-800" />
            <DropdownMenuItem className="focus:bg-main">
              <Link className="flex items-center gap-2 text-red-600 hover:text-red-600 rounded-md">
                <Power />
                <span className="font-bold">Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default Header;
