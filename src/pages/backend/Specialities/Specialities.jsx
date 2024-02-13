/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faCircleXmark,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/widgets/ui/input";
import { Textarea } from "@/widgets/ui/textarea";
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
import useAxios from "@/services/useAxios";
import { apiUrl } from "@/services/constants";
import Layout from "@/components/backend/Layout/Layout";
import Loader from "@/components/frontend/Loader/Loader";
import Breadcrumb from "@/components/backend/Elements/Breadcrumb";
import AddSpecialityForm from "./AddSpeciality";
import EditSpecialityForm from "./EditSpeciality";

function Specialities() {
  const api = useAxios();
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
  const [loading, setLoading] = useState(true);
  const [specialites, setSpecialities] = useState([]);
  useEffect(() => {
    api
      .get("admin/speciality")
      .then((response) => {
        setSpecialities(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <Layout>
      <h1 className="pageHeading_">Specialities</h1>
      <Breadcrumb pathToPage={pathToPage} />

      <div className="flex justify-end my-3">
        <AddSpecialityForm setSpecialities={setSpecialities} />
      </div>
      {specialites.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 my-3">
          {specialites.map((speciality, index) => (
            <div
              className="flex items-start gap-2 bg-white p-3 rounded-2xl border h-[150px]"
              key={index}
            >
              <div className="flex justify-center items-center w-1/3 bg-blue-50 h-full rounded-2xl border border-sky-100">
                <img
                  src={apiUrl + speciality.speciality_image}
                  alt=""
                  className="w-[80px]"
                />
              </div>
              <div className="w-2/3 h-full relative">
                <span className="flex justify-end">
                  <Checkbox className="data-[state=checked]:bg-main data-[state=checked]:border-main border-gray-400" />
                </span>
                <h2 className="font-bold text-lg">
                  {speciality.speciality_name}
                </h2>
                <small className="text-ellipsis line-clamp-2">
                  {speciality.description}
                </small>
                <div className="absolute bottom-3 right-3 flex gap-1">
                  <EditSpecialityForm
                    speciality={speciality}
                    specialities={specialites}
                    setSpecialities={setSpecialities}
                  />
                  <DeleteSpeciality
                    speciality={speciality}
                    setSpecialities={setSpecialities}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center my-20">
          <div className="flex flex-col gap-3">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="block text-red-600 text-6xl md:text-8xl"
            />
            No Specialities Found!
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Specialities;

const DeleteSpeciality = ({ speciality, setSpecialities }) => {
  const api = useAxios();
  const dialogCloseRef = useRef(null);
  const onDeleteClick = () => {
    api
      .delete(`admin/speciality/${speciality.id}`)
      .then((response) => {
        console.log(speciality);
        setSpecialities((prevSpecialities) =>
          prevSpecialities.filter((item) => item.id !== speciality?.id)
        );
        dialogCloseRef.current.click();
      })
      .catch(() => {
        dialogCloseRef.current.click();
      });
  };
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
            ref={dialogCloseRef}
            className="border bg-slate-200 py-1 px-3 rounded-md mt-2"
          >
            Cancel
          </DialogClose>
          <button
            onClick={onDeleteClick}
            className="bg-main text-white py-1 px-3 rounded-md mt-2"
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

DeleteSpeciality.propTypes = {
  speciality: PropTypes.object.isRequired,
  setSpecialities: PropTypes.func.isRequired,
};
