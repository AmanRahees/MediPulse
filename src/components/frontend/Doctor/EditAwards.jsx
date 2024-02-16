import { useState } from "react";
import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import { ErrorInfo } from "@/components/Icons";

function EditAwards({ formData, setFormData, formErrors }) {
  const [awards, setAwards] = useState(
    formData?.awards?.length > 0
      ? formData.awards
      : [
          {
            award_name: "",
            award_year: "",
          },
        ]
  );

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAwards = [...awards];
    updatedAwards[index] = { ...updatedAwards[index], [name]: value };
    setAwards(updatedAwards);
    setFormData({ ...formData, awards: updatedAwards });
  };
  const addAwards = () => {
    setAwards([
      ...awards,
      {
        award_name: "",
        award_year: "",
      },
    ]);
  };
  const removeAwards = (index) => {
    const updatedAwards = [...awards];
    updatedAwards.splice(index, 1);
    setAwards(updatedAwards);
    setFormData({ ...formData, awards: updatedAwards });
  };
  return (
    <>
      <p className="font-bold text-xl mt-5">
        Awards{" "}
        <button
          onClick={addAwards}
          type="button"
          className="inline text-secondary text-xs py-2 px-3 rounded-md"
        >
          + Add More
        </button>
      </p>
      <hr className="my-3" />
      {awards.map((award, idx) => (
        <div className="flex flex-wrap md:flex-nowrap gap-2 mb-10" key={idx}>
          <div className="w-full">
            <Label className="mb-1">Award Name</Label>
            <Input
              type="text"
              name="award_name"
              value={award?.award_name}
              onChange={(e) => handleInputChange(idx, e)}
              className="focus:border-sky-200"
              autoComplete="off"
            />
            {formErrors[`award${idx}_award_name`] && (
              <small className="block text-red-600 mt-1 mx-1">
                <ErrorInfo /> {formErrors[`award${idx}_award_name`]}
              </small>
            )}
          </div>
          <div className="w-[250px] md:w-full">
            <Label className="mb-1">Year Won</Label>
            <Input
              type="date"
              name="award_year"
              value={award?.award_year}
              onChange={(e) => handleInputChange(idx, e)}
              className="focus:border-sky-200"
              autoComplete="off"
            />
            {formErrors[`award${idx}_award_year`] && (
              <small className="block text-red-600 mt-1 mx-1">
                <ErrorInfo /> {formErrors[`award${idx}_award_year`]}
              </small>
            )}
          </div>
          {idx !== 0 ? (
            <button
              type="button"
              onClick={() => removeAwards(idx)}
              className="bg-red-600 text-white p-1 md:p-2 h-max rounded-md mt-auto mb-1 md:mt-6 md:mx-auto ml-auto"
            >
              <Trash2 size={20} />
            </button>
          ) : (
            <button
              type="button"
              className="hidden md:block bg-white text-white p-2 mt-6 md:mx-auto ml-auto pointer-events-none"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      ))}
    </>
  );
}

EditAwards.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
};

export default EditAwards;
