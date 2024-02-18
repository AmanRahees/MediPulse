import { useState } from "react";
import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import { Checkbox } from "@/widgets/ui/checkbox";
import { ErrorInfo } from "@/components/Icons";

function EditExperience({ formData, setFormData, formErrors }) {
  const [experiences, setExperiences] = useState(
    formData?.experience?.length > 0
      ? formData.experience
      : [
          {
            hospital_name: "",
            position: "",
            date_from: "",
            date_to: "",
            present: false,
          },
        ]
  );

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
    setExperiences(updatedExperiences);
    setFormData({ ...formData, experience: updatedExperiences });
  };
  const handleCheckboxChange = (index, e) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      present: e,
      date_to: e ? "" : updatedExperiences[index].date_to,
    };
    setExperiences(updatedExperiences);
    setFormData({ ...formData, experience: updatedExperiences });
  };
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        hospital_name: "",
        position: "",
        date_from: "",
        date_to: "",
        present: false,
      },
    ]);
  };
  const removeExperiences = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
    setFormData({ ...formData, experience: updatedExperiences });
  };
  return (
    <>
      <p className="font-bold text-xl mt-5">
        Experience{" "}
        <button
          onClick={addExperience}
          type="button"
          className="inline text-secondary text-xs py-2 px-3 rounded-md"
        >
          + Add More
        </button>
      </p>
      <hr className="my-3" />
      {experiences.map((experience, idx) => (
        <div className="mb-10" key={idx}>
          <div className="flex flex-wrap gap-2 my-2">
            <div className="w-full md:w-auto">
              <Label className="mb-1">Hospital Name</Label>
              <Input
                type="text"
                name="hospital_name"
                value={experience?.hospital_name}
                onChange={(e) => handleInputChange(idx, e)}
                className="focus:border-sky-200"
                autoComplete="off"
              />
              {formErrors[`experience${idx}_hospital_name`] && (
                <small className="block text-red-600 mt-1 mx-1">
                  <ErrorInfo /> {formErrors[`experience${idx}_hospital_name`]}
                </small>
              )}
            </div>
            <div className="w-full md:w-auto">
              <Label className="mb-1">Position</Label>
              <Input
                type="text"
                name="position"
                value={experience?.position}
                onChange={(e) => handleInputChange(idx, e)}
                className="focus:border-sky-200"
                autoComplete="off"
              />
              {formErrors[`experience${idx}_position`] && (
                <small className="block text-red-600 mt-1 mx-1">
                  <ErrorInfo /> {formErrors[`experience${idx}_position`]}
                </small>
              )}
            </div>
            <div className="w-[150px] md:w-auto">
              <Label className="mb-1">From</Label>
              <Input
                type="date"
                name="date_from"
                value={experience?.date_from}
                onChange={(e) => handleInputChange(idx, e)}
                className="focus:border-sky-200"
                autoComplete="off"
              />
              {formErrors[`experience${idx}_dates`] && (
                <small className="block text-red-600 mt-1 mx-1">
                  <ErrorInfo /> {formErrors[`experience${idx}_dates`]}
                </small>
              )}
            </div>
            <div className="w-[150px] md:w-auto">
              <Label className="mb-1">To</Label>
              <Input
                type="date"
                name="date_to"
                disabled={experience?.present || false}
                value={experience?.date_to}
                onChange={(e) => handleInputChange(idx, e)}
                className="focus:border-sky-200"
                autoComplete="off"
              />
            </div>
            <button
              type="button"
              onClick={() => removeExperiences(idx)}
              className="bg-red-600 text-white p-1 md:p-2 h-max rounded-md md:mt-6 md:mx-auto ml-auto"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <Label className="flex items-center text-gray-700 gap-1 w-max text-sm mx-1">
            <Checkbox
              checked={experience?.present}
              onCheckedChange={(e) => handleCheckboxChange(idx, e)}
              className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary border-gray-400"
            />{" "}
            I am currently working in this role.
          </Label>
        </div>
      ))}
    </>
  );
}

EditExperience.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
};

export default EditExperience;
