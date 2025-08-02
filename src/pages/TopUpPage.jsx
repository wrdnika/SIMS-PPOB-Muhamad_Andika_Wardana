import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  topUpBalance,
  resetTransaction,
} from "../redux/slices/transactionSlice";
import UserProfile from "../components/common/UserProfile";
import Balance from "../components/common/Balance";
import Modal from "../components/common/Modal";
import { Wallet } from "lucide-react";

function TopUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, error, message } = useSelector(
    (state) => state.transaction
  );

  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("confirmation");

  useEffect(() => {
    if (isSuccess) {
      setModalStatus("success");
    }
    if (error) {
      setModalStatus("error");
    }
  }, [isSuccess, error]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);
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
      setIsModalOpen(true);
      setModalStatus("confirmation");
    }
  };

  const handleTopUpConfirm = () => {
    const topUpData = { top_up_amount: Number(amount) };
    dispatch(topUpBalance(topUpData));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(resetTransaction());
    if (isSuccess) {
      setAmount("");
    }
  };

  const getModalContent = () => {
    switch (modalStatus) {
      case "success":
        return {
          title: "Top Up berhasil",
          message: `Top Up sebesar ${formatRupiah(amount)} berhasil`,
        };
      case "error":
        return {
          title: "Top Up Gagal",
          message: error?.message || "Terjadi kesalahan.",
        };
      case "confirmation":
      default:
        return {
          title: `Anda yakin untuk Top Up sebesar`,
          message: formatRupiah(amount) + " ?",
        };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <UserProfile />
        <Balance />
      </div>

      <div className="mt-10">
        <p className="text-lg">Silahkan masukan</p>
        <h1 className="text-4xl font-bold mb-8">Nominal Top Up</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-start gap-8"
        >
          <div className="w-full md:w-2/3">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Wallet size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="masukkan nominal Top Up"
                value={amount}
                onChange={handleAmountChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 font-semibold"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-300 text-gray-500 font-bold py-3 rounded-md transition-colors disabled:cursor-not-allowed data-[valid=true]:bg-red-500 data-[valid=true]:text-white"
              disabled={!isAmountValid || isLoading}
              data-valid={isAmountValid}
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
                className="border border-gray-300 rounded-md p-3 text-center hover:bg-gray-100 font-semibold"
              >
                {formatRupiah(preset)}
              </button>
            ))}
          </div>
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleTopUpConfirm}
        title={getModalContent().title}
        message={getModalContent().message}
        status={modalStatus}
      />
    </div>
  );
}

export default TopUpPage;
