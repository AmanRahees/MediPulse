/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPen,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
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
import { apiUrl } from "@/services/constants";

const ErrorInfo = () => {
  return <FontAwesomeIcon icon={faCircleInfo} />;
};

const EditSpecialityForm = ({ speciality, specialities, setSpecialities }) => {
  const api = useAxios();
  const dialogCloseRef = useRef(null);
  const [formData, setFormData] = useState({
    speciality_name: speciality?.speciality_name || "",
    speciality_image: speciality?.speciality_image || null,
    description: speciality?.description || "NA",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleInputFile = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };
  const validateForm = () => {
    let errors = {};
    if (formData.speciality_name.length < 5) {
      errors.speciality_name =
        "Speciality name must have at least 5 characters.";
    }
    if (formData.description === "") {
      errors.description = "Description cannot be null.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isValid = validateForm();
    if (isValid) {
      api
        .put(`admin/speciality/${speciality.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const updatedData = specialities.map((item) =>
            item.id === speciality?.id ? { ...item, ...response.data } : item
          );
          setSpecialities(updatedData);
          setIsSubmitting(false);
          dialogCloseRef.current.click();
        })
        .catch(() => {
          setIsSubmitting(false);
        });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-600 hover:bg-blue-600 hover:text-white rounded-md w-[30px] h-[30px] text-xs">
          <FontAwesomeIcon icon={faPen} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Speciality</DialogTitle>
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
              <small className="my-1 flex gap-1 text-ellipsis line-clamp-1 ">
                <label className="font-bold text-gray-800">Current:</label>
                <Link
                  to={apiUrl + speciality?.speciality_image}
                  target="_blank"
                  className="text-sky-600"
                >
                  {speciality?.speciality_image}
                </Link>
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
              disabled={isSubmitting}
              className="bg-main text-white py-1 px-3 rounded-md mt-2 w-20"
            >
              {isSubmitting ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : (
                "Save"
              )}
            </button>
            <DialogClose ref={dialogCloseRef} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditSpecialityForm.propTypes = {
  speciality: PropTypes.object.isRequired,
  specialities: PropTypes.array.isRequired,
  setSpecialities: PropTypes.func.isRequired,
};

export default EditSpecialityForm;
