import React from "react";
import { X } from "lucide-react";

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
