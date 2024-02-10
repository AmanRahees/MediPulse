/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";

function Step7({ onComplete, onBack }) {
  return (
    <div className="border p-5 w-[350px] md:w-[460px] rounded-md">
      <h1 className="text-xl">
        <button className="mr-1" onClick={onBack}>
          <ArrowLeft size={15} />
        </button>
        Awards <span className="text-sm">(Optional)</span>
      </h1>
      <hr className="my-2" />
      <div className="flex justify-between gap-2 my-4">
        <div className="w-[70%]">
          <Label className="block mb-2">Award</Label>
          <Input type="" />
        </div>
        <div className="w-[30%]">
          <Label className="block mb-2">Year</Label>
          <Input type="" />
        </div>
      </div>
      <div className="my-2">
        <button className="text-sm text-secondary">+ Add More</button>
      </div>
      <button className="my-2 bg-primary text-white py-2 w-full rounded-md text-sm">
        Continue
      </button>
    </div>
  );
}

Step7.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Step7;
