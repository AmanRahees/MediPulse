/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/widgets/ui/alert-dialog";

function ExpiredAlert() {
  const navigate = useNavigate();
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <div className="flex items-start gap-5">
          <p className="p-3 bg-yellow-200 rounded-full">
            <AlertTriangle className="text-yellow-600" size={20} />
          </p>
          <div className="">
            <h1 className="text-lg">You Token has Expired</h1>
            <p className="text-gray-600 text-sm md:text-sm">
              Would you like to continue without logging in, or log in again?
            </p>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="">Continue</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => navigate("/login")}
            className="bg-white text-gray-700 border hover:bg-slate-50"
          >
            Login
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ExpiredAlert;
