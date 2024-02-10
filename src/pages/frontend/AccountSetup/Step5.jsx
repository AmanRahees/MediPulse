/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";

function Step5({ onComplete, onBack }) {
  return (
    <div className="border p-5 w-[350px] md:w-[460px] rounded-md">
      <h1 className="text-xl">
        <button className="mr-1" onClick={onBack}>
          <ArrowLeft size={15} />
        </button>
        Education <span className="text-sm">(Optional)</span>
      </h1>
      <hr className="my-2" />
      <div className="my-4">
        <Label className="block mb-2">Degree</Label>
        <Input type="" />
      </div>
      <div className="my-4">
        <Label className="block mb-2">College/Institute</Label>
        <Input type="" />
      </div>
      <div className="flex justify-between gap-2 my-4">
        <div className="">
          <Label className="block mb-2">From</Label>
          <Input type="" />
        </div>
        <div className="">
          <Label className="block mb-2">To</Label>
          <Input type="" />
        </div>
      </div>
      <div className="my-2">
        <button className="text-sm">+ Add More</button>
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

Step5.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Step5;
