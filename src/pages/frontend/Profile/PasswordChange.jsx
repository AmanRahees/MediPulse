/* eslint-disable no-unused-vars */
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/widgets/ui/alert";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import Board from "@/components/frontend/Board/Board";

function PasswordChange() {
  return (
    <Board>
      <form>
        <Alert className="border-0 bg-yellow-50 text-yellow-600">
          <AlertTriangle className="h-4 w-4" color="#ca8a04" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Changing your password will result in an automatic logout. Please
            ensure you have access to your email or contact support if you
            encounter any issues during the process.
          </AlertDescription>
        </Alert>
        <div className="relative my-4">
          <Label className="">Old Password</Label>
          <Input
            type="password"
            className="w-full md:w-[350px] focus:border-sky-200"
          />
        </div>
        <div className="relative my-4">
          <Label className="">New Password</Label>
          <Input
            type="password"
            className="w-full md:w-[350px] focus:border-sky-200"
          />
        </div>
        <div className="relative my-4">
          <Label className="">Confirm Password</Label>
          <Input
            type="password"
            className="w-full md:w-[350px] focus:border-sky-200"
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 text-sm bg-green-500 text-white rounded-md"
        >
          Save Changes
        </button>
      </form>
    </Board>
  );
}

export default PasswordChange;
