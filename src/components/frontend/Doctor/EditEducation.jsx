import { useState } from "react";
import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import { ErrorInfo } from "@/components/Icons";

function EditEducation({ formData, setFormData, formErrors }) {
  const [educations, setEducations] = useState(
    formData?.education?.length > 0
      ? formData.education
      : [{ degree: "", institute: "", date_from: "", date_to: "" }]
  );

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducations = [...educations];
    updatedEducations[index] = { ...updatedEducations[index], [name]: value };
    setEducations(updatedEducations);
    setFormData({ ...formData, education: updatedEducations });
  };
  const addEducation = () => {
    setEducations([
      ...educations,
      { degree: "", institute: "", date_from: "", date_to: "" },
    ]);
  };
  const removeEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
    setFormData({ ...formData, education: updatedEducations });
  };
  return (
    <>
      <p className="font-bold text-xl mt-5">
        Education{" "}
        <button
          onClick={addEducation}
          type="button"
          className="inline text-secondary text-xs py-2 px-3 rounded-md"
        >
          + Add More
        </button>
      </p>
      <hr className="my-3" />
      {educations.map((education, idx) => (
        <div className="flex flex-wrap gap-2 mt-2 mb-10" key={idx}>
          <div className="w-full md:w-auto">
            <Label className="mb-1">Degree</Label>
            <Input
              type="text"
              name="degree"
              value={education?.degree}
              onChange={(e) => handleInputChange(idx, e)}
              className="focus:border-sky-200"
              autoComplete="off"
            />
            {formErrors[`education${idx}_degree`] && (
              <small className="block text-red-600 mt-1 mx-1">
                <ErrorInfo /> {formErrors[`education${idx}_degree`]}
              </small>
            )}
          </div>
          <div className="w-full md:w-auto">
            <Label className="mb-1">Institute</Label>
            <Input
              type="text"
              name="institute"
              value={education?.institute}
              onChange={(e) => handleInputChange(idx, e)}
              className="focus:border-sky-200"
              autoComplete="off"
            />
            {formErrors[`education${idx}_institute`] && (
              <small className="block text-red-600 mt-1 mx-1">
                <ErrorInfo /> {formErrors[`education${idx}_institute`]}
              </small>
            )}
          </div>
          <div className="w-[150px] md:w-auto">
            <Label className="mb-1">From</Label>
            <Input
              type="date"
              name="date_from"
              value={education?.date_from}
              onChange={(e) => handleInputChange(idx, e)}
              className="focus:border-sky-200"
              autoComplete="off"
            />
            {formErrors[`education${idx}_dates`] && (
              <small className="block text-red-600 mt-1 mx-1">
                <ErrorInfo /> {formErrors[`education${idx}_dates`]}
              </small>
            )}
          </div>
          <div className="w-[150px] md:w-auto">
            <Label className="mb-1">To</Label>
            <Input
              type="date"
              name="date_to"
              value={education?.date_to}
              onChange={(e) => handleInputChange(idx, e)}
              className="focus:border-sky-200"
              autoComplete="off"
            />
          </div>
          <button
            type="button"
            onClick={() => removeEducation(idx)}
            className="bg-red-600 text-white p-1 md:p-2 h-max rounded-md md:mt-6 md:mx-auto ml-auto"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </>
  );
}

EditEducation.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
};

export default EditEducation;
