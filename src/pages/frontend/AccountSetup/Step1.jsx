/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { UploadCloud } from "lucide-react";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/widgets/ui/select";

function Step1({ onComplete }) {
  return (
    <div className="border p-5 w-[350px] md:w-[460px] rounded-md">
      <h1 className="text-xl">Basic Information</h1>
      <hr className="my-2" />
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
      <div className="my-4">
        <Label className="block mb-2">First Name</Label>
        <Input type="" />
      </div>
      <div className="my-4">
        <Label className="block mb-2">Last Name</Label>
        <Input type="" />
      </div>
      <div className="my-4">
        <Label className="block mb-2">Email</Label>
        <div className="p-2 text-sm font-bold">aman@gmail.com</div>
      </div>
      <div className="my-4">
        <Label className="block mb-2">Phone number</Label>
        <Input type="" />
      </div>
      <div className="my-4">
        <Label className="block mb-2">Gender</Label>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <button
        onClick={onComplete}
        className="my-2 bg-primary text-white py-2 w-full rounded-md text-sm"
      >
        Continue
      </button>
    </div>
  );
}

export default Step1;

Step1.propTypes = {
  onComplete: PropTypes.func.isRequired,
};
