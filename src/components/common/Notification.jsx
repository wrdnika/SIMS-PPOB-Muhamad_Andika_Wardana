import React from "react";
import { X } from "lucide-react";

/**
 * Komponen Notifikasi global untuk menampilkan pesan error atau sukses di pojok layar.
 * @param {object} props - Props untuk komponen Notifikasi.
 * @param {string} props.message - Pesan yang akan ditampilkan di dalam notifikasi.
 * @param {'error'|'success'} [props.type='error'] - Tipe notifikasi untuk menentukan warna (merah untuk error, hijau untuk sukses). Defaultnya 'error'.
 * @param {function} props.onClose - Fungsi yang akan dipanggil saat tombol tutup (X) diklik.
 */
const Notification = ({ message, type = "error", onClose }) => {
  const styles = {
    error: {
      bg: "bg-red-100",
      text: "text-red-700",
    },
    success: {
      bg: "bg-green-100",
      text: "text-green-700",
    },
  };

  const selectedStyle = styles[type];

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-5 left-5 p-2 rounded-md shadow-lg flex items-center justify-between w-96 z-50 ${selectedStyle.bg}`}
      role="alert"
    >
      <p className={`${selectedStyle.text} mr-4`}>{message}</p>

      <button onClick={onClose}>
        <X size={20} className={selectedStyle.text} />
      </button>
    </div>
  );
};

export default Notification;
