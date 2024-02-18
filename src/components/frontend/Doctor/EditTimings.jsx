/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/widgets/ui/dialog";

function AddTimings() {
  const [formData, setFormData] = useState([]);
  return (
    <Dialog>
      <DialogTrigger>Add</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900">
            Add Time Slots
          </DialogTitle>
          <DialogDescription className="grid grid-cols-3"></DialogDescription>
          <DialogFooter>
            <DialogClose className="bg-zinc-600 text-white px-3 py-1 rounded-md text-sm">
              Close
            </DialogClose>
            <button className="bg-ternary text-white px-3 py-1 rounded-md">
              Save
            </button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddTimings;
