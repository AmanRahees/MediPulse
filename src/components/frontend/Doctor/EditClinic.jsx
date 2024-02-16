import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import {
  RequiredStar,
  ErrorInfo,
  FileUpload,
  FileTrash,
} from "@/components/Icons";

function EditClinic({
  formData,
  setFormData,
  handleInputChange,
  formErrors,
  setFormErrors,
}) {
  const inputRef = useRef(null);
  const [uploads, setUploads] = useState(formData.clinic_images || []);
  const handleImageUploads = (e) => {
    const file = e.target.files[0];
    var maxSize = 3 * 1024 * 1024;
    inputRef.current.value = null;
    if (file.size > maxSize) {
      let error = {};
      error.clinic_images = "Choosen image is larger than 5MB.";
      setFormErrors(error);
    } else {
      setUploads([...uploads, file]);
      setFormData({ ...formData, clinic_images: [...uploads, file] });
    }
  };
  const handlePopImage = (idx) => {
    const _Uploads = uploads.filter((_, index) => index !== idx);
    setUploads(_Uploads);
    setFormData({ ...formData, clinic_images: _Uploads });
  };
  return (
    <>
      <p className="font-bold text-xl mt-5">Clinic Info</p>
      <hr className="my-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative my-2">
          <Label className="mb-1">
            Clinic Name <RequiredStar />
          </Label>
          <Input
            className="focus:border-sky-200"
            name="clinic_name"
            value={formData?.clinic_name || ""}
            onChange={handleInputChange}
          />
          {formErrors.clinic_name && (
            <small className="block text-red-600 mt-1 mx-1">
              <ErrorInfo /> {formErrors.clinic_name}
            </small>
          )}
        </div>
        <div className="relative my-2">
          <Label className="mb-1">
            Clinic Address <RequiredStar />
          </Label>
          <Input
            className="focus:border-sky-200"
            name="clinic_address"
            value={formData?.clinic_address || ""}
            onChange={handleInputChange}
          />
          {formErrors.clinic_address && (
            <small className="block text-red-600 mt-1 mx-1">
              <ErrorInfo /> {formErrors.clinic_address}
            </small>
          )}
        </div>
      </div>
      <div className="relative my-2">
        <div className="relative grid place-items-center w-full h-[160px] border rounded-md">
          <Input
            type="file"
            name="clinic_images"
            onChange={handleImageUploads}
            ref={inputRef}
            accept="image/*"
            className="absolute h-full w-full opacity-0 uploads-hidden"
          />
          <p className="flex flex-col">
            <span className="text-5xl text-center text-gray-700">
              <FileUpload />
            </span>
            <small className="">Drop files here to upload</small>
          </p>
        </div>
        {formErrors.clinic_images && (
          <small className="block text-red-600 mt-1 mx-1">
            <ErrorInfo /> {formErrors.clinic_images}
          </small>
        )}
        <div className="flex gap-3 my-2">
          {uploads.map((image, idx) => (
            <div className="relative" key={idx}>
              <button
                type="button"
                onClick={() => handlePopImage(idx)}
                className="absolute top-1 right-1"
              >
                <FileTrash />
              </button>
              <img
                src={
                  typeof image === "string"
                    ? "https://doccure.dreamstechnologies.com/html/template/assets/img/features/feature-01.jpg"
                    : URL.createObjectURL(image)
                }
                alt="clinic image"
                className="w-20 aspect-square border rounded-md bg-zinc-100"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

EditClinic.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
  setFormErrors: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default EditClinic;
