/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { UploadCloud } from "lucide-react";
import AuthContext from "@/contexts/AuthContext";
import useAxios from "@/services/useAxios";
import { apiUrl } from "@/services/constants";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import { Textarea } from "@/widgets/ui/textarea";
import TagsInput from "@/widgets/common/TagsInput";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/widgets/ui/select";
import Board from "@/components/frontend/Board/Board";
import Loader from "@/components/frontend/Loader/Loader";
import { updateUserInfo } from "@/redux/actions/userActions";
import { ErrorInfo, LoadSpinner, RequiredStar } from "@/components/Icons";
import EditClinic from "@/components/frontend/Doctor/EditClinic";
import EditEducation from "@/components/frontend/Doctor/EditEducation";
import EditExperience from "@/components/frontend/Doctor/EditExperience";
import EditAwards from "@/components/frontend/Doctor/EditAwards";

const EditProfile = () => {
  const api = useAxios();
  const { userData } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    api
      .get(`contexts/doctorInfo/${userData?.user_id}`)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch(() => {});
    // eslint-disable-next-line
  }, [dispatch, userData]);
  if (loading) {
    return <Loader />;
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    var maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        picture: "Chosen image is larger than 5MB.",
      }));
    } else {
      setFormData({ ...formData, picture: file });
      setFormErrors({ ...formErrors, picture: "" });
    }
  };
  const handleServiceTagChange = (services) => {
    setFormData({ ...formData, services });
  };
  const validateForm = () => {
    let errors = {};
    if (formData.name.length < 1) {
      errors.name = "This field is Required.";
    }
    if (formData.phone === null) {
      errors.phone = "Phone must have 10 characters.";
    } else if (formData.phone.length < 10) {
      errors.phone = "Phone must have 10 characters.";
    }
    if (formData.consultation_fee < 300) {
      errors.consultation_fee = "Consultation Fee must be atleast 300.";
    }
    if (formData.location.length < 1) {
      errors.location = "This field is Required.";
    }
    if (formData.services.length < 1) {
      errors.services = "Please add at least a service.";
    }
    if (!formData.clinic_name || formData.clinic_name.trim() === "") {
      errors.clinic_name = "Clinic name is required.";
    }

    if (!formData.clinic_address || formData.clinic_address.trim() === "") {
      errors.clinic_address = "Clinic address is required.";
    }

    if (!formData.clinic_images || formData.clinic_images.length < 2) {
      errors.clinic_images = "Please upload at least 2 images of the clinic.";
    }

    const validatedEducation = formData.education.filter((education) => {
      return (
        education.degree.trim() !== "" ||
        education.institute.trim() !== "" ||
        education.date_from.trim() !== "" ||
        education.date_to.trim() !== ""
      );
    });

    formData.education = validatedEducation;

    validatedEducation.forEach((education, index) => {
      if (education.degree.trim() === "") {
        errors[`education${index}_degree`] = "Degree is required.";
      }
      if (education.institute.trim() === "") {
        errors[`education${index}_institute`] = "Institute is required.";
      }
      if (
        education.date_from.trim() === "" ||
        education.date_to.trim() === ""
      ) {
        errors[`education${index}_dates`] =
          "Both from and to dates are required.";
      }
    });

    const validatedExperience = formData.experience.filter((experience) => {
      return (
        experience.hospital_name.trim() !== "" ||
        experience.position.trim() !== "" ||
        experience.date_from.trim() !== "" ||
        experience.date_to.trim() !== ""
      );
    });

    formData.experience = validatedExperience;

    validatedExperience.forEach((experience, index) => {
      if (experience.hospital_name.trim() === "") {
        errors[`experience${index}_hospital_name`] =
          "Hospital Name is required.";
      }
      if (experience.position.trim() === "") {
        errors[`experience${index}_position`] = "Position is required.";
      }
      if (experience.present === true) {
        if (experience.date_from.trim() === "") {
          errors[`experience${index}_dates`] = "Started date is required.";
        }
      } else {
        if (
          experience.date_from.trim() === "" ||
          experience.date_to.trim() === ""
        ) {
          errors[`experience${index}_dates`] =
            "Both from and to dates are required.";
        }
      }
    });

    const validatedAwards = formData.awards.filter((award) => {
      return award.award_name.trim() !== "" || award.award_year.trim() !== "";
    });

    formData.awards = validatedAwards;

    validatedAwards.forEach((award, index) => {
      if (award.award_name.trim() === "") {
        errors[`award${index}_award_name`] = "Award Name is required.";
      }
      if (award.award_year.trim() === "") {
        errors[`award${index}_award_year`] = "Year won is required.";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let valid = validateForm();
    if (valid) {
      setIsSubmitting(true);
      api
        .put(`contexts/doctorInfo/${formData?.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          dispatch(updateUserInfo(response.data));
          setIsSubmitting(false);
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.log(error.response);
        });
    }
    console.log("d: ", formData);
  };
  return (
    <Board>
      <div className="relative">
        <p className="font-bold text-xl mb-2">Basic Information</p>
        <form onSubmit={handleFormSubmit}>
          <div className="flex items-center gap-3">
            {typeof formData.picture === "string" ? (
              <img
                src={
                  formData?.picture
                    ? `${apiUrl + formData.picture}`
                    : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                }
                alt="picture"
                className="w-[100px] aspect-square rounded-full border"
              />
            ) : (
              <img
                src={
                  formData?.picture && URL.createObjectURL(formData?.picture)
                }
                alt="picture"
                className="w-[100px] aspect-square rounded-full border"
              />
            )}
            <div>
              <div className="relative text-center overflow-hidden w-max bg-secondary rounded-md py-2 px-5 *:cursor-pointer">
                <p className="flex items-center gap-2 text-white text-sm">
                  <UploadCloud size={20} /> Upload
                </p>
                <Input
                  type="file"
                  name="picture"
                  onChange={handleImageChange}
                  className="absolute w-[500px] h-full top-0 -left-32 opacity-0"
                />
              </div>
              <Label className="text-zinc-600 text-xs mt-1">
                Allowed JPG or PNG. Max size of 5MB
              </Label>
              {formErrors.picture && (
                <small className="block text-red-600 mt-1 mx-1">
                  <ErrorInfo /> {formErrors.picture}
                </small>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative my-2">
              <Label className="mb-1">
                Name <RequiredStar />
              </Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                autoComplete="off"
                maxLength={20}
                className="focus:border-sky-200"
              />
              {formErrors.name && (
                <small className="block text-red-600 mt-1 mx-1">
                  <ErrorInfo /> {formErrors.name}
                </small>
              )}
            </div>
            <div className="relative my-2">
              <Label className="mb-1">
                Speciality <RequiredStar />
              </Label>
              <Select
                name="blood_group"
                defaultValue={formData.blood_group}
                onValueChange={(e) =>
                  setFormData({ ...formData, blood_group: e })
                }
              >
                <SelectTrigger className="focus:outline-none">
                  <SelectValue placeholder="Select your Blood Group" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((blood, index) => (
                    <SelectItem key={index} value={blood}>
                      {blood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative my-2">
              <Label className="mb-1">
                Phone <RequiredStar />
              </Label>
              <Input
                type="number"
                name="phone"
                value={formData.phone || ""}
                onChange={handleInputChange}
                autoComplete="off"
                className="focus:border-sky-200"
              />
              {formErrors.phone && (
                <small className="block text-red-600 mt-1 mx-1">
                  <ErrorInfo /> {formErrors.phone}
                </small>
              )}
            </div>
            <div className="relative my-2">
              <Label className="mb-1">
                Consultation Fee <RequiredStar />
              </Label>
              <Input
                type="number"
                name="consultation_fee"
                value={formData.consultation_fee}
                onChange={handleInputChange}
                autoComplete="off"
                className="focus:border-sky-200"
              />
              {formErrors.consultation_fee && (
                <small className="block text-red-600 mt-1 mx-1">
                  <ErrorInfo /> {formErrors.consultation_fee}
                </small>
              )}
            </div>
            <div className="relative my-2">
              <Label className="mb-1">
                Location <RequiredStar />
              </Label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                autoComplete="off"
                className="focus:border-sky-200"
              />
              {formErrors.location && (
                <small className="block text-red-600 mt-1 mx-1">
                  <ErrorInfo /> {formErrors.location}
                </small>
              )}
            </div>
            <div className="relative my-2">
              <Label className="mb-1">Gender</Label>
              <Select
                name="gender"
                defaultValue={formData.gender}
                onValueChange={(e) => setFormData({ ...formData, gender: e })}
              >
                <SelectTrigger className="focus:outline-none">
                  <SelectValue placeholder="Select your Gender" />
                </SelectTrigger>
                <SelectContent>
                  {["Male", "Female"].map((gender, index) => (
                    <SelectItem key={index} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="relative my-2">
            <Label className="mb-1">
              Services <RequiredStar />
            </Label>
            <TagsInput
              handleTagChange={handleServiceTagChange}
              value={formData?.services}
              max={5}
              placeholder="Enter Services"
            />
            <span className="text-gray-500 text-xs">
              Note : Type & Press enter to add new services
            </span>
            {formErrors.services && (
              <small className="block text-red-600 mt-1 mx-1">
                <ErrorInfo /> {formErrors.services}
              </small>
            )}
          </div>
          <div className="relative my-2">
            <Label className="mb-1">
              About Me <RequiredStar />
            </Label>
            <Textarea
              className="resize-none focus:border-sky-200"
              name="about"
              value={formData?.about}
              onChange={handleInputChange}
            />
            {formErrors.about && (
              <small className="block text-red-600 mt-1 mx-1">
                <ErrorInfo /> {formErrors.about}
              </small>
            )}
          </div>
          <EditClinic
            handleInputChange={handleInputChange}
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
          />
          <EditEducation
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />
          <EditExperience
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />
          <EditAwards
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-2 px-3 mt-3 bg-green-500 text-white rounded-md font-bold text-sm w-[130px]"
          >
            {isSubmitting ? <LoadSpinner /> : "Save Changes"}
          </button>
        </form>
      </div>
    </Board>
  );
};

export default EditProfile;
