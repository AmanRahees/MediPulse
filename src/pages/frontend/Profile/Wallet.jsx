/* eslint-disable no-unused-vars */
import React from "react";
import { Wallet as MoneyWallet } from "lucide-react";
import Board from "@/components/frontend/Board/Board";

function Wallet() {
  return (
    <Board>
      <div className="">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 bg-sky-100 text-primary w-full p-4 rounded-md">
          <div className="flex gap-3">
            <MoneyWallet size={40} />
            <div className="">
              <h1 className="lg:text-lg">&#8377;0.00</h1>
              <small className="">Wallet Balance</small>
            </div>
          </div>
          <button className="bg-primary text-white py-2 px-5 text-xs lg:text-sm rounded-md">
            + Add Money to Wallet
          </button>
        </div>
        <h1 className="my-5 text-xl">Recents</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((transaction, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-3 rounded-md text-gray-700"
            >
              <div className="flex items-center gap-2">
                <img
                  src="https://doccure.dreamstechnologies.com/html/template/assets/img/patients/patient.jpg"
                  alt=""
                  className="w-[50px] h-[50px] rounded-full border"
                />
                <div className="">
                  <p className="text-sm font-bold">Paid to Dr. Aman Rahees</p>
                  <small>Feb 2, 2024 - 3.00 pm</small>
                </div>
              </div>
              <div className="">
                <small className="block">Amount</small>
                <h1 className="">$500</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center my-3">
          <button className="bg-secondary text-white py-1 px-3 rounded-md text-sm">
            View All
          </button>
        </div>
      </div>
    </Board>
  );
}

export default Wallet;
