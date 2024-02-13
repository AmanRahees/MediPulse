import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/widgets/ui/input";
import { Textarea } from "@/widgets/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/widgets/ui/dialog";
import useAxios from "@/services/useAxios";

const ErrorInfo = () => {
  return <FontAwesomeIcon icon={faCircleInfo} />;
};

const AddSpecialityForm = ({ setSpecialities }) => {
  const api = useAxios();
  const dialogCloseRef = useRef(null);
  const [formData, setFormData] = useState({
    speciality_name: "",
    speciality_image: null,
    description: "NA",
  });
  const [formErrors, setFormErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };
  const handleInputFile = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
    setFormErrors({ ...formErrors, speciality_image: "" });
  };
  const validateForm = () => {
    let errors = {};
    if (formData.speciality_name.length < 5) {
      errors.speciality_name =
        "Speciality name must have at least 5 characters.";
    }
    if (
      formData.speciality_image === null ||
      formData.speciality_image === undefined
    ) {
      errors.speciality_image = "Please upload an image for the specialty.";
    }
    if (formData.description === "") {
      errors.description = "Description cannot be null.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const resetFormData = () => {
    setFormData({
      speciality_name: "",
      speciality_image: null,
      description: "NA",
    });
    setFormErrors({});
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      api
        .post("admin/speciality", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setSpecialities((prevSpecialities) => [
            ...prevSpecialities,
            response.data,
          ]);
          resetFormData();
          dialogCloseRef.current.click();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-main text-white px-3 py-1 rounded-md">
          + Add
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Speciality</DialogTitle>
        </DialogHeader>
        <hr />
        <form onSubmit={handleFormSubmit}>
          <div className="flex gap-2">
            <label className="w-[100px] text-sm mt-3">Speciality</label>
            <div className="w-full">
              <input
                type="text"
                name="speciality_name"
                value={formData.speciality_name}
                onChange={handleInputChange}
                maxLength={25}
                className="p-2 w-full border border-gray-300 outline-none rounded-md"
              />
              <small className="block text-red-600 my-1">
                {formErrors.speciality_name && <ErrorInfo />}{" "}
                {formErrors.speciality_name}
              </small>
            </div>
          </div>
          <div className="flex gap-2 my-2">
            <label className="w-[100px] text-sm mt-2">Image</label>
            <div className="w-full">
              <Input
                type="file"
                name="speciality_image"
                onChange={handleInputFile}
                className="p-2 w-full border border-gray-300 outline-none rounded-md"
              />
              <small className="block text-red-600 my-1">
                {formErrors.speciality_image && <ErrorInfo />}{" "}
                {formErrors.speciality_image}
              </small>
            </div>
          </div>
          <div className="flex gap-2 my-2">
            <label className="w-[100px] text-sm mt-2">Description</label>
            <div className="w-full">
              <Textarea
                name="description"
                onChange={handleInputChange}
                value={formData.description}
                className="p-2 w-full border border-gray-300 outline-none rounded-md resize-none"
              />
              <small className="block text-red-600 my-1">
                {formErrors.description && <ErrorInfo />}{" "}
                {formErrors.description}
              </small>
            </div>
          </div>
          <DialogFooter>
            <button
              type="submit"
              className="bg-main text-white py-1 px-3 rounded-md mt-2"
            >
              Save
            </button>
            <DialogClose ref={dialogCloseRef} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

AddSpecialityForm.propTypes = {
  setSpecialities: PropTypes.func.isRequired,
};

export default AddSpecialityForm;
