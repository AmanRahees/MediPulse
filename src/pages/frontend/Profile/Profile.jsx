/* eslint-disable no-unused-vars */
import React from "react";
import { UploadCloud } from "lucide-react";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/widgets/ui/select";
import DatePicker from "@/widgets/common/DatePicker";
import Board from "@/components/frontend/Board/Board";
import { BLOOD_GROUPS } from "@/services/constants";
import { formatDate } from "@/func/days";
import "./profile.css";

function Profile() {
  return (
    <Board>
      <form onSubmit={(e) => {}}>
        <div className="flex items-center gap-3">
          <img
            src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
            alt="picture"
            className="w-[100px] rounded-lg"
          />
          <div>
            <div className="relative text-center overflow-hidden w-max bg-secondary rounded-md py-2 px-5 cursor-pointer">
              <p className="flex items-center gap-2 text-white text-sm cursor-pointer">
                <UploadCloud size={20} /> Upload
              </p>
              <Input
                type="file"
                className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
              />
            </div>
            <Label className="text-zinc-600 text-xs mt-1">
              Allowed JPG, GIF or PNG. Max size of 2MB
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative my-2">
            <Label className="mb-1">First Name</Label>
            <Input className="focus:border-sky-200" />
          </div>
          <div className="relative my-2">
            <Label className="mb-1">Last Name</Label>
            <Input className="focus:border-sky-200" />
          </div>
          <div className="relative my-2">
            <Label className="mb-1 block">Date of Birth</Label>
            <DatePicker
              onChange={(e) => console.log(formatDate(e))}
              isMax={true}
            />
          </div>
          <div className="relative my-2">
            <Label className="mb-1">Blood Group</Label>
            <Select>
              <SelectTrigger className="focus:outline-none">
                <SelectValue placeholder="Select your Blood Group" />
              </SelectTrigger>
              <SelectContent>
                {BLOOD_GROUPS.map((blood, index) => (
                  <SelectItem key={index} value={blood}>
                    {blood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="relative my-2">
            <Label className="mb-1">Email ID</Label>
            <Input className="focus:border-sky-200" />
          </div>
          <div className="relative my-2">
            <Label className="mb-1">Mobile</Label>
            <Input className="focus:border-sky-200" />
          </div>
          <div className="relative my-2 md:col-span-2">
            <Label className="mb-1">Address</Label>
            <Input className="focus:border-sky-200" />
          </div>
          <div className="relative my-2">
            <Label className="mb-1">City</Label>
            <Input className="focus:border-sky-200" />
          </div>
          <div className="relative my-2">
            <Label className="mb-1">State</Label>
            <Input className="focus:border-sky-200" />
          </div>
          <div className="relative my-2">
            <Label className="mb-1">Zip Code</Label>
            <Input className="focus:border-sky-200" />
          </div>
          <div className="relative my-2">
            <Label className="mb-1">Country</Label>
            <Input className="focus:border-sky-200" />
          </div>
        </div>
        <button className="py-2 px-3 mt-3 bg-green-500 text-white rounded-md font-bold text-sm">
          Save Changes
        </button>
      </form>
    </Board>
  );
}

export default Profile;
