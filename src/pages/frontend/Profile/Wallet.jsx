/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "@/services/useAxios";
import { Wallet as MoneyWallet, MessageSquareWarning } from "lucide-react";
import { Skeleton } from "@/widgets/ui/skeleton";
import Board from "@/components/frontend/Board/Board";
import { makeWalletRequest, getWallet } from "@/redux/actions/walletActions";

function Wallet() {
  const api = useAxios();
  const { wallet, transactions, loading } = useSelector(
    (state) => state.wallet
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(makeWalletRequest());
    api
      .get("contexts/wallet")
      .then((response) => {
        dispatch(getWallet(response.data));
      })
      .catch(() => {});
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <Board>
      <div className="">
        {!loading ? (
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 bg-sky-100 text-primary w-full p-4 rounded-md">
            <div className="flex gap-3">
              <MoneyWallet size={40} />
              <div className="">
                <small className="">Your Balance</small>
                <h1 className="lg:text-lg">&#8377;{wallet?.balance}</h1>
              </div>
            </div>
            <button className="bg-primary text-white py-2 px-5 text-xs lg:text-sm rounded-md">
              + Add Money to Wallet
            </button>
          </div>
        ) : (
          <Skeleton className="bg-sky-50 w-full h-20 py-1 rounded-md" />
        )}
        <h1 className="my-5 text-xl">Recent Transactions</h1>
        {transactions.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {transactions.map((transaction, index) => (
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
                      <p className="text-sm font-bold">
                        Paid to Dr. Aman Rahees
                      </p>
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
            <button className="text-secondary bg-sky-50 border border-sky-100 text-xs w-[100px] text-center py-2 rounded-2xl">
              <span>Load More</span>
            </button>
          </>
        ) : (
          <p className="flex flex-col items-center gap-3">
            <MessageSquareWarning className="text-yellow-500" size={60} />
            <span>No transactions yet!</span>
          </p>
        )}
      </div>
    </Board>
  );
}

export default Wallet;
