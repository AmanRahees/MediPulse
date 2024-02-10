/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Label } from "@/widgets/ui/label";
import { Button } from "@/widgets/ui/button";
import { Checkbox } from "@/widgets/ui/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "@/contexts/AuthContext";
import "./auth.css";

const ErrorInfo = () => {
  return <FontAwesomeIcon icon={faCircleInfo} />;
};

function Login() {
  const { UserLogin, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      UserLogin(formData.email, formData.password, setIsSubmitting);
    }
  };
  return (
    <div className="_auth-container">
      <div className="_authDv1"></div>
      <div className="_authDv2">
        <form onSubmit={handleFormSubmit} className="text-primary rounded-md">
          <div className="text-center mb-5">
            <h1 className="text-[32px] md:text-[42px]">Welcome Back!</h1>
            <p className="text-xs md:text-base mt-2">
              Enter your email and password to access your account
            </p>
          </div>
          <span className={`block text-red-600 text-center`}>{error}</span>
          <div className="my-5">
            <Label className="block mb-3 font-bold">Email</Label>
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email"
              onChange={handleInputChange}
              value={formData.email}
              className="bg-blue-50 border border-sky-100 w-full p-2 md:p-3 rounded-md outline-none focus:border-secondary"
            />
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
              placeholder="Enter Password"
              className="bg-blue-50 border border-sky-100 w-full p-2 md:p-3 rounded-md outline-none focus:border-secondary"
            />
            <small className="block text-red-600 my-1">
              {formErrors.password && <ErrorInfo />} {formErrors.password}
            </small>
          </div>
          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-2">
              <Checkbox id="remember_me" />
              <Label htmlFor="remember_me">Remember Me</Label>
            </div>
            <Link className="font-bold text-sm">Forgot Password?</Link>
          </div>
          <Button
            className="bg-primary w-full hover:bg-sky-950"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-secondary text-sm text-center mt-3">
            {"Don't have account?"}{" "}
            <Link to="/register" className="font-bold">
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
