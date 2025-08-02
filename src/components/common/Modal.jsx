import React from "react";
import { CheckCircle2, XCircle, Wallet } from "lucide-react";

const icons = {
  success: <CheckCircle2 size={64} className="text-green-500" />,
  error: <XCircle size={64} className="text-red-500" />,
  confirmation: (
    <img src="/Logo.png" alt="Confirmation" className="w-16 h-16" />
  ),
};

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  status = "confirmation",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 m-4 max-w-sm w-full text-center flex flex-col items-center">
        <div className="mb-4">{icons[status]}</div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        {status === "confirmation" && (
          <div className="w-full">
            <button
              onClick={onConfirm}
              className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 mb-2"
            >
              Ya, lanjutkan Bayar
            </button>
            <button
              onClick={onClose}
              className="w-full text-gray-600 font-semibold py-2"
            >
              Batalkan
            </button>
          </div>
        )}

        {(status === "success" || status === "error") && (
          <button
            onClick={onClose}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600"
          >
            Kembali ke Beranda
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
