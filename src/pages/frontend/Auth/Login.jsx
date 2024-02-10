/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "@/widgets/ui/label";
import { Button } from "@/widgets/ui/button";
import { Checkbox } from "@/widgets/ui/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Image from "@/assets/images/MediPulse-auth.png";
import "./auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };
  return (
    <div className="_auth-container">
      <div className="_authDv1"></div>
      <div className="_authDv2">
        <form onSubmit={handleFormSubmit} className="text-primary rounded-md">
          <div className="text-center mb-10">
            <h1 className="text-[32px] md:text-[42px]">Welcome Back!</h1>
            <p className="text-xs md:text-base mt-2">
              Enter your email and password to access your account
            </p>
          </div>
          <div className="my-5">
            <Label className="block mb-3 font-bold">Email</Label>
            <input
              type="text"
              name="email"
              placeholder="Enter your Email"
              className="bg-blue-50 border border-transparent w-full p-2 md:p-3 rounded-md outline-none focus:border-secondary"
            />
          </div>
          <div className="my-3">
            <Label className="block mb-3 font-bold">Password</Label>
            <input
              type={`password`}
              name="password"
              placeholder="Enter your Password"
              className="bg-blue-50 border border-transparent w-full p-2 md:p-3 rounded-md outline-none focus:border-secondary"
            />
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
