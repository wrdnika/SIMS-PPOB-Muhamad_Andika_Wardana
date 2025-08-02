import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchBalance } from "../redux/slices/profileSlice";
import {
  topUpBalance,
  resetTransaction,
} from "../redux/slices/transactionSlice";
import { AtSign, User, Lock, Eye, EyeOff } from "lucide-react";

function TopUpPage() {
  const dispatch = useDispatch();

  const { profile, balance } = useSelector((state) => state.profile);
  const { isLoading, isSuccess, error, message } = useSelector(
    (state) => state.transaction
  );

  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchBalance());
      alert(message);
      setAmount("");
    }
    if (error) {
      console.error(error.message);
    }

    dispatch(resetTransaction());
  }, [isSuccess, error, dispatch, message]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const presetAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

  const isAmountValid = amount >= 10000 && amount <= 1000000;

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAmountValid) {
      const topUpData = {
        top_up_amount: Number(amount),
      };
      dispatch(topUpBalance(topUpData));
    }
  };

  return (
    <div className="container mx-auto p-4">
      {profile && (
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Selamat datang, {profile.first_name} {profile.last_name}
            </h1>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg w-1/3">
            <p>Saldo anda</p>
            <h2 className="text-4xl font-bold my-2">
              {isBalanceVisible ? formatRupiah(balance || 0) : "Rp. •••••••"}
            </h2>
            <button
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className="text-sm underline cursor-pointer"
            >
              {isBalanceVisible ? "Tutup Saldo" : "Lihat Saldo"}
            </button>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg mb-4">Silahkan masukan</h2>
        <h1 className="text-4xl font-bold mb-8">Nominal Top Up</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-start gap-8"
        >
          <div className="w-full md:w-2/3">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <p className="text-gray-400">Rp</p>
              </div>
              <input
                type="text"
                placeholder="masukkan nominal Top Up"
                value={amount}
                onChange={handleAmountChange}
                className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white font-bold py-3 rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!isAmountValid || isLoading}
            >
              {isLoading ? "Loading..." : "Top Up"}
            </button>
          </div>

          <div className="w-full md:w-1/3 grid grid-cols-3 gap-4">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset)}
                className="border border-gray-300 rounded-md p-4 text-center hover:bg-gray-100"
              >
                {formatRupiah(preset)}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default TopUpPage;
