import React, { useState, useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createPayment,
  resetTransaction,
} from "../redux/slices/transactionSlice";
import UserProfile from "../components/common/UserProfile";
import Balance from "../components/common/Balance";
import Modal from "../components/common/Modal";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { service } = location.state || {};
  const { isLoading, isSuccess, error, message } = useSelector(
    (state) => state.transaction
  );

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

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const handleOpenConfirmation = () => {
    setIsModalOpen(true);
    setModalStatus("confirmation");
  };

  const handlePaymentConfirm = () => {
    dispatch(createPayment({ service_code: service.service_code }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(resetTransaction());
    if (isSuccess) {
      navigate("/");
    }
  };

  // Fungsi untuk menentukan pesan di modal
  const getModalContent = () => {
    switch (modalStatus) {
      case "success":
        return {
          title: "Pembayaran berhasil",
          message: message || "Pembayaran berhasil dilakukan.",
        };
      case "error":
        return {
          title: "Pembayaran gagal",
          message: error?.message || "Terjadi kesalahan.",
        };
      case "confirmation":
      default:
        return {
          title: `Beli ${service.service_name} senilai`,
          message: formatRupiah(service.service_tariff) + " ?",
        };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* BAGIAN HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <UserProfile />
        <Balance />
      </div>

      {/* Detail Pembayaran */}
      <div className="mt-10">
        <p className="text-lg font-semibold mb-4">Pembayaran</p>
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={service.service_icon}
            alt={service.service_name}
            className="w-12 h-12"
          />
          <span className="text-2xl font-bold">{service.service_name}</span>
        </div>
        <div className="min-w-screen">
          <input
            type="text"
            value={formatRupiah(service.service_tariff)}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 font-semibold"
          />
          <button
            onClick={handleOpenConfirmation}
            disabled={isLoading}
            className="w-full bg-red-500 text-white font-bold py-3 rounded-md hover:bg-red-600 transition-colors mt-4 disabled:bg-gray-400"
          >
            {isLoading ? "Loading..." : "Bayar"}
          </button>
        </div>
      </div>

      {/* MODAL KONFIRMASI, SUKSES, GAGAL  */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handlePaymentConfirm}
        title={getModalContent().title}
        message={getModalContent().message}
        status={modalStatus}
      />
    </div>
  );
}

export default PaymentPage;
