/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import useAxios from "@/services/useAxios";
import { Settings2 } from "lucide-react";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/widgets/ui/dialog";
import { ErrorInfo } from "@/components/Icons";

function EditTimings({ schedule, schedules, day }) {
  const api = useAxios();
  const dialogCloseRef = useRef(null);
  const [formData, setFormData] = useState(
    schedule ?? {
      day: day,
      start_time: "",
      total_slots: 10,
      slot_duration: 10,
    }
  );
  const [formErrors, setFormErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "total_slots") {
      const parsedValue = value !== "" ? parseInt(value) : "";
      setFormData({ ...formData, [name]: parsedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setFormErrors({ ...formErrors, [name]: "" });
  };
  const validateForm = () => {
    let errors = {};
    if (formData.start_time === "") {
      errors.start_time = "Required";
    }
    if (formData.total_slots === "" || formData.total_slots === 0) {
      errors.total_slots = "Required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const valid = validateForm();
    if (valid) {
      api
        .post("doctors/schedules", {
          schedules: [...schedules, { ...formData }],
        })
        .then((res) => {
          console.log(res);
          dialogCloseRef.current.click();
        })
        .catch(() => {});
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-1 text-teal-500 text-sm">
        <Settings2 size={18} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900">
            Edit Time Slots
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <Label className="block text-gray-700 mb-2">Day</Label>
            <Label className="block text-gray-700 mb-2">Start Time</Label>
            <Label className="block text-gray-700 mb-2">No. of Slots</Label>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-5">
            <Input
              type="text"
              name="day"
              value={formData?.day}
              onChange={(e) => handleInputChange(e)}
              readOnly
            />
            <div className="">
              <Input
                type="time"
                name="start_time"
                value={formData?.start_time}
                onChange={(e) => handleInputChange(e)}
              />
              {formErrors.start_time && (
                <small className="flex items-center gap-1 text-red-600 my-1">
                  <ErrorInfo /> {formErrors?.start_time}
                </small>
              )}
            </div>
            <div className="">
              <Input
                type="number"
                name="total_slots"
                value={formData?.total_slots}
                onChange={(e) => handleInputChange(e)}
              />
              {formErrors?.total_slots && (
                <small className="flex items-center gap-1 text-red-600 my-1">
                  <ErrorInfo /> {formErrors?.total_slots}
                </small>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose
              ref={dialogCloseRef}
              className="bg-zinc-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Close
            </DialogClose>
            <button className="bg-primary text-white px-3 py-1 rounded-md">
              Save
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

EditTimings.propTypes = {
  schedule: PropTypes.object,
  schedules: PropTypes.array,
  day: PropTypes.string,
};

export default EditTimings;
