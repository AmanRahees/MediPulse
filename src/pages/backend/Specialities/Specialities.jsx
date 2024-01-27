/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/widgets/ui/input";
import { Checkbox } from "@/widgets/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/widgets/ui/dialog";
import Layout from "@/components/backend/Layout/Layout";
import Breadcrumb from "@/components/backend/Elements/Breadcrumb";

function Specialities() {
  const pathToPage = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      title: "Specialities",
      path: "/admin/specialities",
    },
  ];
  return (
    <Layout>
      <h1 className="pageHeading_">Specialities</h1>
      <Breadcrumb pathToPage={pathToPage} />

      <div className="flex justify-end my-3">
        <AddSpecialityForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 my-3">
        <div className="flex items-start gap-2 bg-white p-3 rounded-2xl border h-[150px]">
          <div className="flex justify-center items-center w-1/3 bg-slate-100 h-full rounded-2xl border">
            <img
              src="https://doccure.dreamstechnologies.com/html/template/admin/assets/img/specialities/specialities-04.png"
              alt=""
              className="w-[80px]"
            />
          </div>
          <div className="w-2/3 h-full relative">
            <span className="flex justify-end">
              <Checkbox className="data-[state=checked]:bg-main data-[state=checked]:border-main border-gray-400" />
            </span>
            <label className="">Speciality : </label>
            <span className="font-bold">Cardiology</span>
            <div className="absolute bottom-3 right-3 flex gap-1">
              <EditSpecialityForm />
              <DeleteSpeciality />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Specialities;

const AddSpecialityForm = () => {
  const [formData, setFormData] = useState({
    speciality_name: "",
    image: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleInputFile = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-main text-white px-3 py-1 rounded-md">
          + Add
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Speciality</DialogTitle>
        </DialogHeader>
        <hr />
        <form onSubmit={handleFormSubmit}>
          <div className="flex items-center gap-2">
            <label className="w-[100px]">Speciality</label>
            <input
              type="text"
              name="speciality_name"
              value={formData.speciality_name}
              onChange={handleInputChange}
              className="p-2 w-full border border-gray-300 outline-none rounded-md"
            />
          </div>
          <div className="flex items-center gap-2 my-2">
            <label className="w-[100px]">Image</label>
            <Input
              type="file"
              name="image"
              onChange={handleInputFile}
              className="p-2 w-full border border-gray-300 outline-none rounded-md"
            />
          </div>
          <DialogFooter>
            <button
              type="submit"
              className="bg-main text-white py-1 px-3 rounded-md mt-2"
            >
              Save
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const EditSpecialityForm = () => {
  const [formData, setFormData] = useState({
    speciality_name: "",
    image: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleInputFile = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-600 hover:bg-blue-600 hover:text-white rounded-md w-[30px] h-[30px] text-xs">
          <FontAwesomeIcon icon={faPen} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Speciality</DialogTitle>
        </DialogHeader>
        <hr />
        <form onSubmit={handleFormSubmit}>
          <div className="flex items-center gap-2">
            <label className="w-[100px]">Speciality</label>
            <input
              type="text"
              name="speciality_name"
              value={formData.speciality_name}
              onChange={handleInputChange}
              className="p-2 w-full border border-gray-300 outline-none rounded-md"
            />
          </div>
          <div className="flex items-center gap-2 my-2">
            <label className="w-[100px]">Image</label>
            <Input
              type="file"
              name="image"
              onChange={handleInputFile}
              className="p-2 w-full border border-gray-300 outline-none rounded-md"
            />
          </div>
          <DialogFooter>
            <button
              type="submit"
              className="bg-main text-white py-1 px-3 rounded-md mt-2"
            >
              Save
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const DeleteSpeciality = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-red-600 hover:bg-red-600 hover:text-white rounded-md w-[30px] h-[30px] text-xs">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Speciality</DialogTitle>
        </DialogHeader>
        <hr />
        <p>Do you want to Delete this Speciality?</p>
        <DialogFooter>
          <DialogClose
            type="submit"
            className="border bg-slate-200 py-1 px-3 rounded-md mt-2"
          >
            Cancel
          </DialogClose>
          <button
            type="submit"
            className="bg-main text-white py-1 px-3 rounded-md mt-2"
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
