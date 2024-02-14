import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { UploadCloud } from "lucide-react";
import AuthContext from "@/contexts/AuthContext";
import useAxios from "@/services/useAxios";
import { apiUrl } from "@/services/constants";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/widgets/ui/select";
import DatePicker from "@/widgets/common/DatePicker";
import Board from "@/components/frontend/Board/Board";
import { BLOOD_GROUPS } from "@/services/constants";
import { formatDate } from "@/func/days";
import Loader from "@/components/frontend/Loader/Loader";
import { ErrorInfo, LoadSpinner } from "@/components/Icons";
import { updateUserInfo } from "@/redux/actions/userActions";
import "./profile.css";

function Profile() {
  const api = useAxios();
  const { userData } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: 0,
    picture: null,
    DOB: "",
    blood_group: "",
    gender: "Male",
    city: "",
    state: "",
  });
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    api
      .get(`contexts/patientInfo/${userData?.user_id}`)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch(() => {});
    // eslint-disable-next-line
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, picture: file });
  };
  const validateForm = () => {
    let errors = {};
    if (formData.first_name.length < 3) {
      errors.first_name = "First Name must be between 3 and 20 characters.";
    }
    if (formData.phone === null) {
      errors.phone = "Phone must have be 10 characters.";
    } else if (formData.phone.length < 10) {
      errors.phone = "Phone must have be 10 characters.";
    }
    if (formData.city.length < 3) {
      errors.city = "City must have atleast 3 characters.";
    }
    if (formData.state.length < 3) {
      errors.state = "State must have atleast 3 characters.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let valid = validateForm();
    if (valid) {
      setIsSubmitting(true);
      let newFormData = new FormData();
      newFormData.append("first_name", formData?.first_name);
      newFormData.append("last_name", formData?.last_name);
      newFormData.append("phone", formData?.phone);
      newFormData.append("blood_group", formData?.blood_group);
      newFormData.append("DOB", formData?.DOB);
      newFormData.append("city", formData?.city);
      newFormData.append("state", formData?.state);
      if (typeof formData?.picture !== "string") {
        newFormData.append("picture", formData?.picture);
      }
      api
        .put(`contexts/patientInfo/${formData?.id}`, newFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          dispatch(updateUserInfo(response.data));
          setIsSubmitting(false);
        })
        .catch(() => {
          setIsSubmitting(false);
        });
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Board>
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
              src={URL.createObjectURL(formData?.picture)}
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
              Allowed JPG or PNG. Max size of 20MB
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative my-2">
            <Label className="mb-1">First Name</Label>
            <Input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              autoComplete="off"
              maxLength={20}
              className="focus:border-sky-200"
            />
            {formErrors.first_name && (
              <small className="block text-red-600 mt-1 mx-1">
                <ErrorInfo /> {formErrors.first_name}
              </small>
            )}
          </div>
          <div className="relative my-2">
            <Label className="mb-1">Last Name</Label>
            <Input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              autoComplete="off"
              maxLength={20}
              className="focus:border-sky-200"
            />
            {formErrors.last_name && (
              <small className="block text-red-600 mt-1 mx-1">
                <ErrorInfo /> {formErrors.last_name}
              </small>
            )}
          </div>
          <div className="relative my-2">
            <Label className="mb-1 block">Date of Birth</Label>
            <DatePicker
              onChange={(e) => console.log(formatDate(e))}
              isMax={true}
            />
          </div>
          <div className="relative my-2">
            <Label className="mb-1">Blood Group</Label>
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
                {BLOOD_GROUPS.map((blood, index) => (
                  <SelectItem key={index} value={blood}>
                    {blood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="relative my-2">
            <Label className="mb-1">Email ID</Label>
            <Input
              className="focus:border-sky-200 text-gray-700 font-bold"
              readOnly={true}
              value={userData?.email}
            />
          </div>
          <div className="relative my-2">
            <Label className="mb-1">Mobile</Label>
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
            <Label className="mb-1">City</Label>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              autoComplete="off"
              maxLength={20}
              className="focus:border-sky-200"
            />
            {formErrors.city && (
              <small className="block text-red-600 mt-1 mx-1">
                <ErrorInfo /> {formErrors.city}
              </small>
            )}
          </div>
          <div className="relative my-2">
            <Label className="mb-1">State</Label>
            <Input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              autoComplete="off"
              maxLength={20}
              className="focus:border-sky-200"
            />
            {formErrors.state && (
              <small className="block text-red-600 mt-1 mx-1">
                <ErrorInfo /> {formErrors.state}
              </small>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2 px-3 mt-3 bg-green-500 text-white rounded-md font-bold text-sm w-[130px]"
        >
          {isSubmitting ? <LoadSpinner /> : "Save Changes"}
        </button>
      </form>
    </Board>
  );
}

export default Profile;
