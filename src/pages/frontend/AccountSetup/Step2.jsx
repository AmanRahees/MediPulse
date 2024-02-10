/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import { Textarea } from "@/widgets/ui/textarea";

function Step2({ onComplete, onBack }) {
  return (
    <div className="border p-5 w-[350px] md:w-[460px] rounded-md">
      <h1 className="text-xl">
        <button className="mr-1" onClick={onBack}>
          <ArrowLeft size={15} />
        </button>
        Other Information
      </h1>
      <hr className="my-2" />
      <div className="my-4">
        <Label className="block mb-2">Specilaity</Label>
        <Input type="" />
      </div>
      <div className="my-4">
        <Label className="block mb-2">About You</Label>
        <Textarea
          type=""
          className="resize-none"
          placeholder="Tell us a little bit about yourself"
        />
      </div>
      <div className="my-4">
        <Label className="block mb-2">Services</Label>
        <Input type="" />
      </div>
      <div className="my-4">
        <Label className="block mb-2">Location</Label>
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

Step2.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Step2;
