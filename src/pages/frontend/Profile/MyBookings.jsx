/* eslint-disable no-unused-vars */
import React from "react";
import { Eye } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/widgets/ui/table";
import Board from "@/components/frontend/Board/Board";

function MyBookings() {
  return (
    <Board>
      <div className="p-1">
        <h1 className="text-2xl my-1">My Appointments</h1>
        <Table className="border-b text-nowrap w-max lg:w-full my-2">
          <TableHeader>
            <TableRow className="bg-zinc-100 hover:bg-zinc-100">
              <TableHead className="font-bold text-zinc-600">Doctor</TableHead>
              <TableHead className="font-bold text-zinc-600">
                Appt Date
              </TableHead>
              <TableHead className="font-bold text-zinc-600">
                Booking Date
              </TableHead>
              <TableHead className="font-bold text-zinc-600">Amount</TableHead>
              <TableHead className="font-bold text-zinc-600">Status</TableHead>
              <TableHead className="font-bold text-zinc-600">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5, 6].map((appoint_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex gap-2">
                    <img
                      src="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-02.jpg"
                      alt=""
                      className="w-[40px] rounded-full"
                    />
                    <div className="">
                      <p className="">Aman Rahees</p>
                      <small className="">Dentist</small>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p>Feb 4, 2024</p>
                  <p className="font-bold text-secondary">11:00 A.M</p>
                </TableCell>
                <TableCell>Feb 2, 2024</TableCell>
                <TableCell>$150</TableCell>
                <TableCell>
                  <small className="bg-orange-100 text-orange-700 py-1 px-2 rounded-3xl">
                    Pending
                  </small>
                </TableCell>
                <TableCell>
                  <button className="bg-emerald-100 text-emerald-500 px-2 py-1 rounded">
                    View &rarr;
                  </button>
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

export default MyBookings;
