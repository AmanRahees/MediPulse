/* eslint-disable no-unused-vars */
import React from "react";
import { Check, X } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/widgets/ui/table";
import Board from "@/components/frontend/Board/Board";

function Appoinments() {
  return (
    <Board>
      <div className="p-1">
        <p className="font-bold text-xl mb-2 text-zinc-800">Appointments</p>
        <Table className="border-b text-nowrap w-max lg:w-full my-2">
          <TableHeader>
            <TableRow className="bg-zinc-100 hover:bg-zinc-100">
              <TableHead className="font-bold text-zinc-600">Patient</TableHead>
              <TableHead className="font-bold text-zinc-600">
                Appt Date
              </TableHead>
              <TableHead className="font-bold text-zinc-600">
                Booking Date
              </TableHead>
              <TableHead className="font-bold text-zinc-600">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5, 6].map((appoint_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-02.jpg"
                      alt=""
                      className="w-[40px] rounded-full"
                    />
                    <div className="">
                      <p className="text-gray-900 font-bold hover:text-ternary transition-all duration-300 cursor-pointer">
                        Aman Rahees
                      </p>
                      <small className="">#PT1001</small>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p>Feb 4, 2024</p>
                  <small className="">11:00 A.M</small>
                </TableCell>
                <TableCell>Feb 2, 2024</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button className="bg-green-100 text-green-700 py-1 px-2 text-xs rounded-3xl">
                      <Check size={12} className="inline-block mr-1" />
                      Complete
                    </button>
                    <button className="bg-red-100 text-red-700 py-1 px-2 text-xs rounded-3xl">
                      <X size={12} className="inline-block mr-1" />
                      Cancel
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end gap-1 my-1">
          <button className="px-3 py-2 bg-primary text-white rounded-md text-xs">
            Prev
          </button>
          <button className="px-3 py-2 bg-primary text-white rounded-md text-xs">
            Next
          </button>
        </div>
      </div>
    </Board>
  );
}

export default Appoinments;
