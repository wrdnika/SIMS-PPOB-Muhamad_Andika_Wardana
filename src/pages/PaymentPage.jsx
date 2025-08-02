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

/**
 * Komponen Halaman Pembayaran.
 * Halaman ini diakses setelah pengguna memilih layanan di Homepage.
 * Menampilkan detail layanan, konfirmasi pembayaran melalui modal, dan menampilkan hasil transaksi.
 */
function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mengambil data service yang dikirim dari Halaman Utama melalui 'state' navigasi
  const { service } = location.state || {};
  const { isLoading, isSuccess, error, message } = useSelector(
    (state) => state.transaction
  );

  // State lokal untuk mengontrol visibilitas dan status modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("confirmation");

  /**
   * Effect hook untuk mengubah status modal menjadi sukses atau error
   * setelah panggilan API pembayaran selesai.
   */
  useEffect(() => {
    if (isSuccess) {
      setModalStatus("success");
    }
    if (error) {
      setModalStatus("error");
    }
  }, [isSuccess, error]);

  /**
   * Memformat angka menjadi format mata uang Rupiah.
   * @param {number} number - Angka yang akan diformat.
   * @returns {string} String dalam format Rupiah (e.g., "Rp 10.000").
   */
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);
  };

  // Pengaman jika halaman diakses langsung tanpa data 'service'
  if (!service) {
    return <Navigate to="/" replace />;
  }

  /**
   * Menangani klik tombol "Bayar" untuk membuka modal konfirmasi.
   */
  const handleOpenConfirmation = () => {
    setIsModalOpen(true);
    setModalStatus("confirmation");
  };

  /**
   * Menangani konfirmasi dari dalam modal untuk men-dispatch action pembayaran.
   */
  const handlePaymentConfirm = () => {
    dispatch(createPayment({ service_code: service.service_code }));
  };

  /**
   * Menangani penutupan modal, mereset state transaksi, dan me-redirect jika sukses.
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(resetTransaction());
    if (isSuccess) {
      navigate("/");
    }
  };

  /**
   * Helper function untuk menyediakan konten (judul & pesan) yang dinamis
   * untuk modal berdasarkan statusnya.
   * @returns {{title: string, message: string}} Objek berisi judul dan pesan untuk modal.
   */
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

      {/* MODAL KONFIRMASI, SUKSES, GAGAL */}
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
