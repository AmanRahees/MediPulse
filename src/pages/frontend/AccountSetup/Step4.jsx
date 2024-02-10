/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";

function Step4({ onComplete, onBack }) {
  return (
    <div className="border p-5 w-[350px] md:w-[460px] rounded-md">
      <h1 className="text-xl">
        <button className="mr-1" onClick={onBack}>
          <ArrowLeft size={15} />
        </button>
        Consulation Information
      </h1>
      <hr className="my-2" />
      <div className="my-4">
        <Label className="block mb-2">Consultation Fee</Label>
        <Input type="" />
      </div>
      <div className="my-4">
        <Label className="block mb-2">Slot Duration</Label>
        <Input type="" />
      </div>
      <div className="my-4">
        <Label className="block mb-2">Schedule Timings</Label>
        <Input type="" />
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

Step4.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Step4;
