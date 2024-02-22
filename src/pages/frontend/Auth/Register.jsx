import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/widgets/ui/label";
import { Button } from "@/widgets/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "@/contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/services/axios";
import OtpBox from "./OtpBox";

const ErrorInfo = () => {
  return <FontAwesomeIcon icon={faCircleInfo} />;
};

function Register() {
  const navigate = useNavigate();
  const { setAuthTokens, setUserData } = useContext(AuthContext);
  const [isVerified, setIsVerified] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    role: "patient",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };
  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(formData.email));
  }, [formData.email]);
  const validateForm = () => {
    let errors = {};
    if (formData.username.length < 4 || formData.username.length > 20) {
      errors.username = "Username must be between 4 and 20 characters.";
    }
    if (!isEmailValid) {
      errors.email = "Please enter a valid email address.";
    } else if (!isVerified) {
      errors.email = "Please verify your email.";
    }
    if (formData.password.length < 8) {
      errors.password = "Password must have at least 8 characters.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setIsSubmitting(true);
      axiosInstance
        .post("accounts/register", formData)
        .then((response) => {
          let data = response.data;
          setAuthTokens(data);
          setUserData(jwtDecode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
          setIsSubmitting(false);
          if (formData.role === "doctor") {
            navigate("/doctor/dashboard/profile");
          } else {
            navigate("/");
          }
        })
        .catch(() => {
          setIsSubmitting(false);
        });
    }
  };
  return (
    <div className="_auth-container">
      <div className="_authDv1"></div>
      <div className="_authDv2">
        <form onSubmit={handleFormSubmit} className="text-primary rounded-md">
          <div className="text-center mb-5">
            <h1 className="text-[28px] md:text-[42px]">Create Your Account</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleRoleChange("patient")}
              type="button"
              className={`w-1/2 rounded-md ${
                formData.role === "patient"
                  ? "bg-primary text-white"
                  : "bg-blue-50"
              } py-2`}
            >
              Patient
            </button>
            <button
              onClick={() => handleRoleChange("doctor")}
              type="button"
              className={`w-1/2 rounded-md ${
                formData.role === "doctor"
                  ? "bg-primary text-white"
                  : "bg-blue-50"
              } py-2`}
            >
              Doctor
            </button>
          </div>
          <div className="my-5">
            <Label className="block mb-3 font-bold">Username</Label>
            <input
              type="text"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
              maxLength={20}
              placeholder="Enter Username"
              autoComplete="off"
              className="bg-blue-50 border border-sky-100 w-full p-2 md:p-3 rounded-md outline-none focus:border-secondary"
            />
            <small className="block text-red-600 my-1">
              {formErrors.username && <ErrorInfo />} {formErrors.username}
            </small>
          </div>
          <div className="my-5">
            <Label className="block mb-3 font-bold">Email</Label>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                placeholder="Enter Your Email"
                autoComplete="off"
                className="bg-blue-50 border border-sky-100 w-full p-2 md:p-3 rounded-md outline-none focus:border-secondary"
              />
              {isVerified ? (
                <Button
                  type="button"
                  className="bg-ternary text-white py-6 hover:bg-teal-400 cursor-default"
                >
                  Verified
                </Button>
              ) : (
                <OtpBox
                  email={formData.email}
                  setIsVerified={setIsVerified}
                  isEmailValid={isEmailValid}
                />
              )}
            </div>
            <small className="block text-red-600 my-1">
              {formErrors.email && <ErrorInfo />} {formErrors.email}
            </small>
          </div>
          <div className="my-3">
            <Label className="block mb-3 font-bold">Password</Label>
            <input
              type={`password`}
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              min={8}
              placeholder="Enter Password"
              autoComplete="off"
              className="bg-blue-50 border border-sky-100 w-full p-2 md:p-3 rounded-md outline-none focus:border-secondary"
            />
            <small className="block text-red-600 my-1">
              {formErrors.password && <ErrorInfo />} {formErrors.password}
            </small>
          </div>
          <Button
            className="bg-primary w-full hover:bg-sky-950"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
          <p className="text-secondary text-sm text-center mt-3">
            {"Already have account?"}{" "}
            <Link to="/login" className="font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
