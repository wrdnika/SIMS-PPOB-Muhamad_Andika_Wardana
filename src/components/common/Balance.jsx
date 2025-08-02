import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../../redux/slices/profileSlice";
import { Eye, EyeOff } from "lucide-react";

/**
 * Komponen untuk menampilkan saldo pengguna dengan background assets yang sudah di sediakan Nutech.
 * Komponen ini mengambil data saldon dan dioptimalkan dengan React.memo.
 */
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
        {isBalanceVisible ? "Tutup Saldo" : "Lihat Saldo"}
        {isBalanceVisible ? (
          <EyeOff size={16} className="ml-2" />
        ) : (
          <Eye size={16} className="ml-2" />
        )}
      </button>
    </div>
  );
};

export default memo(Balance);
