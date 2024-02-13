/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { Info, Eye, EyeOff } from "lucide-react";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "@/contexts/AuthContext";
import "./login.css";

const ErrorInfo = () => {
  return <FontAwesomeIcon icon={faCircleInfo} />;
};

function Login() {
  const { AdminLogin, error } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(formData.email));
  }, [formData.email]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };
  const validateForm = () => {
    let errors = {};
    if (!isEmailValid) {
      errors.email = "Please enter a valid email address.";
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
      AdminLogin(formData.email, formData.password, setIsSubmitting);
    }
  };
  return (
    <div className="admAuthBox">
      <form onSubmit={handleFormSubmit} className="adminAuthForm">
        <h1 className="text-3xl text-center">Login</h1>
        <span className={`block text-red-600 text-center mt-3 bg-red-100`}>
          {error}
        </span>
        <div className="my-5">
          <Label className="block mb-2">Email</Label>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="off"
            className="border border-gray-300"
          />
          <small className="block text-red-600 my-1">
            {formErrors.email && <ErrorInfo />} {formErrors.email}
          </small>
        </div>
        <div className="my-5">
          <Label className="block mb-2">Password</Label>
          <div className="relative">
            <Input
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              maxLength={20}
              autoComplete="off"
              className="border border-gray-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {!showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
            </button>
          </div>
          <small className="block text-red-600 my-1">
            {formErrors.password && <ErrorInfo />} {formErrors.password}
          </small>
        </div>
        <button
          disabled={isSubmitting}
          className="w-full bg-main text-white py-2 text-sm rounded-md"
        >
          {isSubmitting ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            <span>Submit &rarr;</span>
          )}
        </button>
        <p className="flex justify-center items-center gap-1 my-3 text-sm">
          <Info size={18} />
          Authorized Administrators Only!
        </p>
      </form>
    </div>
  );
}

export default Login;
