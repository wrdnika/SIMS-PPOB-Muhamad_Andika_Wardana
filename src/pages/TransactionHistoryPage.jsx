import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory, clearHistory } from "../redux/slices/transactionSlice";
import UserProfile from "../components/common/UserProfile";
import Balance from "../components/common/Balance";

function TransactionHistoryPage() {
  const dispatch = useDispatch();

  const { history, isLoading, hasMore, offset } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
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
    }).format(number || 0);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return (
      new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date) + " WIB"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <UserProfile />
        <Balance />
      </div>

      <h2 className="text-xl font-bold mb-6">Semua Transaksi</h2>

      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((transaction) => (
            <div
              key={transaction.invoice_number}
              className="flex justify-between items-center border border-gray-200 p-4 rounded-lg"
            >
              <div className="flex flex-col">
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
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(transaction.created_on)}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-700">
                {transaction.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">
            Maaf tidak ada histori transaksi saat ini
          </p>
        </div>
      )}

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
