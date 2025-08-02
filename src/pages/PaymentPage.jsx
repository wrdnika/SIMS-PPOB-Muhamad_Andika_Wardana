import React, { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchBalance } from "../redux/slices/profileSlice";
import {
  createPayment,
  resetTransaction,
} from "../redux/slices/transactionSlice";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { service } = location.state || {};

  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const { profile, balance } = useSelector((state) => state.profile);
  const { isLoading, isSuccess, error, message } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      alert(message);
      dispatch(fetchBalance());
      navigate("/");
    }

    dispatch(resetTransaction());
  }, [isSuccess, error, dispatch, message, navigate]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const handlePayment = () => {
    if (balance < service.service_tariff) {
      alert("Saldo anda tidak cukup untuk melakukan pembayaran ini.");
      return;
    }
    dispatch(createPayment({ service_code: service.service_code }));
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header Saldo */}
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

      {/* Detail Pembayaran */}
      <h2 className="text-xl font-semibold mb-4">Pembayaran</h2>
      <div className="flex items-center mb-6">
        <img
          src={service.service_icon}
          alt={service.service_name}
          className="w-16 h-16 mr-4"
        />
        <h1 className="text-3xl font-bold">{service.service_name}</h1>
      </div>

      <div className="w-full max-w-md">
        <input
          type="text"
          value={formatRupiah(service.service_tariff)}
          disabled
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100"
        />
        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full bg-red-500 text-white font-bold py-3 rounded-md hover:bg-red-600 transition-colors mt-4 disabled:bg-gray-400"
        >
          {isLoading ? "Loading..." : "Bayar"}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
