import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchBalance } from "../redux/slices/profileSlice";

function HomePage() {
  const dispatch = useDispatch();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const { profile, balance, isLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading && <p>Loading...</p>}
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
    </div>
  );
}

export default HomePage;
