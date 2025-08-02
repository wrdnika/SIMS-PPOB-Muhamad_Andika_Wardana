import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../../redux/slices/profileSlice";
import { Eye, EyeOff } from "lucide-react";

const Balance = () => {
  const dispatch = useDispatch();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const { balance } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);
  };

  return (
    <div
      className="text-white p-6 rounded-xl shadow-md bg-cover bg-center"
      // Path diubah sesuai dengan lokasi file di folder public
      style={{ backgroundImage: "url('/assets/common/Background_Saldo.png')" }}
    >
      <p className="text-lg">Saldo anda</p>
      <h2 className="text-4xl font-bold my-2">
        {isBalanceVisible ? formatRupiah(balance) : "Rp. •••••••"}
      </h2>
      <button
        onClick={() => setIsBalanceVisible(!isBalanceVisible)}
        className="text-sm font-semibold mt-2 flex items-center"
      >
        {isBalanceVisible ? (
          <EyeOff size={16} className="mr-2" />
        ) : (
          <Eye size={16} className="mr-2" />
        )}
        {isBalanceVisible ? "Tutup Saldo" : "Lihat Saldo"}
      </button>
    </div>
  );
};

export default Balance;
