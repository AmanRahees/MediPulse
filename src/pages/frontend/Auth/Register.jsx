/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "@/widgets/ui/label";
import { Button } from "@/widgets/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/widgets/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/widgets/ui/dialog";
import OtpInput from "react-otp-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Image from "@/assets/images/MediPulse-auth.png";

function Register() {
  const [role, setRole] = useState("Patient");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
    role: role,
    picture: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };
  const handlePictureChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    console.log("d", file);
    setFormData({ ...formData, [name]: file });
  };
  return (
    <div className="_auth-container">
      <div className="_authDv1">
        <img src={Image} alt="" />
      </div>
      <div className="_authDv2">
        <form onSubmit={handleFormSubmit} className="text-primary rounded-md">
          <div className="text-center mb-5">
            <h1 className="text-[28px] md:text-[42px]">Create Your Account</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setRole("Patient")}
              type="button"
              className={`w-1/2 rounded-md ${
                role === "Patient" ? "bg-primary text-white" : "bg-blue-50"
              } py-2`}
            >
              Patient
            </button>
            <button
              onClick={() => setRole("Doctor")}
              type="button"
              className={`w-1/2 rounded-md ${
                role === "Doctor" ? "bg-primary text-white" : "bg-blue-50"
              } py-2`}
            >
              Doctor
            </button>
          </div>
          <div className="my-5">
            <Label className="block mb-3 font-bold">Full Name</Label>
            <input
              type="text"
              name="username"
              placeholder="Enter your Full Name"
              className="bg-blue-50 border border-transparent w-full p-2 md:p-3 rounded-md outline-none focus:border-secondary"
            />
          </div>
          <div className="my-5">
            <Label className="block mb-3 font-bold">Email</Label>
            <div className="flex gap-2">
              <input
                type="text"
                name="email"
                placeholder="Enter your Email"
                className="bg-blue-50 border border-transparent w-full p-2 md:p-3 rounded-md outline-none focus:border-secondary"
              />
              <OtpBox />
            </div>
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
            <div className="flex justify-center items-center gap-2 w-max">
              <Label>Picutre:</Label>
              <div className="relative border border-gray-300 border-dashed w-12 h-12 flex justify-center items-center rounded-full overflow-hidden">
                <input
                  type="file"
                  name="picture"
                  onChange={handlePictureChange}
                  className="absolute opacity-0 z-10 h-full w-full cursor-pointer"
                />
                {formData.picture === null ? (
                  <>
                    <FontAwesomeIcon icon={faCamera} />
                    <span className="block absolute top-1 right-2 pointer-events-none -z-10">
                      +
                    </span>
                  </>
                ) : (
                  <img
                    src={URL.createObjectURL(formData.picture)}
                    alt={formData.picture.name}
                    className="aspect-square"
                  />
                )}
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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

function OtpBox() {
  const [otp, setOtp] = useState(0);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white py-6 hover:bg-secondary">
          Verify
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex justify-center">
            <img
              src="https://cdn.icon-icons.com/icons2/1880/PNG/512/iconfinder-security-4341326_120558.png"
              alt=""
              className="w-[80px]"
            />
          </div>
          <DialogDescription className="text-center">
            Enter the 6 digit code send to{" "}
            <span className="font-bold text-secondary">aman@gmail.com</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="p-1"></span>}
            inputStyle={{
              width: "50px",
              height: "50px",
              border: "1px solid #999",
              padding: "5px",
              outline: "none",
              borderRadius: "6px",
            }}
            inputType="number"
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <DialogFooter>
          <button
            type="button"
            onClick={() => console.log(typeof parseInt(otp, 10), otp)}
            className="bg-secondary text-white py-2 px-3 rounded-md"
          >
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
