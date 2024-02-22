import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/widgets/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/widgets/ui/dialog";
import OtpInput from "react-otp-input";
import axiosInstance from "@/services/axios";
import VerificationImg from "@/assets/images/verify.png";
import { DialogClose } from "@radix-ui/react-dialog";

function OtpBox({ email, setIsVerified, isEmailValid }) {
  const [otp, setOtp] = useState(0);
  const [obj, setObj] = useState(0);
  const [error, setError] = useState("");
  const [is409, setIs409] = useState(false);
  const handleVerification = (value) => {
    if (otp.length === 6) {
      axiosInstance
        .put(`accounts/verify/${obj}`, { otp: value })
        .then((response) => {
          if (response.status === 202) {
            setIsVerified(true);
          }
        })
        .catch(() => {
          setError("Invalid OTP!");
        });
    } else {
      setError("OTP should be 6 digits!");
    }
  };
  const handleSendOtp = () => {
    setIs409(false);
    setError("");
    axiosInstance
      .post("accounts/verify", { email: email })
      .then((response) => {
        if (response.status === 200) {
          setObj(response.data.obj);
        } else if (response.status === 208) {
          setIsVerified(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setError("This Email already Registered!");
          setIs409(true);
        }
      });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={!isEmailValid}
          onClick={handleSendOtp}
          className="bg-ternary text-white py-6 hover:bg-secondary"
        >
          Verify
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex justify-center">
            <img src={VerificationImg} alt="" className="w-[120px]" />
          </div>
          {!is409 && (
            <DialogDescription className="text-center">
              Enter the 6 digit code send to{" "}
              <span className="font-bold text-primary">{email}</span>
            </DialogDescription>
          )}
          {is409 && (
            <span className="block text-red-600 text-center">{error}</span>
          )}
        </DialogHeader>
        {!is409 && (
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
        )}
        <DialogFooter>
          {!is409 ? (
            <button
              type="button"
              onClick={() => handleVerification(parseInt(otp, 10))}
              className="bg-secondary text-white py-2 px-3 rounded-md"
            >
              Submit
            </button>
          ) : (
            <DialogClose className="bg-primary text-white py-2 px-3 rounded-md text-sm">
              Close
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

OtpBox.propTypes = {
  email: PropTypes.string.isRequired,
  isEmailValid: PropTypes.bool.isRequired,
  setIsVerified: PropTypes.func.isRequired,
};

export default OtpBox;
