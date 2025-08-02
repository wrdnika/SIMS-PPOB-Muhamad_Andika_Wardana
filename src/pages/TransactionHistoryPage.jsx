import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchBalance } from "../redux/slices/profileSlice";
import { fetchHistory, clearHistory } from "../redux/slices/transactionSlice";

function TransactionHistoryPage() {
  const dispatch = useDispatch();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const { profile, balance } = useSelector((state) => state.profile);
  const { history, isLoading, hasMore, offset } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
    dispatch(fetchHistory({ offset: 0, limit: 5 }));

    return () => {
      dispatch(clearHistory());
    };
  }, [dispatch]);

  const handleShowMore = () => {
    dispatch(fetchHistory({ offset, limit: 5 }));
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
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

      <h2 className="text-xl font-semibold mb-4">Semua Transaksi</h2>

      {/* Daftar Transaksi */}
      <div className="space-y-4">
        {history.map((transaction) => (
          <div
            key={transaction.invoice_number}
            className="flex justify-between items-center border p-4 rounded-md"
          >
            <div>
              <p
                className={`font-bold text-lg ${
                  transaction.transaction_type === "TOPUP"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.transaction_type === "TOPUP" ? "+ " : "- "}
                {formatRupiah(transaction.total_amount)}
              </p>
              <p className="text-sm text-gray-500">{transaction.created_on}</p>
            </div>
            <p className="text-sm font-medium">{transaction.description}</p>
          </div>
        ))}
      </div>

      {/* Tombol Show More */}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleShowMore}
            disabled={isLoading}
            className="text-red-500 font-semibold hover:underline disabled:text-gray-400"
          >
            {isLoading ? "Loading..." : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
}

export default TransactionHistoryPage;
